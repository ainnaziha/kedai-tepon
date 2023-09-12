export class User {
    id: string;
    email: string;
    displayName: string;
    token: string;
  
    constructor(data: any) {
      this.id = data.user.id;
      this.email = data.user.email;
      this.displayName = data.user.displayName;
      this.token = data.token;
    }
  }