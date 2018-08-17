import { Persistent } from "../../model/persistent.model";

/**
 * Repositório abstrato de onde os dados são recuperados
 * @author Alisson Nascimento
 */
export class AbstractRepository<T extends Persistent>{
    rep: Array<T>

    constructor(rep: Array<T>){
        this.rep = rep
    }

    add(obj:T){
        if (obj.id == undefined || obj.id == 0) {
            let High = Number.MAX_VALUE
            let Low = Number.MIN_VALUE
            obj.id =  Math.floor(Math.random() * (1 + High - Low)) + Low
        }
        console.log("Adicionando obj " + obj.id)
        this.rep.push(obj)
    }

    remove(obj:T){
        this.rep.forEach((item,index)=>{
            if(item==obj){
                this.removeByIndex(index)
            }
        })
    }

    removeCompleted(completed: Array<T>){
        this.rep.forEach((item,index)=>{
            completed.forEach(itemCompleted => {
                if (itemCompleted.id == item.id) {
                    console.log("Removendo obj " + itemCompleted.id)
                    this.removeByIndex(index)
                }
            })
        })
    }

    removeByIndex(index:number){
        this.rep.splice(index,1)
    }

    list(){
        return this.rep;
    }
}