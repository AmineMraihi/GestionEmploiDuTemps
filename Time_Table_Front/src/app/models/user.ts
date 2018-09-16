import {Role} from './Role';

export class User {
    id: Number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    roles_id: Role;

}
