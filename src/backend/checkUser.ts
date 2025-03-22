import { useQuery as useConvexQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function checkUserFn(args: { username: string, email: string }) {
    const checkUser = useConvexQuery(api.users.checkUser, args)
    // Don't think I can do this, bc the function is not a react hook
    // but I'm using a hook in it.
    return !!checkUser;
}