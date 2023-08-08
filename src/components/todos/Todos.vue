<template>
    <div>
        <div>
            <p>Новое описание:</p>
            <input :value="descToChange" @change="e => descToChange = e.target.value"/>
        </div>
        <div>
            <h2>Добавить туду:</h2>
            <p>Название:</p>
            <input :value="nameToAdd" @change="e => nameToAdd = e.target.value"/>
            <p>Описание:</p>
            <input :value="descToAdd" @change="e => descToAdd = e.target.value"/>
            <button @click="onAdd()">Добавить</button>
        </div>
        <h1>Todo list:</h1>
        <div style="display: flex; gap: 8px; justify-content: center; flex-direction: column; align-items: center">
            <div v-for="todo in todos" style="width: 300px; border-radius: 6px; padding: 20px; background: lightblue">
                <Todo :todo="todo" :remove-todo="removeTodo" :set-todos="setTodos" :set-name-to-change="setNameToChange"/>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import {ITodo} from "@/models";
    import {v4 as uuid} from "uuid";
    import {defineComponent, PropType} from "vue";
    import Todo from "@/components/todos/todo/Todo.vue";
    export default defineComponent({
        components: {Todo},
        data() {
            return {
                nameToChange: "",
                descToChange: "",
                nameToAdd: "",
                descToAdd: ""
            }
        },
        props: {
            todos: {
                type: Array as PropType<Array<ITodo>>,
            },
            removeTodo: {
                type: Function as PropType<(id: string) => ITodo[]>,
            },
            editTodo: {
                type: Function as PropType<(d: ITodo) => ITodo[]>,
            },
            addTodo: {
                type: Function as PropType<(d: ITodo) => ITodo[]>,
            },
            setTodos: {
                type: Function as PropType<(d: ITodo[]) => void>
            }
        },
        methods: {
            setNameToChange(name: string) {
                this.nameToChange = name;
                this.onEdit()
            },
            onAdd() {
                if (this.nameToAdd && this.descToAdd) {
                    const todos = this.addTodo!({
                        id: uuid(),
                        name: this.nameToAdd,
                        desc: this.descToAdd
                    })
                    this.setTodos!(todos);
                }
            },
            onEdit() {
                if (this.nameToChange && this.descToChange) {
                    const todos = this.editTodo!({
                        name: this.nameToChange,
                        desc: this.descToChange
                    })
                    this.setTodos!(todos);
                }
            }
        }
    })
</script>