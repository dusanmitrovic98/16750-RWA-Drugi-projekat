import { Role } from "./role";

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role;
    token?: string;
    boughtItemsIds: number[];

    constructor(){
        this.username = "";
        this.password = "";
        this.firstName = "";
        this.lastName = "";
        this.token = "";
        this.boughtItemsIds = new Array<number>();
        this.role = Role.User;
    }
}