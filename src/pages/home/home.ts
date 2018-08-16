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
  valueall: boolean;

  constructor(
    private db: DatabaseProvider,
    public navCtrl: NavController) {
  }

  ngOnInit(){
    this.task = new TaskModel()
    this.task.estado = false
    this.valueall = false
    this.lista = this.db.handleTasks().list()
  }

  add(event){
    // console.log(event.target.value)
    if(event.key=="Enter"){
      this.db.handleTasks().add(this.task)
      // event.target.value = ''
      this.task = new TaskModel()
      this.task.estado = false;
    }
  }

  remove(index:number){
    this.db.handleTasks().removeByIndex(index)
  }

  change(index:number){
    let task = this.db.handleTasks().list()[index]
    task.estado = !task.estado
  }

  changeAll(){
    this.valueall = !this.valueall
    this.db.handleTasks().list().forEach(item=>{
      item.estado = this.valueall
    })
  }

}
