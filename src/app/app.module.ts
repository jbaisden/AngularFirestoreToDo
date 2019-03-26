import { TaskService } from './app.service';
import { environment } from "./../environments/environment";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

//Third Party Modules
// import { AngularFireModule } from "angularfire2";
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    // AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    console.log("AppModule constructor loaded.");

  }
}
