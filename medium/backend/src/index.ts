import { Hono } from "hono";

const app = new Hono();

app.post("/api/v1/user/signup", (c) => {
    return c.text("Hello from Hono.")
})

app.post("/api/v1/user/signin", (c) => {
    return c.text("Hello from Hono.")
})

app.post("/api/v1/blog", (c) => {
    return c.text("Hello from Hono.")
})

app.put("/api/v1/blog", (c) => {
    return c.text("Hello from Hono.")
})

app.get("/api/v1/blog", (c) => {
    return c.text("Hello from Hono.")
})

app.get("/api/v1/blog/blog", (c) => {
    return c.text("Hello from Hono.")
})

export default app
