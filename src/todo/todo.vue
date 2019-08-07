<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="what to do next...?"
      @keyup.enter="addTodo"
    />
    <Item
      :todo="todo"
      v-for="todo in filteredTodos"
      :key="todo.id"
      @del="deleteTodo"
    >{{todo.content}}</Item>
    <tabs :filter="filter" :todos="todos" @toggleFilter="toggleFilter" @delete="deleteComp"></tabs>
  </section>
</template>

<script>
import Item from "./item.vue";
import tabs from "./tabs.vue";
var id = 0;
export default {
  data() {
    return {
      todos: [],
      filter: "all"
    };
  },
  computed: {
    filteredTodos() {
      if (this.filter === "all") {
        return this.todos;
      } else if (this.filter === "active") {
        return this.todos.filter(todo => todo.completed == false);
      } else {
        return this.todos.filter(todo => todo.completed == true);
      }
    }
  },
  components: {
    Item,
    tabs
  },
  methods: {
    addTodo(e) {
      this.todos.unshift({
        id: id++,
        completed: false,
        content: e.target.value.trim()
      });
      e.target.value = "";
    },
    deleteTodo(id) {
      console.log("second step");
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1);
      console.log("third: finishing deleting");
    },
    toggleFilter(state) {
      this.filter = state;
    },
    deleteComp() {
      this.todos = this.todos.filter(todo => todo.completed == false);
    }
  }
};
</script>

<style lang="stylus" scoped>
.real-app {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}

.add-input {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: none;
  outline: none;
  color: inherit;
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 36px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
</style>