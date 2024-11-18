import { defineStore } from 'pinia';
import { TaskAPI } from '@/services/TaskService';
import { TaskModel } from '@/models/TaskModel';
import { TaskRequestModel } from '@/models/TaskRequestModels';

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [] as TaskModel[],
    loading: false,
  }),

  actions: {
    async fetchTasks() {
      this.loading = true;
      try {
        const response = await TaskAPI.getTasks();
        this.tasks = response.data.tasks || []; // Asegúrate de asignar un arreglo vacío si no hay tareas
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        this.loading = false;
      }
    }
    ,

    async createTask(task: TaskRequestModel) {
      try {
        const response = await TaskAPI.createTask(task);
    
        console.log('Estado actual de tasks antes de push:', this.tasks);
    
        if (!response || !response.data) {
          throw new Error('Invalid response data from API');
        }
    
        if (!Array.isArray(this.tasks)) {
          throw new Error('Estado de tasks no es un arreglo');
        }
    
        this.tasks = this.tasks || []; // Inicialización segura
        this.tasks.push(response.data);
    
        console.log('Estado actual de tasks después de push:', this.tasks);
      } catch (error) {
        console.error('Error creating task:', error);
      }
    },

    async updateTask(id: number, updates: Partial<TaskModel>) {
      try {
        const response = await TaskAPI.updateTask(id, updates);
        this.tasks = this.tasks.map((task) =>
          task.id === id ? { ...task, ...response.data } : task
        );
      } catch (error) {
        console.error('Error updating task:', error);
      }
    },
    async markAsCompleted(id: number) {
      try {
        const response = await TaskAPI.updateTask(id, { isCompleted: true });
        this.tasks = this.tasks.map((task) =>
          task.id === id ? { ...task, ...response.data } : task
        );
      } catch (error) {
        console.error('Error marking task as completed:', error);
      }
    },

    async deleteTask(id: number) {
      try {
        await TaskAPI.deleteTask(id);
        this.tasks = this.tasks.filter((task) => task.id !== id);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    },
  },
});
