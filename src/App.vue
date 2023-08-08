<template>
    <router-link style="margin: 10px" to="/">home</router-link>
    <router-link style="margin: 10px" to="/bar">Bar</router-link>
    <router-link style="margin: 10px" to="/foo">Foo</router-link>
    <button @click="todoView = !todoView">Отображать {{todoView ? "карты" : "тудушки"}}</button>
    <Todos v-if="todoView" :todos="todos" :set-todos="setTodos" :remove-todo="removeTodo" :edit-todo="editTodoByName" :add-todo="addTodo"/>
    <Cards v-if="!todoView"/>
    <router-view />
</template>

<style>
</style>

<script lang="ts">
    import {v4 as uuid} from "uuid";
    import {ITodo} from "@/models";
    import {defineComponent} from "vue";
    import Todos from "@/components/todos/Todos.vue";
    import Cards from "@/components/cards/Cards.vue";
    interface IData {
        todos: ITodo[],
        todoView: boolean
    }
    export default defineComponent({
        name: "App",
        components: {Cards, Todos},
        data(): IData {
            return {
                todos: [
                    {
                        id: uuid(),
                        name: "first todo",
                        desc: "Это моя первая туду"
                    },
                    {
                        id: uuid(),
                        name: "second todo",
                        desc: "Это моя вторая туду задачка!!!"
                    },
                    {
                        id: uuid(),
                        name: "TTTThird todo",
                        desc: "3 задача"
                    }
                ],
                todoView: true
            }
        },
        methods: {
            addTodo(d: ITodo): ITodo[] {
                this.todos = [...this.todos, d]
                return this.todos;
            },
            removeTodo(id: string): ITodo[] {
                this.todos = this.todos.filter(todo => todo.id !== id);
                return this.todos;
            },
            editTodoByName(d: ITodo): ITodo[] {
                const todoIndex = this.todos.findIndex(todo => todo.name == d.name);
                if (todoIndex > -1) {
                    const newTodo = {
                        ...this.todos[todoIndex],
                        name: d.name,
                        desc: d.desc
                    }
                    this.todos = [...(this.todos.slice(0, todoIndex)), newTodo, ...(this.todos.slice(todoIndex + 1))]
                }
                return this.todos
            },
            setTodos(d: ITodo[]): void {
                this.todos = d;
            }
        }
    })
</script>
