import apiInstance from '../api/axios';
import { TaskApiResponseModel } from '@/models/TaskApiResponseModel';
import { TaskModel } from '@/models/TaskModel';
import { TaskRequestModel } from '@/models/TaskRequestModels';

export const TaskAPI = {
  getTasks: async () => {
    return await apiInstance.get<TaskApiResponseModel>('/todo');
  },

  getTask: async (id: number) => {
    return await apiInstance.get<TaskModel>(`/todo/${id}`);
  },

  createTask: async (task: TaskRequestModel) => {
    const response = await apiInstance.post<TaskModel>('/todo', task);
    console.log('Respuesta del backend al crear tarea:', response.data); // Depuración
    return response;
  },

  updateTask: async (id: number, task: Partial<TaskModel>) => {
    return await apiInstance.patch<TaskModel>(`/todo/${id}`, task);
  },

  deleteTask: async (id: number) => {
    return await apiInstance.delete(`/todo/${id}`);
  },
};
