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
        this.rep.push(obj)
    }

    remove(obj:T){
        this.rep.forEach((item,index)=>{
            if(item == obj){
                this.removeByIndex(index)
            }
        })
    }

    removeByIndex(index:number){
        this.rep.splice(index,1)
    }

    list(){
        return this.rep;
    }

    set(lista: Array<T>){
        this.rep = lista
    }
}