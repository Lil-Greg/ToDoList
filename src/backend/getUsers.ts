import { useQuery as useConvexQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useQueryClient, useQuery as useTanSQuery } from "@tanstack/react-query";

async function getConvexData(){
    
    const fetching = await new Promise((resolve, reject) => {
        setTimeout(() => {}, 3000);

    }).then((data) => {console.log(`After Promise: ${data}`)});
    return fetching;
}
export default function useGetUsers() {
    const convexCall = useConvexQuery(api.users.getMultiUsers);
    const { data, isLoading, isError, error } = useTanSQuery({ 
        queryKey: ["AllUsers"],
        queryFn: () => convexCall,
        retry:true,
        staleTime:1000*60*3,     
     });
     const queryClient = useQueryClient();
     console.log(data)
     for(let x=0; x===5;x++){
        // Clear Cache and Refetch
        queryClient.invalidateQueries({queryKey:["AllUsers"]});

        if(data === undefined){
            continue;
        }
        break;
     }
    return { data, isLoading, isError, error };
}