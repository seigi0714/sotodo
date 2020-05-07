<template>
<div class="todo">
  <el-card　class="todo--card">
    <h1 class="todo__title">そーちゃんのやること</h1>　
    <div class="todo__form">
      <el-link class="todo__form todo__form--home" href="/" icon="el-icon-s-home">home</el-link>
      <el-input class="todo__form todo__form--input" v-model="name" />
      <el-button class="todo__form todo__form--add" type="primary" @click="add" plain>add</el-button>
    </div>
    <ul>
      <li class="todo__list" v-for="todo in todos" :key="todo.id">
        <el-checkbox class="todo__list todo__list--checkbox" v-if="todo.created" v-bind:checked="todo.done" @change="toggle(todo)" border>
          <span class="todo__list todo__list--contents" v-bind:class="{ done: todo.done }" >
              {{ todo.name }} {{ todo.created.toDate() | dateFilter }}
          </span>
          <el-button class="todo__list todo__list--remove" v-on:click="remove(todo.id)" icon="el-icon-delete" type="primary"></el-button>
          <!-- {{ todo.id }} -->
        </el-checkbox>
      </li>
    </ul>
  </el-card>
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
      return this.$store.getters["todos/orderdTodos"];
    }
  },
  filters: {
    dateFilter: function(date) {
      return moment(date).format("YYYY/MM/DD");
    }
  }
};
</script>

<style lang="scss">
ul {
    list-style: none;
    padding: 0;
}
.todo{
    height: 95vh;
    &--card{
        min-height: 90%;
        margin: 30px 15px;
    }
    &__title{
       text-align: center;
       justify-content: center;
       color: #a0ebd9;
    }
    &__form{
        max-width: 100%;
        text-align: center;
        &--link{
            display: inline;
        }
        &--home{
            float: left;
            margin-top: 10px;
        }
        &--input{
           max-width: 80%;
           display: inline-block;
        }
        &--add{
            display: inline-block;
        }
    }
    &__list{
        &--checkbox{
            width: 80%;
            text-align: left;
        }
        &--remove{
            font-weight: 200;
            padding: 6px 12px;
        }
        &--contents{
            text-justify: center;
        }
    }
}
</style>