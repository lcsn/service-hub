import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as firebase from 'firebase/app';
import { FirebaseService } from 'src/app/__services/firebase.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  selectedFile: File;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() { }

  onFileChanged(event: any) {
    console.log(event);
    this.selectedFile = event.target.files[0]
  }

  onUpload() {
    this.firebaseService.uploadFile(this.selectedFile);
  }

}
