import base64 from "base-64";

export class AuthService {
  private static instance: AuthService;
  private username: string = "";
  private password: string = "";

  private constructor() {}

  public static getInst() {
    if (this.instance === undefined) {
      this.instance = new AuthService();
    }
    return this.instance;
  }

  public setUsername(name: string) {
    this.username = name;
  }
  public setPassword(password: string) {
    this.password = password;
  }

  public getUsername(): string {
    return this.username;
  }

  public getPassword(): string {
    return this.password;
  }

  public getEncoded(): string {
    console.log(`${this.username}:${this.password}`);
    const encoded = base64.encode(`${this.username}:${this.password}`);
    return encoded;
  }
}
