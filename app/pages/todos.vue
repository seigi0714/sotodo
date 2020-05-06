<template>
  <div class="todo">
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <span v-if ="todo.created">
          <input type="checkbox" v-bind:checked="todo.done" @change="toggle(todo)" />Ï
          <span v-bind:class="{ done: todo.done }">
              {{ todo.name }} {{ todo.created.toDate() | dateFilter }}
          </span>
          <button v-on:click="remove(todo.id)">X</button>
          <!-- {{ todo.id }} -->
        </span>
      </li>
    </ul>
    <div class="todo__form">
      <input v-model="name" @keyup.enter="add" />
    </div>
  </div>
</template>
 
<script>
import moment from "moment";
export default {
  data: function() {
    return {
      name: "",
      done: false
    };
  },
  created: function() {
    this.$store.dispatch("todos/init");
  },
  methods: {
    add() {
      this.$store.dispatch("todos/add", this.name);
      this.name = "";
    },
    remove(id) {
      this.$store.dispatch("todos/remove", id);
    },
    toggle(todo) {
      this.$store.dispatch("todos/toggle", todo);
    }
  },
  computed: {
    todos() {
      return this.$store.state.todos.todos;
    }
  },
  filters: {
    dateFilter: function(date) {
      return moment(date).farmat("YYYY/MM/DD");
    }
  }
};
</script>