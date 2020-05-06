<template>
    <div>
        <main class="home">
            <h1 class="home__tittle">そーちゃんのやること</h1>
            <ul class="home__contents">
              <li v-for="todo in todos">
                {{ todo.name }}
              </li>
            </ul>
        </main>
    </div>
</template>

<script>
export default {
  computed: {
    todos() {
      return this.$store.getters['todos/notDoneTodos']
    }
  },
  created: function() {
    this.$store.dispatch("todos/init");
  },
}
</script>

<style lang="scss">
  .home{
    margin: 0,
  }
</style>