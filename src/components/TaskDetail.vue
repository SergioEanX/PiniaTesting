<script setup>
// import { ref } from 'vue'
import { useTaskStore } from '@/stores/TaskStore'
const taskStore = useTaskStore()
defineProps(['task'])
</script>

<template>
  <!--  <button @click="count++">You clicked me {{ count }} times.</button>-->
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <i class="material-icons" @click="taskStore.deleteTask(task.id)">delete</i>
      <i class="material-icons" :class="{ active: task.isFav }" @click="taskStore.toggleFav(task.id)">favorite</i>
    </div>

  </div>
</template>
