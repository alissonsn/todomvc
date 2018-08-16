
export class AbstractRepository<T>{
    rep: Array<T>

    constructor(rep: Array<T>){
        this.rep = rep
    }

    add(obj:T){
        this.rep.push(obj)
    }

    remove(obj:T){
        this.rep.forEach((item,index)=>{
            if(item==obj){
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
}