import { TaskService } from "./app.service";
import { config } from "./app.config";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { switchMap, map, shareReplay } from 'rxjs/operators';

import { Task } from "./app.model";
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "My Todo App";
  myTask: string;
  tasks;
  editMode: boolean = false;
  taskToEdit: any = {};

  constructor(private db: AngularFirestore, private taskService: TaskService) {
    console.log("app.component.ts constructor loaded.");
  }

  async getCollection() {
    this.tasks = await this.db.collection(config.collection_endpoint)
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data: Object = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  ngOnInit() {
    this.getCollection();
  }

  edit(task) {
    console.log(task);

    //Set taskToEdit and editMode
    this.taskToEdit = task;
    this.editMode = true;

    //Set form value
    this.myTask = task.description;
  } //edit

  saveTask() {
    if (this.myTask !== null) {
      //Get the input value
      let task = {
        description: this.myTask
      };

      if (!this.editMode) {
        console.log(task);
        this.taskService.addTask(task);
      } else {
        //Get the task id
        let taskId = this.taskToEdit.id;

        //update the task
        this.taskService.updateTask(taskId, task);
      }

      //set edit mode to false and clear form
      this.editMode = false;
      this.myTask = "";
    }
  } //saveTask

  deleteTask(task) {
    //Get the task id
    let taskId = task.id;

    //delete the task
    this.taskService.deleteTask(taskId);
  } //deleteTask

}
