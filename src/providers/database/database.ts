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

  apiUrl = "http://localhost:8080"

  repository: AbstractRepository<TaskModel>

  constructor(public http: HttpClient) {
    this.repository = new AbstractRepository<TaskModel>(new Array<TaskModel>())
  }

  handleTasks(){
    this.getTasks();
    return this.repository;
  }

  getTasks() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl)
        .subscribe(data => {
          console.log(data);
        });
    });
  }

}
