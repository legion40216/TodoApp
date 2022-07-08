<script>
import  {todoData}  from "../Todostores"

export let id, text , completed

const handleCompleted = () =>{
 
    const index = $todoData.findIndex(todo =>{
        return todo.id === id
    })

  $todoData[index] = {...$todoData[index], completed }
}

const handleDelete = () =>{
    $todoData = $todoData.filter((todo)=>{
       return todo.id !== id})
 
}

</script>

<div class="todo-item">
  <div class="dragable"></div>
    <div class="checkbox-container">
        <input type="checkbox" id={id} 
        class="toggle" 
        bind:checked={completed} 
        on:change={handleCompleted}
        >
     <label for={id} aria-label="check"></label>
    </div>
    <div aria-label="todo text" class="todo-text">
        <span class:completed={completed}>{text}</span>        
    </div>
    <button aria-label="Remove todo" class="remove" on:click={handleDelete}></button>
</div>


<style>



.completed{
    text-decoration: line-through;
    color: var(--Very-DarkGrayishBlue);
    transition:  color 0.8s;
}
 .dragable{
 cursor: move;
 position: absolute;
 width: 5px;
 height: 80%;
 left: 3px;
 background: linear-gradient(to right,var(--Dark-GrayishBlue)
 1px,var(--Very-DarkDesaturatedBlue) 1px,var(--Very-DarkDesaturatedBlue) 2px,var(--Dark-GrayishBlue) 
 2px,var(--Dark-GrayishBlue) 3px,var(--Very-DarkDesaturatedBlue) 3px,var(--Very-DarkDesaturatedBlue) 4px,var(--Dark-GrayishBlue) 4px);
 }
 .remove{
    background:url("/asset/icon-cross.svg");
    width: 25px;
    height: 25px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    margin-left: auto;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.5s linear;
}

.todo-item:hover .remove{
    visibility: visible;
    opacity: 1;

}

    .todo-item{
        display: flex;
        align-items: center;
        padding:  var(--spacing-4);
        background-color: var(--Very-DarkDesaturatedBlue);
        font-size: var(--font-24);
        gap: 20px;
        border-bottom: 1px solid var(--Very-HeavyDarkGrayishBlue);
        position: relative;
    }
   
    .checkbox-container{
    display: flex;
    align-items: center;
    position: relative;
    border-radius: 100%;
    width:  28px;
    height: 28px;
    justify-content: center;
    }

    label{
        border:1px solid var(--Dark-GrayishBlue);
        width:  26px;
        height: 26px;
        border-radius: 100%;
        cursor: pointer;
        background-color: var(--Very-DarkDesaturatedBlue)
    }

    .checkbox-container:hover{
        background: var(--Check-Background);
    }

    .toggle:checked +  label{
    background:url("/asset/icon-check.svg"), var(--Check-Background);
    background-repeat: no-repeat;
    background-position: 50% 50%;

}

    .toggle{
        border: none;
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
    }

</style>