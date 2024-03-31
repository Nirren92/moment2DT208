import { Todo, InterfaceTodo } from "./todo";


// KLass och iterface
export interface InterfaceTodoList{
    addTodo(task: string, priority: '1'|'2'|'3'): boolean;
}

// kör implements för att säkerställa att de följer varandra
export class TodoList implements InterfaceTodoList {

    private todoarray:Todo[] = [];

    constructor()
    {
        
        this.loadFromLocalStorage();

    }

    //lägger till en todo punkt i array // här ska det sparas till localstorage. 
    addTodo(task: string, priority: '1'|'2'|'3'): boolean
    {


        this.todoarray.push(new Todo(task, false, priority,this.todoarray.length));
        //uppdaterar det sparade datan. 
        console.log("läggertill i storage");
        this.saveToLocalStorage();
        return false;
    }



    //metod för att markera todos som klara)
    markTodoCompleted(todoIndex: number): void 
    {
        console.log("klarmarkerar nr "+todoIndex);
        this.todoarray[todoIndex].Completed = true;
        this.saveToLocalStorage();
    }

    //metod för att hämta hela listan av todos
    getTodos(): Todo[]
    {
        return this.todoarray
    }

    //metod för att spara todos till LocalStorage
    saveToLocalStorage(): void 
    {
        const JsonString:string = JSON.stringify(this.todoarray);
        localStorage.clear();
        localStorage.setItem("todolist",JsonString);
    }

    //metod för att hämta todos från LocalStorage
    loadFromLocalStorage(): void
    {
        let JsonString:any = localStorage.getItem("todolist");
        this.todoarray = JSON.parse(JsonString)|| [];
    }
}
