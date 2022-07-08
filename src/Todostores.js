import {writable} from 'svelte/store'

export const todoData = writable(JSON.parse(localStorage.getItem("todo_Data") || "[]"))

todoData.subscribe(value => 
    localStorage.todo_Data = JSON.stringify(value));

 