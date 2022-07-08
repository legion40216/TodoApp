<script>
import  {todoData}  from "../Todostores"
import { createEventDispatcher } from "svelte/internal";
import Media from "./media.svelte";


const dispatch = createEventDispatcher()
export let todos = []
export let selectedFilter

$:incompleteTodos = todos.filter(item=>{return !item.completed}).length
$:completedTodos = todos.filter(item=>{return item.completed}).length
let filters = ['all','active','completed']

function handleFilter (newFilter) {
    selectedFilter=newFilter
    dispatch("selected",selectedFilter)
}

const handleClear = () =>{
$todoData = $todoData.filter(item=>{
    return !item.completed
})
}

</script>

<div class="todos">
<span>{incompleteTodos} items left</span>
<Media query="(max-width: 700px)" let:matches>
	{#if !matches}
<ul class="filters">
    {#each filters as filter}
    <button 
    on:click={()=>handleFilter(filter)}
    class:selected={selectedFilter==filter}
    class="filter"
    >
    {filter}
    </button>
    {/each}
</ul>
{/if}
</Media>
<button 
on:click={handleClear}
class:hidden={completedTodos===0}
>
Clear Completed</button>
</div>

<Media query="(max-width: 700px)" let:matches>
	{#if matches}
	<div class="mobile-filters">
		<ul class="filters">
            {#each filters as filter}
            <button 
            on:click={()=>handleFilter(filter)}
            class:selected={selectedFilter==filter}
            class="filter"
            >
            {filter}
            </button>
            {/each}
        </ul>
	</div>
	{/if}
</Media>

<style>



.mobile-filters{
    padding: var(--spacing-16);
    background-color: var(--Very-DarkDesaturatedBlue);
    display: flex;
    justify-content: center;
    margin-top: 30px;
}



.hidden{
    visibility: hidden;
}
.filter
{
    padding: 3px 5px;
    text-transform: capitalize;
    border: 1px solid transparent;
    border-radius: var(--radius-base);
}
.selected{
    border-color: var(--Light-GrayishBlue);
}

.todos span:nth-child(1){
    font-size: var(--font-18);
    color: var(--Very-DarkGrayishBlue);
}

.todos{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-4);
    background-color: var(--Very-DarkDesaturatedBlue);
    font-family: inherit;
}

.todos ul{
    list-style: none;
}

.filters{
    display: flex;
    gap: var(--spacing-4);
}

</style>