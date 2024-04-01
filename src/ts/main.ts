import { TodoList} from "./listtodo";
import { Todo } from "./todo";

//DOM event
document.addEventListener("DOMContentLoaded",init);

//lägger till uppgift i objektlista
const inputform = document.getElementById("inputform") as HTMLFormElement;
inputform.addEventListener("submit",(event)=> {
    event.preventDefault();
    const taskInput:HTMLInputElement = document.getElementById("task") as HTMLInputElement;
    const PriorityInput:HTMLInputElement = document.getElementById("Priority") as HTMLInputElement;
    let tempres:Boolean = todolist.addTodo(taskInput.value,PriorityInput.value as '1'|'2'|'3');
    //Kontrollerar att det gick bra att skapa objekt. 
    if(tempres)
    addrow(todolist.getlatest());
});

//variabler
const todolist:TodoList = new TodoList();

////////////////////////////////////////
function init()
{
    const tabell = document.getElementById("tabell");
    if(tabell)
    
    

    todolist.getTodos().forEach(element => {
        addrow(element);
    });

    
}

function addrow(todo:Todo)
{

    let tabell:any = document.getElementById("tabell")
    if(tabell)
    {
        console.log("data",todolist);
        //skapar rad   
        let row:Element = document.createElement("tr");
        //skapar cell och sätter värde.
        let todotask:Element = document.createElement("td");
        todotask.textContent = todo.Task;
        row.appendChild(todotask);

        //skapar cell och sätter värde.
        let todoPriority:Element = document.createElement("td");
        todoPriority.textContent = todo.Priority;
        row.appendChild(todoPriority);

        //skapar cell och sätter värde. 
        let todoCompleted:Element = document.createElement("td");
        todoCompleted.textContent = todo.Completed.toString();
        row.appendChild(todoCompleted);

        //skapar cell och skapar knapp. skriver värde till föregående cell samt uppdaterar objekt.  
        let cellbutton:Element = document.createElement("td");
        let completebutton:Element = document.createElement("button");
        completebutton.textContent = "Mark Complete/Incomplete"
        completebutton.addEventListener("click",function(){
            console.log("denna klarmarkeras"+todo.Index);
            todolist.markTodoCompleted(todo.Index);
            todoCompleted.innerHTML="true";
        });
        cellbutton.appendChild(completebutton);
        row.appendChild(cellbutton);    
        
        let celldeletebutton:Element = document.createElement("td");
        let deletebutton:Element = document.createElement("button");
        deletebutton.textContent = "Delete"
        deletebutton.addEventListener("click",function(){
            console.log("denna klarmarkeras"+todo.Index);
            todolist.deleteTodo(todo.Index);
            row.remove();
        });
        celldeletebutton.appendChild(deletebutton);
        row.appendChild(celldeletebutton);


        //Skriver data till tabell. 
        tabell.appendChild(row);
    }
    else
    {
        console.error("nåt gick fel vid hämtning av tabell.")
    }
}