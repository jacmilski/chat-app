import { MatSnackBar } from '@angular/material/snack-bar';
import { ChatRoom } from './../../../models/ChatRoom';
import { ChatService } from './../../../services/chat.service';
import { RoomChangedService } from './../../../services/room-changed.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit, OnDestroy {

  message!: string | null;
  room!: ChatRoom;
  subscription!: Subscription;

  constructor(
    private roomChanged: RoomChangedService,
    private chatService: ChatService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.subscription = this.roomChanged.data$.subscribe((room: ChatRoom) => {
      this.room = room;
    })
  }

  sendMessage() {
    if (this.message !== '') {
      this.chatService.sendMessage(this.message, this.room?.key || '');
      this.message = null;
    } else {
      this.snackBar.open('This message is empty, please write something', '', {panelClass: 'empty-message'})
    }
  }

  handleMessage(event: { keyCode: number; }) {
    if (event.keyCode === 13) {
      this.sendMessage();
    }
  }

  ngOnDestroy() : void {
    this.subscription.unsubscribe();
  }

}
