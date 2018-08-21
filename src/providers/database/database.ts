import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskModel } from '../../model/task.model';
import { AbstractRepository } from './AbstractyRepository';

/**
 * Fornecedor de dados.
 * @author Alisson Nascimento
 */
@Injectable()
export class DatabaseProvider {

  apiUrl = "http://localhost:8080/task"

  repository: AbstractRepository<TaskModel>

  constructor(public http: HttpClient) {
    this.repository = new AbstractRepository<TaskModel>(new Array<TaskModel>())
  }

  handleTasks(){
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl)
        .toPromise()
        .then(
          res => {
            this.repository = new AbstractRepository<TaskModel>(res as Array<TaskModel>)
            resolve();
          }
        );
    });
  }

  handleRepository(){
    return this.repository;
  }

  saveTask(task: TaskModel) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl, task)
        .toPromise()
        .then(
          res => {
            this.repository.add(task)
            resolve();
          }
        );
    });
  }

  changeTask(task: TaskModel) {
    console.log(task);
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl, task)
        .toPromise()
        .then(
          res => {
            resolve();
          }
        );
    });
  }

  removeTask(task: TaskModel) {
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'/remover/'+task.id)
        .toPromise()
        .then(
          res => {
            this.repository.remove(task)
            resolve();
          }
        );
    });
  }

  removeManyTask(tasks: Array<TaskModel>) {
    let ids = tasks.map(t => t.id).join(',')
    return new Promise((resolve, reject) => {
      this.http.get(this.apiUrl+'/remover-muitos/'+ids)
        .toPromise()
        .then(
          res => {
            resolve();
          }
        );
    });
  }

}
