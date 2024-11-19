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
        this.tasks = response.data.tasks.map((task) => ({
          ...task,
          isCompleted: false, // Inicializa localmente como no completado
        }));
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        this.loading = false;
      }
    },

    markAsCompletedLocally(id: number) {
      this.tasks = this.tasks.map((task: TaskModel) =>
        Number(task.id) === id ? { ...task, isCompleted: true } : task
      );
    },

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
        // Encuentra la tarea
        const taskToUpdate = this.tasks.find(task => task.id === id);
        if (!taskToUpdate) {
          console.error('Task not found');
          return;
        }
    
        // Actualiza localmente primero para una respuesta más rápida
        taskToUpdate.isCompleted = true;
    
        // Enviar actualización al backend
        await TaskAPI.updateTask(id, { isCompleted: true });
      } catch (error) {
        console.error('Error marking task as completed:', error);
        // Si hay un error, revertir el cambio local
        const taskToRevert = this.tasks.find(task => task.id === id);
        if (taskToRevert) {
          taskToRevert.isCompleted = false;
        }
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
