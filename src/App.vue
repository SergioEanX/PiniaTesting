<script setup>
import {RouterLink, RouterView} from 'vue-router'

import TaskForm from "@/components/TaskForm.vue";



// const taskStore = useTaskStore();

// taskStore.getTasksDelayed()
// onMounted(() => {
// })
// fetch tasks
</script>

<template>
  <main>
    <header>
      <img alt="Pinia Logo" class="logo" src="@/assets/logo.svg" width="125" height="125"/>
      <h1>Pinia Tasks</h1>

      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>|
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    </header>
<!--    <div v-if="taskStore.isLoading" class="loading">-->
<!--      Loading Tasks...-->
<!--    </div>-->
    <div style="width:600px; margin: 0 auto; text-align: center">
<!--      <p>Total tasks: {{ taskStore.totalCount }}, Favorite tasks: {{ taskStore.favCount }}</p>-->
      <div class="new-task-form">
        <TaskForm/>
      </div>
    </div>
    <RouterView/>

  </main>

</template>

