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
        owner: v.id("users"),
        tasks: v.array(
            v.object({
                isCompleted: v.boolean(),
                message: v.string(),
                private: v.boolean(),
                requirements: v.array(v.string())
            })
        ),
    })
});

/*
    A toDo will be:
    {
        owner: "10294g4ugh9",
        tasks: [
            {
                isCompleted:false,
                message:"Workout"
                private:false

                // anyone can see it on the page

                requirements: [
                    "Get Protein Powder",
                    "Walk to the Gym"
                ]

                // the pre-requisites or requirements
                // in order to complete the task
            },
            {
                isCompleted:false,
                message:"Slide on the Opps",
                private: true,
                requirements: []
            }, etc.
        ]
    }
*/