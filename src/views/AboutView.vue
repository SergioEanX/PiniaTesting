<template>
  <div style="margin:0 auto; width: 400px">
    <h1>About</h1>
    <p>Favorite tasks</p>
    <ul>
      <li v-for="task in taskStore.favs" key="task.id">
        {{task.title}}
      </li>
    </ul>
  </div>
</template>

<script setup>
import {useTaskStore} from '@/stores/TaskStore'
const taskStore = useTaskStore()

</script>

<style lang="scss" scoped>

</style>
