<template>
  <main class="home">
    <el-card class="home--card">
      <h1 class="home__title">そーちゃんのやること</h1>
      <el-link class="home__link--todos" icon="el-icon-edit" href="/todos">Edit</el-link>
      <ul>
      <li class="home__list" v-for="todo in todos" :key="todo.id">
        <el-checkbox class="home__list home__list--checkbox" v-if="todo.created" v-bind:checked="todo.done" @change="toggle(todo)" border>
          <span class="home__list home__list--contents" v-bind:class="{ done: todo.done }" >
              {{ todo.name }} {{ todo.created.toDate() | dateFilter }}
          </span>
          <el-button class="home__list home__list--remove" v-on:click="remove(todo.id)" icon="el-icon-delete" type="primary"></el-button>
          <!-- {{ todo.id }} -->
        </el-checkbox>
      </li>
    </ul>
    </el-card>
  </main>
</template>

<script>
import moment from "moment"
export default {
  computed: {
    todos() {
      return this.$store.getters["todos/notDoneTodos"];
    }
  },
  created: function() {
    this.$store.dispatch("todos/init");
  },
  filters: {
      dateFilter: function(date){
        return moment(date).format("YYYY/MM/DD")
      }
  },
  methods: {
    toggle(todo){
      this.$store.dispatch("todos/toggle",todo)
    },
    remove(id){
      this.$store.dispatch("todos/remove",id)
    }
  }
};
</script>

<style lang="scss">
main {
  height: 90vh;
}
ul {
  list-style: none;
}
.home {
  margin: 0;
  height: 90vh;
  &__link{
    &--todos{
      display: inline-block;
      text-align: center;
    }
  }
  &--card{
    height: 90vh;
    margin: 30px 15px;
  }
  &__title {
    text-align: center;
    justify-content: center;
    color: #a0ebd9;
    display: inline-block;
  }
  &__list{
    &--checkbox{
      width: 80%;
      text-align: left;
    }
    &--contents{
      text-justify: left;
    }
    &--remove{
      padding: 6px 12px;
      margin: 0 0 0 auto;
    }
  }
}
</style>