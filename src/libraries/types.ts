// For type-setting objects in the entire app.

import { Id } from "../../convex/_generated/dataModel";

export interface UserTypes{
    map(arg0: (user: string[]) => void): import("react").ReactNode
    users: User[]
}
export interface User{
    username: string,
    password: string,
    email: string,
    profilePicture?:string,
    toDo: Id<"toDo">
    _id: Id<"users">;
     _creationTime: number;
}
export interface UserContextType {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>> | null,
    isAuthenticated: boolean
};