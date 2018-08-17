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
    this.lista = this.db.handleTasks().list()
    this.estado = undefined
  }

  add(event){
    if(event.key=="Enter"){
      if(this.task.nome != undefined && this.task.nome.length > 0){
        this.db.handleTasks().add(this.task)
        this.processa();

        this.task = new TaskModel()
        this.task.ativo = false;
      }
    }
  }

  remove(index:number){
    this.db.handleTasks().removeByIndex(index)
    this.processa()
  }

  change(index:number){
    this.db.handleTasks().list().forEach((item, indexOf)=>{
      if (indexOf == index) {
        item.ativo = !item.ativo;
      }
    })
    this.processa()
  }

  changeAll(){
    this.valueall = !this.valueall
    this.db.handleTasks().list().forEach(item=>{
      item.ativo = this.valueall
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
    this.lista = this.db.handleTasks().list().filter(t => !t.ativo)
  }

  todos() {
    this.estado = "todos"
    this.lista = this.db.handleTasks().list();
  }

  completos() {
    this.estado = "completos"
    this.lista = this.db.handleTasks().list().filter(t => t.ativo)
  }

  limparCompletos() {
    let completos = this.db.handleTasks().list().filter(t => t.ativo)
    this.db.handleTasks().removeCompleted(completos)
    this.processa()
  }

  hasCompletos() : boolean {
    return this.db.handleTasks().list().some(t => t.ativo)
  }

}
