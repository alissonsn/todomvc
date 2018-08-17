import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { TaskModel } from '../../model/task.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  task: TaskModel
  lista: Array<TaskModel>
  tasks: Array<TaskModel>
  estado: string;
  valueall: boolean;

  constructor(
    private db: DatabaseProvider,
    public navCtrl: NavController) {
  }

  ngOnInit(){
    this.task = new TaskModel()
    this.task.ativo = false
    this.valueall = false
    this.tasks = this.db.handleTasks().list()
    this.lista = this.db.handleTasks().list()
    this.estado = undefined
  }

  add(event){
    // console.log(event.target.value)
    if(event.key=="Enter"){
      this.db.handleTasks().add(this.task)
      // event.target.value = ''
      this.task = new TaskModel()
      this.task.ativo = false;
    }
  }

  remove(index:number){
    this.db.handleTasks().removeByIndex(index)
  }

  change(index:number){
    let task = this.db.handleTasks().list()[index]
    task.ativo = !task.ativo
  }

  changeAll(){
    this.valueall = !this.valueall
    this.db.handleTasks().list().forEach(item=>{
      item.ativo = this.valueall
    })
  }

  ativos() {
    this.estado = "ativos"
    this.lista = this.tasks.filter(t => !t.ativo)
  }

  todos() {
    this.estado = "todos"
    this.lista = Object.assign([], this.tasks);
  }

  completos() {
    this.estado = "completos"
    this.lista = this.tasks.filter(t => t.ativo)
  }

  limparCompletos() {
    this.tasks = this.tasks.filter(t => !t.ativo)
    this.lista = this.lista.filter(t => !t.ativo)
  }

  hasCompletos() : boolean {
    return this.tasks.some(t => t.ativo)
  }

}
