import { Component } from '@angular/core';
import { FirebaseService } from './__services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private firebaseService: FirebaseService) {

  }

  ngOnInit() {
    this.firebaseService.initFirebase()
    .then(() => {
      console.log('Firebase initialized!');
    });
  }

}
