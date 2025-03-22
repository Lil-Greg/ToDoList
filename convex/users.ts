import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUser = query({
    args: {
        id: v.id("users")
    },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id)
    },
});

export const getUsername = query({
    args: {
        username: v.string()
    },
    handler: async (ctx, args) => {
        const query = await ctx.db.query("users")
            // Want to switch this up and add an index thingy instead
            // of filter
            .filter(data => data.eq(data.field("username"), args.username))
            .collect()
        return query.map((user) => user.username)
    }
});

export const checkUser = query({
    args: {
        username: v.string(),
        email: v.string()
    },
    handler: async (ctx, args) => {
        return await ctx.db.query("users")
            .withIndex("by_username_email", q => q.eq("username", args.username).eq("email", args.email))
            .collect();
    }
});

export const createUser = mutation({
    args: {
        password: v.string(),
        username: v.string(),
        email: v.string(),
        profilePicture: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("users", { username: args.username, password: args.password, email: args.email, profilePicture: args.profilePicture });
    }
});