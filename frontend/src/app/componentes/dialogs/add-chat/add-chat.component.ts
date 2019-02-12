import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { ChatService } from '../../../services/chat.service';

@Component({
  selector: 'app-add-chat',
  templateUrl: './add-chat.component.html',
  styleUrls: ['./add-chat.component.css']
})
export class AddChatComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private chatService: ChatService,
    public dialogRef: MatDialogRef<AddChatComponent>,
  ) { }

  salaForm = this.fb.group({
    nombre: ['', Validators.required],
  })
  ngOnInit() {
  }
  addSala(){
    this.chatService.nuevaSala(this.salaForm.value.nombre)
  }
}
