<template lang="html">
  <div class="index">
    <b-jumbotron class="bg-vue" text-variant="white" border-variant="dark">
      <template slot="header">Welcome to B-V Courses</template>

      <template slot="lead">
        The best place to learn, we have millions of online courses on web development.
      </template>

      <hr class="my-4" />

      <p>
        You will find everything you need to be a web developer.
      </p>
    </b-jumbotron>
  </div>
</template>

<script>
  export default {
    name : 'index'
  }
</script>

<style lang="css" scoped>
  .index {
    padding: 25px;
  }

  .bg-vue {
    background-color: #42b983;
  }
</style>
