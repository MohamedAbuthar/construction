export interface Task {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'planned' | 'actual';
  isParent?: boolean;
  isExpanded?: boolean;
  children?: Task[];
}