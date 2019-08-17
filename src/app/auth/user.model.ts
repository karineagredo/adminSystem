export class User {
  public name: string;
  public email: string;
  public uid: string;
  constructor(userObject: UserObject) {
    this.name = (userObject && userObject.name) || null;
    this.email = (userObject && userObject.email) || null;
    this.uid = (userObject && userObject.uid) || null;
  }
}
interface UserObject {
  name: string;
  email: string;
  uid: string;
}
