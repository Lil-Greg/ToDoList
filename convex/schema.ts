import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        username: v.string(),
        password: v.string(),
        profilePicture:v.string(),
        toDo: v.id("toDo"),
        id:v.id("users")
    }),
    toDo: defineTable({
        task: v.string(),
        isCompleted: v.boolean(),
        private: v.boolean(),
        id: v.id("toDo")
    })
})