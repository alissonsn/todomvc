import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { TaskModel } from '../../model/task.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  nomeTarefa:  string
  task: TaskModel
  lista: Array<TaskModel>
  estado: string
  valueall: boolean

  constructor(
    private db: DatabaseProvider,
    public navCtrl: NavController) {
  }

  ngOnInit(){
    this.task = new TaskModel()
    this.task.completa = false
    this.valueall = false
    this.db.handleTasks().then(res => this.lista = this.db.handleRepository().list())
    this.estado = undefined
    this.nomeTarefa = undefined
  }

  add(event){
    if(event.key=="Enter"){
      console.log(event);
      if(this.nomeTarefa != undefined && this.nomeTarefa.length > 0){
        this.task.nome = this.nomeTarefa
        this.db.handleRepository().add(this.task)
        this.processa()

        this.task = new TaskModel()
        this.task.completa = false
        this.task.nome = undefined

        this.nomeTarefa = undefined
      }
    }
  }

  remove(index:number){
    this.db.handleRepository().removeByIndex(index)
    this.processa()
  }

  change(index:number){
    let task = this.db.handleRepository().list()[index]
    task.completa = !task.completa;
    this.processa()
  }

  changeAll(){
    this.valueall = !this.valueall
    this.db.handleRepository().list().forEach(item=>{
      item.completa = this.valueall
    })
    this.processa()
  }

  processa() {
    if (this.estado == "ativos") {
      this.ativos()
    }

    if (this.estado == "todos") {
      this.todos()
    }

    if (this.estado == "completos") {
      this.completos()
    }
  }

  ativos() {
    this.estado = "ativos"
    this.lista = this.db.handleRepository().list().filter(t => !t.completa)
  }

  todos() {
    this.estado = "todos"
    this.lista = this.db.handleRepository().list();
  }

  completos() {
    this.estado = "completos"
    this.lista = this.db.handleRepository().list().filter(t => t.completa)
  }

  limparCompletos() {
    let arrayRef = this.db.handleRepository().list().filter(task => !task.completa);
    this.db.handleRepository().set(arrayRef)
    this.processa()
  }

  hasCompletos() : boolean {
    return this.db.handleRepository().list().some(t => t.completa)
  }

  itemsLeft(): number {
    return this.db.handleRepository().list().filter(t => !t.completa).length;
  }

}
