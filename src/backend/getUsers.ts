import { useQuery as useConvexQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useQuery as useTanSQuery } from "@tanstack/react-query";

// Simply just gonna span calls instead of attempting to
// use cached data.

// export default function useGetUsers() {
//     const convexCall = useConvexQuery(api.users.checkUser);
//     const { data, isLoading, isError, error } = useTanSQuery({
//         queryKey: ["AllUsers"],
//         queryFn: () => convexCall,
//         staleTime: 1000 * 60 * 3,//3 mins
//         // ChatGPT Suggestion:
//         // Makes the convex call a boolean
//         enabled: !!convexCall,
//     });

//     return { data, isLoading, isError, error };

// };