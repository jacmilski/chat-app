import { ChatRoom } from './../models/ChatRoom';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Injectable } from '@angular/core';
import { Message } from '../models/ChatRoom';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user!: firebase.User;
  rooms!: AngularFireList<ChatRoom>; // typ wbudowany w Firebase
  messages!: AngularFireList<Message>;
  userName!: string;


  constructor(
    private fireAuth: AngularFireAuth,
    private db: AngularFireDatabase
    ) {
      this.fireAuth.authState.subscribe(user => { // inf. o zalogowanym użytkowniku
        if (user) {
          this.user = user;
        }

        this.getUser().subscribe((chatUser: any) => {
          this.userName = chatUser?.displayName;
        });
      });

    }

  getUsers() {
    return this.db.list('/users').valueChanges();
  }

  getUser() {
    const path = `/users/${this.user?.uid}`;
    return this.db.object(path).valueChanges();
  }

  getRooms() {
    return this.db.list('/rooms').snapshotChanges()
      .pipe(
        map( changes => changes.map((c: any) => ({ key: c.payload.key, ...c.payload.val()})))
      )
  }

  createRoom(name: string) {
    this.rooms = this.db.list('/rooms');
    this.rooms.push({
      roomName: name,
    });
  }

  sendMessage(msg: string | null, roomId: string) {
    const path = `/messages/${roomId}`;
    const time = new Date().toLocaleString();
    this.messages = this.db.list(path);

    this.messages.push({
      message: msg,
      timeSent: time,
      username: this.userName,
      email: this.user?.email,
    })
  }

  getMessages(roomId: string) {
    const path = `/messages/${roomId}`;
    return this.db.list(path).valueChanges();
  }
}
