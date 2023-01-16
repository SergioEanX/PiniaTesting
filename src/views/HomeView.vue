<script setup>
import {ref} from 'vue'
import {useTaskStore} from '@/stores/TaskStore'
import TaskDetail from '@/components/TaskDetail.vue'
import {storeToRefs} from "pinia";

const taskStore = useTaskStore()
const{tasks, isLoading, favs, totalCount, favCount} =storeToRefs(taskStore)
const showAll = ref(true)

taskStore.getTasks()
const reset = () => {
  taskStore.$reset()
}
</script>

<template>
  <main>

    <div style=" width:400px; margin:0 auto;">
      <h1>Home</h1>
      <input @click="showAll=!showAll" type="checkbox"
             value="Show"
             :checked="showAll">
      <label for="Show"> Show All</label><br/>
      <button @click="reset">Reset to empty</button>
    </div>

    <div v-if="showAll" class="task-list">
      <p>All tasks</p>
      <div v-for="task in tasks">
        <TaskDetail :task="task"/>
      </div>
    </div>
    <div v-if="!showAll" class="task-list">
      <p>Fav tasks</p>
      <div v-for="task in favs">
        <TaskDetail :task="task"/>
      </div>
    </div>
    <p style="width: 600px; margin: 0 auto;">{{ taskStore.$state }}</p>

  </main>
</template>
