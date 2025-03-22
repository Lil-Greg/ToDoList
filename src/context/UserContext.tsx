import { createContext, ReactNode, useState } from "react";
import { User, UserContextType } from "../libraries/types";

const UserContext = createContext<UserContextType>({ isAuthenticated: false, user: null, setUser: null })
export default UserContext

type Props = {
    children: ReactNode
}
export function UserContextProvider({ children }: Props) {
    // Set to cookies stuff after setup
    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = !!user;

    return <UserContext.Provider value={{ isAuthenticated, user, setUser }}>
        {children}
    </UserContext.Provider>
}