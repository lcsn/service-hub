import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';
import { FirebaseService } from 'src/app/__services/firebase.service';
import { ImageService } from 'src/app/__services/image.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  selectedFile: File = null;
  fileUrl: any;
  uploading = false;

  constructor(private firebaseService: FirebaseService,
    private imageService: ImageService) { }

  ngOnInit() { }

  onFileChanged(event: any) {
    // console.log(event);
    this.selectedFile = event.target.files[0];
    // this.fileUrl = URL.createObjectURL(this.selectedFile);
    let reader = new FileReader();
    reader.onload = (result) => {
      this.fileUrl = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  onUpload() {
    // console.log(this.selectedFile);
    const uploadTask = this.firebaseService.uploadFile(this.selectedFile)
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        this.uploading = true;
        var progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (uploadTask.snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      },
      (error: any) => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log('File available at', downloadURL);
          // this.imageService.imageUrls.push(downloadURL);
          // console.log(this.imageService.imageUrls);
        });
        this.uploading = false;
        this.fileUrl = null;
        this.selectedFile = null;
      });
  }

}
