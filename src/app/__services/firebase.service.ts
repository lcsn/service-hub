import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  initFirebase(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        firebase.initializeApp({
          apiKey: 'AIzaSyBLXnycJGJBJECzYDKVNtIuDydzBeIp_Sw',
          authDomain: 'shopping-list-b7e7f.firebaseapp.com',
          databaseURL: 'https://shopping-list-b7e7f.firebaseio.com',
          projectId: 'shopping-list-b7e7f',
          storageBucket: 'shopping-list-b7e7f.appspot.com',
          messagingSenderId: '1018263477634'
        });
        resolve(1);
      }, 100);
    });
  }

  uploadFile(file: File) {
    const imgPath = 'images/' + this.editFileName(file.name);
    console.log('Saving image to: ' + imgPath);
    const storageChildRef = firebase.storage().ref().child(imgPath);
    const uploadTask = storageChildRef.put(file, { contentType: file.type });
    return uploadTask;
  }

  private editFileName(fileName: string): string {
    // let _fileName = (fileName.substring(0, fileName.lastIndexOf('.')) || fileName);
    let _fileName = 'image';
    let ext = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);
    _fileName += '.' + new Date().getTime() + '.';
    _fileName += ext;
    return _fileName;
  }

}