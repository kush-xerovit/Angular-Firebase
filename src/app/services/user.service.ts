import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }
  getUserById(id) {
    return this.firestore.collection('users').doc(id).snapshotChanges();
  }
  createUser(user: User) {
    return this.firestore.collection('users').add(user);
  }
  updateUser(user: User, id) {
    delete user.id;
    this.firestore.doc('users/' + id).update(user);
  }
  deleteUser(userId: string) {
    this.firestore.doc('users/' + userId).delete();
  }
}
