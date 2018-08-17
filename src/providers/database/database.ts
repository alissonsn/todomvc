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

  repository: AbstractRepository<TaskModel>

  constructor(public http: HttpClient) {
    this.repository = new AbstractRepository<TaskModel>(new Array<TaskModel>())
  }

  handleTasks(){
    return this.repository;
  }
}
