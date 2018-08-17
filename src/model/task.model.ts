import { Persistent } from "./persistent.model";

export class TaskModel extends Persistent {
    nome: string
    ativo: boolean = true
}