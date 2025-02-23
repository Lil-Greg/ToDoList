import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        username: v.string(),
        password: v.string(),
        email: v.string(),
        profilePicture:v.optional(v.string()),
        toDo: v.id("toDo")
    }),
    toDo: defineTable({
        task: v.string(),
        isCompleted: v.boolean(),
        private: v.boolean()
    })
});