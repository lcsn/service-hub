import { Component, OnInit, OnDestroy } from '@angular/core';

import * as firebase from 'firebase/app';
import { FirebaseService } from 'src/app/__services/firebase.service';
import { ImageService } from 'src/app/__services/image.service';
import { Subscription } from 'rxjs';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ArticleService } from 'src/app/__services/article.service';
import { Article } from 'src/app/__model/article.model';
import { Image } from 'src/app/__model/image.model';

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

  articleForm: FormGroup;

  constructor(private firebaseService: FirebaseService,
    private articleService: ArticleService,
    private imageService: ImageService,
    private route: ActivatedRoute,
    private router: Router) { }

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
    this.articleForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'image': new FormControl(null, [Validators.required])
    });
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
        const url = uploadTask.snapshot.ref.getDownloadURL()
          .then(function (downloadURL) {
            return downloadURL;
          });
        // console.log(url);
        url.then((url: string) => {
          const image = new Image(this.articleForm.value.image.name, url);
          this.articleService.addArticle(new Article(
            this.articleForm.value.name,
            image
          ));
          this.router.navigate(['shopping/articles'], { queryParamsHandling: 'preserve' });
        });
        this.uploading = false;
        this.fileUrl = null;
        this.selectedFile = null;
      });
  }

  onSubmit() {
    console.log(this.articleForm);
    if (this.articleForm.valid) {
      this.onUpload();
    }
  }

}
