<script>
import  {todoData}  from "../Todostores"
let value=""
let checked=false
let placeholderStatus = "What needs to be done"
function genrateid ()
{
    return Math.random().toString(16).slice(2)
}
const handleAddTodo = () =>{

if(value!=="")
{
$todoData = [{
id:genrateid (),
text: value,
completed: checked

},...$todoData]
value = ""
}
else {
    placeholderStatus = "Please type any Todo"
}

}
</script>

<form on:submit|preventDefault={handleAddTodo}>
<div class="checkbox-container">
    <input type="checkbox" id="check" class="toggle" bind:checked={checked}>
    <label for="check" aria-label="check"></label>
</div>


<input 
type="text" 
class="todo-text" 
aria-label="add todo text"
placeholder={placeholderStatus}
bind:value={value}
>
</form>

<style>

form{
    background-color: var(--Very-DarkDesaturatedBlue);
    padding: 15px 20px;
    display: flex;
    gap: 20px;
    border-radius: var(--radius-base);
    align-items: center;
    margin-bottom: 60px;
}

.toggle{
        border: none;
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
}


label{
border:1px solid var(--Dark-GrayishBlue);
width:  26px;
height: 26px;
border-radius: 100%;
display: block;
cursor: pointer;

}

.toggle:checked + label{
    background:url("/asset/icon-check.svg"), var(--Check-Background);
    background-repeat: no-repeat;
    background-position: 50% 50%;

}

.checkbox-container{
    position: relative;
    
}

.todo-text{
    border: none;
    width: 100%;
    font-size: var(--font-24);
    background-color: inherit;
    caret-color: var(--Bright-Blue);
    height: 28px;

}
.todo-text:focus{
    box-shadow:  none !important;
}


</style>