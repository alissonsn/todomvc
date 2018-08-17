import { Persistent } from "./persistent.model";

/**
 * Modelo de dados para a entidade de tarefa.
 * @author Alisson Nascimento
 */
export class TaskModel extends Persistent {
    nome: string
    completa: boolean = true
    editando: boolean = false
}