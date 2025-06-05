import { AES } from "crypto-js";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ user: string }> }
) => {
  const { user } = await params;
  const req = await request.json();
  if (req.password) {
    req.password = AES.encrypt(
      req.password,
      "process.env.PASSWORD_SECRET!"
    ).toString();
  }
  const { password, ...all } = req;
  (all.password_hash = AES.encrypt(
    password,
    "process.env.PASSWORD_SECRET!"
  ).toString()),
    console.log(all);
  try {
    const updatedUser = await prisma.user.update({
      where: {
        account_no: +user,
      },
      data: all,
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
