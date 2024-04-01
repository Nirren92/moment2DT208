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
        //Index får fungera som nyckel. söker upp det största talet och lägger till 1 för att undvika att få dubletter. .  
        try
        {
            const index:number = this.todoarray.reduce((max:number,elemet:Todo) => elemet.Index > max ? elemet.Index:max,0);
            this.todoarray.push(new Todo(task, false, priority,index+1));

            this.saveToLocalStorage();
            return true;
        }
        catch
        {
            return false;
        }
        
    }

    //metod för att markera todos som klara)
    markTodoCompleted(todoIndex: number): void 
    {
        const arrayIndex = this.todoarray.findIndex(todo => todo.Index === todoIndex);
        this.todoarray[arrayIndex].Completed = true;
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
        let temparray:any= JSON.parse(JsonString)|| [];
        this.todoarray = temparray.map(element => new Todo(
                element.Task,
                element.Completed,
                element.Priority,
                element.Index));
    }

    getlatest():Todo
    {
        //-1 eftersom det börjar på 0
        return this.todoarray[this.todoarray.length-1];
    }


    deleteTodo(todoIndex:number)
    {
        const arrayIndex = this.todoarray.findIndex(todo => todo.Index === todoIndex);
        this.todoarray.splice (arrayIndex,1);
        this.saveToLocalStorage();
    }


}
