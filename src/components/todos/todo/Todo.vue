<template>
    <h4>{{todo.name}}</h4>
    <p>Описание: {{todo.desc}}</p>
    <button @click="setNameToChange(todo.name)">Изменить описание</button>
    <button @click="rmTodo(todo.id)">Удалить</button>
</template>
<script lang="ts">
import {defineComponent, PropType} from "vue";
import {ITodo} from "@/models";
    export default defineComponent({
        name: "Todo",
        props: {
            todo: {
                type: Object as PropType<ITodo>,
            },
            removeTodo: {
                type: Function as PropType<(name: string) => ITodo[]>,
            },
            setTodos: {
                type: Function as PropType<(d: ITodo[]) => void>
            },
            setNameToChange: {
                type: Function as PropType<(name: string) => void>
            }
        },
        methods: {
            rmTodo(id: string) {
                const todos = this.removeTodo!(id);
                this.setTodos!(todos);
            }
        }
    })
</script>