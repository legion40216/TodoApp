import {writable} from 'svelte/store'

export const todoData = writable(JSON.parse(localStorage.getItem("todo_Data") || "[]"))

todoData.subscribe(value => 
    localStorage.todo_Data = JSON.stringify(value));

 
      
    export let theme = writable(JSON.parse(localStorage.getItem("theme_Data") 
    ||'[{"theme":false}]' ))


    theme.subscribe(value => 
        localStorage.theme_Data = JSON.stringify(value));
    
     
