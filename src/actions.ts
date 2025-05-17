import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUser(id: string) {
  const account_no = +id - 1002784563;
  try {
    const user = await prisma.user.findUnique({
      where: {
        account_no,
      },
      include: {
        transactions: true,
      },
    });
    console.log({ action: user });
    if (!user) {
      return { message: "No user found", status: 404 };
    }
    // if (
    //   user?.trans &&
    //   typeof user?.trans === "object" &&
    //   Array.isArray(user?.trans)
    // ) {
    //   const trans = user?.trans as Prisma.JsonArray;
    //   return { user, status: 200 };
    // }
    return { user, status: 200 };
  } catch (err) {
    console.log({ err });
    return { message: "Something went wrong", status: 500 };
  }
}
