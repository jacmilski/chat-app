import { RoomChangedService } from './../../../services/room-changed.service';
import { ChatRoom } from './../../../models/ChatRoom';
import { ChatService } from './../../../services/chat.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateRoomDialogComponent } from './create-room-dialog/create-room-dialog.component';

@Component({
  selector: 'app-chat-rooms',
  templateUrl: './chat-rooms.component.html',
  styleUrls: ['./chat-rooms.component.scss']
})
export class ChatRoomsComponent implements OnInit {

  rooms!: ChatRoom[];

  constructor(
    private chatService: ChatService,
    private dialog: MatDialog,
    private roomChanged: RoomChangedService,
  ) { }

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms() {
    this.chatService.getRooms().subscribe((rooms: ChatRoom[]) => {
      this.rooms = rooms;
      this.changeRoom(this.rooms[0])
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateRoomDialogComponent, {
      width: '400px',
      height: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.chatService.createRoom(result)
      }
    });
  }

  changeRoom(room: ChatRoom) {
    this.roomChanged.changeRoom(room)
  }
}
