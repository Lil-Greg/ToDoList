import { v } from "convex/values";
import { query } from "./_generated/server";

export const getUser = query({
    args:{
        id: v.id("users")
    },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id)
    },
});

export const getUsername = query({
    args:{
        username: v.string()
    },
    handler: async (ctx, args) => {
        return await ctx.db.query("users")
            .filter(data => data.eq(data.field("username"), args.username))
    }
})