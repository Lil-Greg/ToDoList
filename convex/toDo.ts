import { query } from "./_generated/server"

export const paginatedToDos = query({
    handler: async (ctx) => {
        return await ctx.db.query("toDo").collect()
    }
})