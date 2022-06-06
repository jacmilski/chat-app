import { ChatService } from './../../../services/chat.service';
import { ChatRoom, Message } from './../../../models/ChatRoom';
import { RoomChangedService } from './../../../services/room-changed.service';
import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-feed',
  templateUrl: './chat-feed.component.html',
  styleUrls: ['./chat-feed.component.scss']
})
export class ChatFeedComponent implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild('scroller') feedContainer!: ElementRef;
  subscription!: Subscription;
  room!: ChatRoom;
  messages!: Message[];
  constructor(
    private roomChanged: RoomChangedService,
    private chatService: ChatService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.roomChanged.data$.subscribe((room: ChatRoom) => {
      this.messages = [];
      this.room = room;
      this.getMessages(this.room?.key || '');
    });
  }

  ngAfterViewChecked(): void {
      this.scrollToBottom();
  }


  getMessages(roomId: string) {
    this.chatService.getMessages(roomId).subscribe((messages: any[]) => {
      this.messages = messages;
    });
  }

  scrollToBottom() {
    this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
