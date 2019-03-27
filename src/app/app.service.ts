import { config } from "./app.config";
import { Task } from "./app.model";
import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable()
export class TaskService {
  tasks: AngularFirestoreCollection<Task>;
  private taskDoc: AngularFirestoreDocument<Task>;

  constructor(private db: AngularFirestore) {
    console.log("TaskService constructor loaded.");

    //Get the tasks collecction
    // this.tasks = db.collection<Task>(config.collection_endpoint);

  }

  addTask(task) {
    //Add the new task to the collection
    // this.tasks.add(task);
    this.db.collection(`${config.collection_endpoint}`).add(task);
  } //addTask

  updateTask(id, update) {
    //Get the task document
    this.taskDoc = this.db.doc<Task>(`${config.collection_endpoint}/${id}`);

    this.taskDoc.update(update);
  } //updateTask

  deleteTask(id) {
    //Get the task document
    this.taskDoc = this.db.doc<Task>(`${config.collection_endpoint}/${id}`);

    //Delete the document
    this.taskDoc.delete();
  } //deleteTask
}
