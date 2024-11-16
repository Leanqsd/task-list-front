import { defineStore } from 'pinia';
import axios from 'axios';
import {
  TaskModel,
  TaskApiResponseModel,
  TaskRequestModel,
  UpdateTaskRequestModel,
} from '@/models';

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as TaskModel[],
    loading: false,
  }),

  actions: {
    async fetchTasks(): Promise<void> {
      this.loading = true;
      const { data }: { data: TaskApiResponseModel } = await axios.get('/todo');
      this.tasks = data.tasks;
      this.loading = false;
    },

    async createTask(task: TaskRequestModel): Promise<void> {
      const { data }: { data: TaskModel } = await axios.post('/todo', task);
      this.tasks.push(data);
    },

    async updateTask(id: string, updates: UpdateTaskRequestModel): Promise<void> {
      const { data }: { data: TaskModel } = await axios.patch(`/todo/${id}`, updates);
      this.tasks = this.tasks.map((task: TaskModel) =>
        task.id === id ? { ...task, ...data } : task
      );
    },

    async deleteTask(id: string): Promise<void> {
      await axios.delete(`/todo/${id}`);
      this.tasks = this.tasks.filter((task: TaskModel) => task.id !== id);
    },
  },
});
