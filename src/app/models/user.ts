export class User {
  username: string;
  password: string;
  email: string;
  role:string;
  conversation_history:string;
  constructor(username: string, password: string,email: string,role: string, conversation_history:string) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.role = role;
    this.conversation_history = conversation_history;
  }
}
