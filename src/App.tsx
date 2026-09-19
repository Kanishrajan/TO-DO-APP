import { useState, useEffect, useRef, useMemo } from 'react';
import { Task, Priority, FilterStatus, PriorityFilter, TaskStats } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import TaskCreationPanel from './components/TaskCreationPanel';
import FilterBar from './components/FilterBar';
import TaskCard from './components/TaskCard';
import EditModal from './components/EditModal';
import AboutModal from './components/AboutModal';
import EmptyState from './components/EmptyState';
import Footer from './components/Footer';

const STORAGE_KEY = 'focuslist_tasks_v2';

const INITIAL_TASKS: Task[] = [
  {
    id: 'tsk-01',
    title: 'COMPLETE PORTFOLIO WEBSITE ARCHITECTURE',
    priority: 'HIGH',
    completed: false,
    createdAt: Date.now() - 3600000 * 5,
  },
  {
    id: 'tsk-02',
    title: 'CALIBRATE 3D FOCUS ORB SHADER PERFORMANCE',
    priority: 'HIGH',
    completed: true,
    createdAt: Date.now() - 3600000 * 24,
    completedAt: Date.now() - 3600000 * 2,
  },
  {
    id: 'tsk-03',
    title: 'AUDIT BAUHAUS GEOMETRIC TYPOGRAPHY HIERARCHY',
    priority: 'MEDIUM',
    completed: false,
    createdAt: Date.now() - 3600000 * 12,
  },
  {
    id: 'tsk-04',
    title: 'PROTOTYPE Y2K TACTILE INTERFACE MICRO-STATES',
    priority: 'MEDIUM',
    completed: false,
    createdAt: Date.now() - 3600000 * 8,
  },
  {
    id: 'tsk-05',
    title: 'REVIEW WEEKLY FOCUS MATRIX VELOCITY METRICS',
    priority: 'LOW',
    completed: false,
    createdAt: Date.now() - 3600000 * 2,
  },
];

export default function App() {
  // Load tasks from localStorage or seed
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Fallback if parsing fails
    }
    return INITIAL_TASKS;
  });

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('ALL');

  // Modal State
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  // Input ref to focus on demand
  const creationInputRef = useRef<HTMLInputElement | null>(null);

  // Synchronize to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.warn('Failed to persist tasks to localStorage:', e);
    }
  }, [tasks]);

  // Compute Statistics
  const stats: TaskStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pending, completionRate };
  }, [tasks]);

  // Actions
  const handleAddTask = (title: string, priority: Priority) => {
    const newTask: Task = {
      id: `tsk-${Date.now().toString(36)}`,
      title,
      priority,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? Date.now() : undefined,
            }
          : t
      )
    );
  };

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (id: string, newTitle: string, newPriority: Priority) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, title: newTitle, priority: newPriority } : t))
    );
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleClearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  const handleResetSampleTasks = () => {
    setTasks(INITIAL_TASKS);
  };

  const handleScrollToCreation = () => {
    const el = document.getElementById('task-creation-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        creationInputRef.current?.focus();
      }, 350);
    }
  };

  const handleScrollToTasks = () => {
    const el = document.getElementById('tasks-matrix-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filter and sort tasks
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // Status filter
        if (statusFilter === 'ACTIVE' && task.completed) return false;
        if (statusFilter === 'COMPLETED' && !task.completed) return false;

        // Priority filter
        if (priorityFilter !== 'ALL' && task.priority !== priorityFilter) return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return task.title.toLowerCase().includes(q);
        }

        return true;
      })
      .sort((a, b) => {
        // Active tasks first, then by priority (HIGH > MEDIUM > LOW), then by newest
        if (a.completed !== b.completed) {
          return a.completed ? 1 : -1;
        }
        const prioOrder: Record<Priority, number> = { HIGH: 3, MEDIUM: 2, LOW: 1 };
        if (prioOrder[a.priority] !== prioOrder[b.priority]) {
          return prioOrder[b.priority] - prioOrder[a.priority];
        }
        return b.createdAt - a.createdAt;
      });
  }, [tasks, statusFilter, priorityFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-white text-[#111111] bg-grid-subtle flex flex-col selection:bg-[#B6FF00] selection:text-[#111111]">
      {/* Brutalist Navigation Bar */}
      <Navbar
        onOpenAbout={() => setIsAboutModalOpen(true)}
        onScrollToTasks={handleScrollToTasks}
        taskCount={tasks.length}
      />

      {/* Main Container */}
      <main className="flex-1">
        {/* Hero Section with Editorial Typography & 3D Interactive Focus Orb */}
        <Hero
          onAddTaskClick={handleScrollToCreation}
          taskCount={tasks.length}
          completedCount={stats.completed}
        />

        {/* Task Management Body Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10 sm:space-y-12">
          
          {/* Statistics Bar (3 Bold Bauhaus-Inspired Blocks) */}
          <section aria-label="Statistics">
            <StatsBar stats={stats} />
          </section>

          {/* Physical Brutalist Task Creation Control Panel */}
          <section>
            <TaskCreationPanel
              onAddTask={handleAddTask}
              inputRef={creationInputRef}
            />
          </section>

          {/* Task Matrix Section */}
          <section id="tasks-matrix-section" className="space-y-6">
            
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b-2 border-[#111111] pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 bg-[#2457FF] inline-block" />
                  <span className="font-mono-tech text-xs font-bold text-[#2457FF] uppercase tracking-wider">
                    MODULE // REGISTRY
                  </span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl text-[#111111] tracking-tight uppercase">
                  ACTIVE TASK MATRIX
                </h2>
              </div>
              <div className="font-mono-tech text-xs text-[#111111]/70 font-semibold">
                DISPLAYING {filteredTasks.length} OF {tasks.length} RECORDS
              </div>
            </div>

            {/* Search & Filter Controls */}
            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              priorityFilter={priorityFilter}
              onPriorityFilterChange={setPriorityFilter}
              completedCount={stats.completed}
              onClearCompleted={handleClearCompleted}
              onResetSampleTasks={handleResetSampleTasks}
            />

            {/* Task Card Grid / List */}
            {filteredTasks.length === 0 ? (
              <EmptyState
                onCreateClick={handleScrollToCreation}
                isFiltered={tasks.length > 0}
              />
            ) : (
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onToggleComplete={handleToggleComplete}
                    onEdit={handleOpenEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </section>

        </div>
      </main>

      {/* Minimal Brutalist Footer */}
      <Footer />

      {/* Brutalist Edit Task Modal */}
      <EditModal
        task={editingTask}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveEdit}
      />

      {/* About & Bauhaus/Brutalist Manifesto Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </div>
  );
}
