<script setup lang="ts">

</script>

<template>
  <div class="input-group">
    <label class="form-label" for="day">Tag:</label>
    <input class="form-control" type="date" name="day"/>
  </div>
  <div class="input-group">
    <label class="form-label" for="start">Arbeitszeit</label>
    <input class="form-control" type="time" name="start"/>
    <input class="form-control" type="time" name="ende"/>
  </div>
  <div class="input-group col-auto">
    <label class="form-label w-25" for="start">Pause</label>
    <input class="form-control w-25" type="time" name="start"/>-
    <input class="form-control w-25" type="time" name="ende"/>
  </div>
</template>

<style scoped>

</style>
