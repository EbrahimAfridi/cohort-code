Why does Prisma do not work out of the box for Cloudflare Workers, reason being Cloudflare own run-time,
as it does not support node run-time due to which many libraries which are heavily dependent on node run-time
do-not work on the Cloudflare.

One another reason is serverless architecture of Cloudflare, it has many worker at various regions trying to
connect to the database but the databases like Postgres do-not allow many connections to the database.

Here comes the connection pooling to the save,