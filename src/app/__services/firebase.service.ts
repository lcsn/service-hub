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
    // let fileName = this.editFileName(file.name);
    // file.name = fileName;
    const storageChildRef = firebase.storage().ref().child('images/' + file.name);
    const uploadTask = storageChildRef.put(file, { contentType: file.type });
    return uploadTask;
    // .then((snapshot) => {
    //   console.log('File uploaded!');
    // })
    // .catch((error: any) => {
    //   console.log(error);
    // });
  }

  // private editFileName(fileName: string): string {
  //   let _fileName = (fileName.substring(0, fileName.lastIndexOf('.')) || fileName);
  //   let ext = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);
  //   fileName += '.' + new Date().getTime() + '.';
  //   fileName += ext;
  //   return _fileName;
  // }

}