import { useQuery as useConvexQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useQuery as useTanSQuery } from "@tanstack/react-query";

export default function getUsers() {
    const convexCall = useConvexQuery;
    const { data, isLoading, isError, error } = useTanSQuery({ queryKey: ["AllUsers"], queryFn: () => convexCall(api.users.getMultiUsers) });
    return { data, isLoading, isError, error };
}