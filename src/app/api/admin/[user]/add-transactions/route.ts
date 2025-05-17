import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ user: string }> }
) => {
  const account_no = +(await params).user;
  const { data } = await request.json();
  try {
    const updatedUser = await prisma.user.update({
      where: {
        account_no,
      },
      data: { trans: data as Prisma.JsonArray },
    });
    return new NextResponse(JSON.stringify(updatedUser), { status: 201 });
  } catch (err) {
    console.log({ err });
    return new NextResponse(
      JSON.stringify({ err, message: "Operation failed" }),
      { status: 500 }
    );
  }
};
