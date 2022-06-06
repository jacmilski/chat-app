import { ChatRoom } from './../models/ChatRoom';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomChangedService {

  private room = new Subject<ChatRoom>();
  data$ = this.room.asObservable();

  changeRoom(value: ChatRoom) {
    this.room.next(value)
  }
}
