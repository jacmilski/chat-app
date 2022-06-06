import { AuthService } from './../../../services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/ChatRoom';
import { ChatUser } from 'src/app/models/ChatUser';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  @Input()  message!: Message;
  isOnMessage: boolean = false;

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.isOnMessage = user.email === this.message.email;
      }
    })
  }

}
