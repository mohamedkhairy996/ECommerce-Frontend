export interface User {
    id?: string;
    username: string;
    password: string;
    email?: string;
    name?: string;
    address?: string;
    city?: string;
    phoneNumber?: string;
    role:string[]; // 'Customer' or 'Admin'
}
