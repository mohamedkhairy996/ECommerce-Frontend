import { User } from "./user";

export interface GetUsersDTO {
    success: boolean;
    data: User[];
}
