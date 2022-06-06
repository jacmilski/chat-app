import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatFeedComponent } from './chat-feed/chat-feed.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatFormComponent } from './chat-form/chat-form.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatRoomsComponent } from './chat-rooms/chat-rooms.component';
import { ChatUsersComponent } from './chat-users/chat-users.component';
import { MaterialModule } from '../material/material.module';
import { CreateRoomDialogComponent } from './chat-rooms/create-room-dialog/create-room-dialog.component';



@NgModule({
  declarations: [
    ChatFeedComponent,
    ChatMessageComponent,
    ChatFormComponent,
    ChatRoomComponent,
    ChatRoomsComponent,
    ChatUsersComponent,
    CreateRoomDialogComponent
  ],
  entryComponents: [CreateRoomDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
  ]
})
export class ChatModule { }
