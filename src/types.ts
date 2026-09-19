export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';

export type FilterStatus = 'ALL' | 'ACTIVE' | 'COMPLETED';

export type PriorityFilter = 'ALL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  completed: boolean;
  createdAt: number;
  completedAt?: number;
  tags?: string[];
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  completionRate: number;
}
