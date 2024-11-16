export interface TaskRequestModel {
    title: string;
    description: string;
  }
  
  export interface UpdateTaskRequestModel {
    id: string;
    title?: string;
    description?: string;
    isCompleted?: boolean;
  }
  