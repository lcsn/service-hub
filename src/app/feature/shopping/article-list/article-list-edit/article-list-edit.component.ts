import { Component, OnInit, OnDestroy } from '@angular/core';

import * as firebase from 'firebase/app';
import { FirebaseService } from 'src/app/__services/firebase.service';
import { ImageService } from 'src/app/__services/image.service';
import { Subscription } from 'rxjs';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-list-edit',
  templateUrl: './article-list-edit.component.html',
  styleUrls: ['./article-list-edit.component.css']
})
export class ArticleListEditComponent implements OnInit, OnDestroy {

  title: string;
  editMode = false;
  routeParamsSubscription: Subscription;
  selectedFile: File = null;
  fileUrl: any;
  uploading = false;

  constructor(private firebaseService: FirebaseService,
    private imageService: ImageService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeParamsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.editMode = params['index'] != null;
        }
      );
    this.initialize();
  }

  initialize() {
    if (this.editMode) {
      this.title = 'Artikel editieren';
    } else {
      this.title = 'Neuer Artikel'
    }
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
  }

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
