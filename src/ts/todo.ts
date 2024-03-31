// KLass och iterface
 export interface InterfaceTodo{
    Task:string;
    Completed:Boolean;
    Priority:'1'|'2'|'3';
    Index:number;
}

// kör implements för att säkerställa att de följer varandra
export class Todo implements InterfaceTodo {
    Task:string;
    Completed:boolean;
    Priority:'1'|'2'|'3';
    Index:number;

    constructor(Task:string,Completed:boolean,Priority:'1'|'2'|'3',Index:number)
    {
        this.Task = Task;
        this.Completed = Completed;
        this.Priority = this.validateProgression(Priority);
        this.Index = Index;
    }
    //Funktion som kontrollerar att värde är ok. 
    private validateProgression(Priority:'1'|'2'|'3') :'1'|'2'|'3'
    {
        if(['1','2','3'].includes(Priority))
        {
            return Priority;
        }
        else
        {
            //SÄtter defaultvärde
            console.error('Fel värde sätter default värde');
            return'1';
        }   
    }
}
