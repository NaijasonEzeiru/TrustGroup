import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const PUT = async (
  request: Request,
  { params }: { params: { account_no: string } }
) => {
  const { isAdmin } = await request.json();
  try {
    const account = +params.account_no - 1002784563;
    console.log(account);
    const updatedAdmin = await prisma.user.update({
      where: {
        account_no: account
      },
      data: {
        isAdmin
      }
    });

    console.log(updatedAdmin);
    return new NextResponse(JSON.stringify(updatedAdmin), { status: 201 });
  } catch (e) {
    // res.status(500).json({ err, message: "Operation failed" });
    if (e instanceof PrismaClientKnownRequestError) {
      console.log(e);
      // res.status(500).json({ err, message: "Operation failed" });
    }
    console.log(e);
    return new NextResponse(
      JSON.stringify({ e, message: 'Operation failed' }),
      { status: 500 }
    );
  }
};
