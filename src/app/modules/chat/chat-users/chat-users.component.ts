import { ChatService } from './../../../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { ChatUser } from 'src/app/models/ChatUser';

@Component({
  selector: 'app-chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['./chat-users.component.scss']
})
export class ChatUsersComponent implements OnInit {

  users!: ChatUser[];

  constructor(
    private chatService: ChatService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.chatService.getUsers().subscribe((users: any[]) => {
      this.users = users;
    })
  }

}
