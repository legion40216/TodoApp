<script>
import { onDestroy } from "svelte/internal";
import  {todoData}  from "./Todostores"
import  {theme}  from "./Todostores"
import ItemList from "./components/itemList.svelte";
import Header from "./components/header.svelte";
import Footer from "./components/footer.svelte";
import {flip} from 'svelte/animate';
import {fade,scale} from 'svelte/transition'

let todos
let selectedFilter = 'all'

const unsubscribe = todoData.subscribe(data =>{
	todos=data
})
onDestroy(unsubscribe)




$:filteredTodos=FilterTodos(todos,selectedFilter)

const handleSelected = (e) =>
{   
	selectedFilter = e.detail
}


function FilterTodos(todos,selectedFilter){
switch(selectedFilter){
case 'all':
	return todos

	case 'active':
	return todos.filter(item =>{
	return !item.completed
	})

	case 'completed':
		return todos.filter(item =>{
			return 	item.completed
		})

}
}

let itemIndex
$:itemIndex

function dragStart(itemIndexDrag)
{
	itemIndex = itemIndexDrag
}

function  drop( itemIndexDrop )
{
	console.log(itemIndex,itemIndexDrop)
	const index = todos.findIndex(todo =>{
        return itemIndexDrop === todo.id
    })
	const index2 = todos.findIndex(todo =>{
        return itemIndex === todo.id
    })

	todos[index2]=todos.splice(index, 1, todos[index2])[0]
	
}

let  theme_btn_sun = $theme[0].themes
let  theme_btn_moon = !$theme[0].themes

const handleToggleTheme = () =>{
	theme_btn_sun = !theme_btn_sun
	theme_btn_moon = !theme_btn_moon
	$theme=[{themes:theme_btn_sun}]
}

</script>




<svelte:head>
	{#if !$theme[0].themes}
	<link rel='stylesheet' href='/globalLight.css'>
	{/if}
</svelte:head>

<main>
<div class="heading" >
<h1 class="title">Todo</h1>
<button class="theme_btn "
class:theme_btn_sun 
class:theme_btn_moon 
on:click={handleToggleTheme}></button>
</div>
<Header />

<div class="todo-box">
<div class="item-container" >

{#each filteredTodos as item (item.id) }
<div 
draggable="true"
on:dragstart={ () => dragStart(item.id)}
on:drop={() => drop(item.id)}
ondragover="return false"
animate:flip
in:fade="{{duration: 500}}"
out:scale="{{duration: 500}}"
>
    <ItemList {...item} />
</div>
{/each}

</div>

<Footer {todos} {selectedFilter} on:selected={handleSelected}/>
</div>
<div class="drag-span">
	<span>Drag and drop to reorder list</span>
</div>

</main>

<style>

	

.drag-span{
	text-align: center;
	margin-top: 50px;
	color: var(--Very-DarkGrayishBlue);
	font-size: 13px
}


.heading{
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 35px;
}	


.theme_btn_sun{
width: 30px;
height: 30px;
background-image: url("/asset/icon-sun.svg");
background-repeat: no-repeat;
background-position: 50% 50%;
}

.theme_btn_moon{
width: 30px;
height: 30px;
background-image: url("/asset/icon-moon.svg");
background-repeat: no-repeat;
background-position: 50% 50%;

}

.theme_btn:focus{
	box-shadow: none;
}

.todo-box{
	border-radius: 4px ;
	overflow: hidden;
}


.title{
	text-transform: uppercase;
	color: hsl(0deg 0% 100%);
	font-size: var(--font-32);
	letter-spacing: 15px;
}

main{
    min-width: 230px;
    max-width: 500px;
	width: 100%;
	position: absolute;
	top: 30%; 
	right: 50%;
    bottom: 32%;
    transform: translate(50%,-50%);
    }
</style>
