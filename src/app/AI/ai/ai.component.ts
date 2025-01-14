import { Component } from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {Chat} from "../AIModel/chat";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AiServiceService} from "../ai-service.service";
import {aiConversation_History} from "../../interfaces/interfaces";
import {Store} from "@ngrx/store";
import {AuthState} from "../../state/app.state";
import {isTokenExpired} from "../../state/auth";
import {UserService} from "../../services/user.service";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-ai',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './ai.component.html',
  styleUrl: './ai.component.css'
})


export class AiComponent {
  clicked: boolean = false;
  chats:Chat[]=[]
  inputMessage:string = "";
  isLoggedIn: boolean = false;
  token: string | null = null;

  form:FormGroup = new FormGroup({
    message: new FormControl("", [Validators.required]),
  })
  shortcuts: { name:string }[]=[
    {name:"همبرگری خودتو معرفی کن🍔"},
    {name:"غذا های فست فود آرین چی هستن❓"},
    {name:"بهترین غذای فست فود چیه🔥"},
    {name:"پر فروش ترین غذای رستوران 💎"}
  ];
  menuShow : boolean = false;
  menuShow2 : boolean = false;
  stop: boolean = false;

  constructor(private aiService:AiServiceService,private userAuth: UserService,private store:Store<{ auth: AuthState }>) {
    if (!this.stop) {
      store.select(state => state.auth).subscribe((auth: AuthState) => {
        this.token = auth.token
        if (this.token && !isTokenExpired(this.token)) {
          this.isLoggedIn = true
        }else {
          this.isLoggedIn = false
        }

      })
      this.stop = true

    }
  }


  showMenu () {
    this.clicked = !this.clicked;
    this.menuShow2 = !this.menuShow2;

    setTimeout(()=>{
      this.menuShow = !this.menuShow;
    },700)
  }

  unshowMenu () {
    this.menuShow2 = false;
    setTimeout(()=>{
      this.menuShow = !this.menuShow;
      this.clicked = !this.clicked;

    },700)
  }

  sendMessage(message:string, isButton:boolean) {
    if (this.form.valid || isButton ) {
      console.log(this.isLoggedIn)
      console.log(this.token)

        if (this.isLoggedIn && this.token) {
          const newMessage:Chat = new Chat("user",message)
          this.chats.push(newMessage)
          const aiMessage:Chat = new Chat("AI","")
          this.chats.push(aiMessage)

          const userConversation: aiConversation_History = {
            role:"user",
            content:newMessage.message
          }
          this.aiService.getAIMessage(message,this.token).subscribe((response:any) =>{
            this.chats[this.chats.length-1].message = response.message
            const aiConversation: aiConversation_History = {
              role:"assistant",
              content:response.message
            }
          })
          this.form.controls['message'].setValue("")
        }
    }
  }


}
