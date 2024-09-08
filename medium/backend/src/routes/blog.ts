import {PrismaClient} from "@prisma/client/edge";
import {withAccelerate} from "@prisma/extension-accelerate";
import {Hono} from "hono";
import {verify} from "hono/jwt";
import {createBlogInput, updateBlogInput} from "@ebrahimafridi/medium-common";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET_KEY: string;
    },
    Variables: {
        userId: string;
    }
}>();

// Middleware
blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || ""
    try {
        const user = await verify(authHeader, c.env.JWT_SECRET_KEY)
        if (user) {
            c.set("userId", user.id as string)
            await next()
        } else {
            return c.text("You are not logged in.", 403)
        }
    } catch (e) {
        return c.text("You are not logged in.", 403)
    }

})

// End Points
blogRouter.post("/", async (c) => {
    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);

    if (!success) {
        return c.text("Inputs are not correct.", 411)
    }

    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: authorId,
            thumbnail: body.thumbnail,
        },
    });

    return c.json({id: blog.id, body: body, blog: blog});
});

blogRouter.put("/", async (c) => {
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);

    if (!success) {
        return c.text("Inputs are not correct.", 411)
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blog = await prisma.blog.update({
        where: {
            id: body.id,
        },
        data: {
            title: body.title,
            content: body.content,
            thumbnail: body.thumbnail,
        },
    });
    return c.json({id: blog.id});
});

// TODO: ADD PAGINATION LATER
blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blogs = await prisma.blog.findMany({
            select: {
                published: true,
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true,
                    },
                },
                thumbnail: true,
            },
        });
        if (blogs.length === 0) {
            c.json(blogs);
        }
        return c.json(blogs);
    } catch (error) {
        return c.json({message: "Error while fetching blogs"}, 400);
    }
});

blogRouter.get("/:id", async (c) => {
    const id = c.req.param("id");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: id,
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true,
                    }
                }
            }
        });
        return c.json(blog);
    } catch (error) {
        return c.json({message: "Error while fetching blog"}, 400);
    }
});
