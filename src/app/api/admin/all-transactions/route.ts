import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    const user = await prisma.transaction.findMany();
    return new NextResponse(JSON.stringify(user), { status: 201 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ err, message: 'User not found' }),
      {
        status: 500
      }
    );
  }
};

export const PUT = async (request: Request) => {
  const { id, amount, created_at, charge, currency, difference } =
    await request.json();
  try {
    await prisma.transaction.update({
      where: {
        id: +id
      },
      data: {
        amount,
        created_at,
        charge,
        currency,
        account: {
          update: {
            currency,
            account_bal: { increment: difference }
          }
        }
      }
    });
    return new NextResponse(
      JSON.stringify({ message: 'Updated Successfully' }),
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
