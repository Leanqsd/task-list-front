import type { TaskModel } from './TaskModel';

export interface TaskApiResponseModel {
  tasks: TaskModel[];
  total: number;
}
