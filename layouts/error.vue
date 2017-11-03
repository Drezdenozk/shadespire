<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">
      <p class="text-center"><img src="/404.jpg" /></p>
    </h1>
    <h1 v-else>An error occurred</h1>
  </div>
</template>

<script>
  export default {
    props: ['error']
  }
</script>
