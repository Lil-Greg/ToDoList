import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        username: v.string(),
        password: v.string(),
        email: v.string(),
        profilePicture: v.string(),
        toDo: v.optional(v.id("toDo"))
    })
        .index("by_username_email", ["username", "email"])
    ,
    toDo: defineTable({
        tasks: v.array(
            v.object({
                isCompleted: v.boolean(),
                message: v.string()
            })
        ),
        private: v.boolean()
    })
});