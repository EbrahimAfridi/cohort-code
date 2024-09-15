import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import {signInInput, signUpInput} from "@ebrahimafridi/medium-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET_KEY: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success } = signUpInput.safeParse(body);

  if (!success) {
    return c.text("Inputs are not correct.", 411)
  }
  console.log(c.env.DATABASE_URL)
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        password: body.password,
        email: body.email,
      },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET_KEY);
    c.status(200);
    return c.json({"user": user, "jwt": jwt});
  } catch (error) {
    console.error(error);
    return c.text("Invalid", 411);
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  console.log(body)
  const { success } = signInInput.safeParse(body);

  if (!success) {
    return c.text("Inputs are not correct.", 411)
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      return c.text("Incorrect credentials.", 403);
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET_KEY);

    return c.text(jwt, 200);
  } catch (error: any) {
    console.error(error);
    return c.text(`Invalid ${error.message}`, 411);
  }
});
