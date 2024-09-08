import { Hono } from "hono";
import {cors} from "hono/cors";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
}>();

// CORS Middleware
app.use("/*", cors());

// Route Handling
app.route("/api/v1/user", userRouter)
app.route("/api/v1/blog", blogRouter)

export default app;
