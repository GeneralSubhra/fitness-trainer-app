import { defineSchema,defineTable } from "convex/server";
import {v} from 'convex/values'

export default defineSchema({
    users:defineTable({
        clerkId:v.string(),
        email:v.string(),
        name:v.string(),
        image:v.optional(v.string()),
    }).index('by_clerkId',['clerkId']),

    plans:defineTable({
        userID:v.id('users'),
        name:v.string(),
        workoutPlan:v.object({
            schedule: v.array(v.string()),
            exercises:v.array(v.object({
                day: v.string(),
                routines: v.array(v.object({
                    name: v.string(),
                    sets: v.optional(v.number()),
                    reps: v.optional(v.number()),
                    duration: v.optional(v.number()),
                    description: v.optional(v.string()),
                    excercise: v.optional(v.array(v.string())),
                }))
            }))
        }),

        dietplan:v.object({
            dailyCalories: v.number(),
            meals: v.array(v.object({
                name: v.string(),
                foods: v.array(v.string())
        }))
        
    }),
    isActive :v.boolean(),

    })
    .index("by_user_id",["userID"])
    .index("by_active",["isActive"]),
});