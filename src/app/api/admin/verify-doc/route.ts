import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const PUT = async (request: Request) => {
  const account_no = +(await request.json()).account_no - 1002784563;
  console.log(account_no);
  try {
    await prisma.user.update({
      where: {
        // account_no: +req.params.account_no,
        account_no: +account_no
      },
      data: {
        verified: true,
        verifying: false
      }
    });
    return new NextResponse(
      JSON.stringify({ message: 'Verified Successfully' }),
      {
        status: 201
      }
    );
  } catch (e) {
    console.log(e);
    return new NextResponse(
      JSON.stringify({ e, message: 'Operation failed' }),
      {
        status: 500
      }
    );
  }
};
