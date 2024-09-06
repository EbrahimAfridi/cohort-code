import {z} from 'zod'
import express from "express"

const app = express()

// Define schema for user profile
const userProfileSchema = z.object({
    name: z.string().min(1),
    email: z.string().email({ message: 'Email address is required' }),
    age: z.number().min(18).optional(),
})

// Inferring a type from Zod Schema.
type userProfileSchema = z.infer<typeof userProfileSchema>

app.put("/", async (req, res) => {
    const {success} = userProfileSchema.safeParse(req.body)
    const updateBody: userProfileSchema = req.body

    if (!success) {
        res.status(411).json({})
    }

    // update database here
    res.json({
        message: "User updated successfully",
    })
})

app.listen(3000)