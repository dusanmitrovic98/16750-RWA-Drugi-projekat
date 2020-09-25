import { Role } from "./role";

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role;
    token?: string;
    boughtItemId: number[];

    constructor(){
        this.username = "";
        this.password = "";
        this.firstName = "";
        this.lastName = "";
        this.role = Role.User;
        this.token = "";
        this.boughtItemId = new Array<number>();
    }
}