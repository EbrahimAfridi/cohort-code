import { Hono } from "hono";

const app = new Hono();

// Auth Function
async function authMiddleware(c: any, next: any) {
  if (c.req.header === "Authorization") {
    // Do validation
    await next();
  } else {
    return c.text("You donot have access. ");
  }
}

// Middleware
// app.use(authMiddleware);

// Routes
app.post("/", authMiddleware, async (c) => {
  const body = await c.req.json();
  console.log(body);
  console.log(c.req.header("Authorized"));
  console.log(c.req.query("params"));

  return c.text("Hello Hono!");
});
app.post("/user", (c) => {
  return c.text("Hello Hono!");
});

export default app;
