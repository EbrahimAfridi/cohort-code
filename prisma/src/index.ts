import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface UpdateParams {
  firstname: string;
  lastname: string;
}

async function insertUser(
  username: string,
  password: string,
  firstname: string,
  lastname: string
) {
  const res = await prisma.user.create({
    data: {
      firstname,
      lastname,
      email: username,
      password,
    },
    select: {
      id: true,
      password: true,
      firstname: true,
    },
  });
  console.log(res);
}

async function updateUser(
  username: string,
  { firstname, lastname }: UpdateParams
) {
  const res = await prisma.user.update({
    where: {
      email: username,
    },
    data: {
      firstname,
      lastname,
    },
  });
  console.log(res);
}

async function getUser(username: string) {
  const res = await prisma.user.findUnique({
    where: {
      email: username,
    },
  });
  console.log(res);
}

async function deleteUser(username: string) {
  const res = await prisma.user.delete({
    where: {
      email: username,
    },
  });
  console.log(res);
}

// insertUser("ebu10@email.com", "123456", "Ebu10", "Don");
// updateUser("ebu10@email.com", { firstname: "Ebu10", lastname: "Don10" })
//   .then(() => console.log("User updated!"))
//   .catch((err) => console.error(err));
// getUser("ebu10@email.com");
deleteUser("ebu1@email.com");