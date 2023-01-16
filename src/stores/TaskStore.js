import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

// debounce function
// function debounce(callback, limit) {
//   let timeout;
//   return () => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       callback();
//     }, limit);
//   };
// }

export const useTaskStore = defineStore('taskStore', {
  // state: () => ({
  //     tasks: [],
  //     isLoading: false,
  //     name: 'Yoshi',
  // }),
  state: () => {
    return {
      tasks: useLocalStorage('tasks', []),
      isLoading: false,
      name: useLocalStorage('name', 'Yoshi'),
    };
  },

  getters: {
    favs() {
      return this.tasks.filter((item) => item.isFav === true);
    },
    favCount() {
      return this.tasks.reduce((p, c) => {
        return c.isFav ? p + 1 : p;
      }, 0);
    },
    totalCount: (state) => state.tasks.length,
  },
  actions: {
    async getTasks() {
      this.isLoading = true;
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 500);
      const res = await fetch('http://localhost:3000/tasks', {
        signal: controller.signal,
      });
      clearTimeout(id);
      this.tasks = await res.json();
      this.isLoading = false;
    },

    async addTask(task) {
      this.tasks.unshift(task);
      const res = await fetch('http://localhost:3000/tasks', {
        method: 'post',
        body: JSON.stringify(task),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.error) {
        console.log(res.error);
      }
    },
    async deleteTask(id) {
      this.tasks = this.tasks.filter((t) => {
        return t.id !== id;
      });
      const res = await fetch('http://localhost:3000/tasks/' + id, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.error) {
        console.log(res.error);
      }
    },
    async toggleFav(id) {
      const task = this.tasks.find((t) => t.id === id);
      task.isFav = !task.isFav;
      const res = await fetch('http://localhost:3000/tasks/' + id, {
        method: 'PATCH',
        body: JSON.stringify({ isFav: task.isFav }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.error) {
        console.log(res.error);
      }
    },
  },
});
