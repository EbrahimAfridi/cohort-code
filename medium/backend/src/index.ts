import {Hono} from 'hono'
import {PrismaClient} from '@prisma/client/edge'
import {withAccelerate} from '@prisma/extension-accelerate'
import {sign, verify} from "hono/jwt"

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET_KEY: string,
    }
}>()

// Middleware

app.use("/api/v1/blog/*", async (c, next) => {
    const header = c.req.header("authorization") || "";
    const token = header.split(" ")[1]

    // Response will have an id because we signed the jwt with an id while signing in.
    const response = await verify(token, c.env.JWT_SECRET_KEY);
    if (response.id) {
        await next()
    } else {
        c.status(403)
        return c.json({error: "unauthorized"})
    }
})

app.post("/api/v1/signup", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();

    const user = await prisma.user.create({
        data: {
            email: body.email,
            password: body.password
        },
    })

    const token = await sign({id: user.id}, c.env.JWT_SECRET_KEY)

    return c.json({jwt: token})
})

app.post("/api/v1/signin", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: body.email,
        },
    })

    const jwt = await sign({id: user.id}, c.env.JWT_SECRET_KEY)

    return c.json({jwt})
})

app.post("/api/v1/blog", (c) => {
    return c.text('Hello Hono!')
})

app.put("/api/v1/blog", (c) => {
    return c.text('Hello Hono!')
})

app.get("/api/v1/blog/:id", (c) => {
    return c.text('Hello Hono!')
})

app.get('/', (c) => {
    return c.text('Hello Hono!')
})

export default app
