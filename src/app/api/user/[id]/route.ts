import { PrismaClient } from '@prisma/client';
import { AES } from 'crypto-js';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async (request: Request) => {
  const account_no = +(await request.json()).account_no - 1002784563;
  try {
    const user = await prisma.user.findUnique({
      where: {
        account_no
      },
      include: {
        transactions: true
      }
    });
    revalidatePath(request.url);
    return new NextResponse(JSON.stringify(user), { status: 201 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ err, message: 'User not found' }),
      { status: 500 }
    );
  }
};

export const PUT = async (request: Request) => {
  const req = await request.json();
  if (req.password) {
    req.password = AES.encrypt(
      req.password,
      'process.env.PASSWORD_SECRET!'
    ).toString();
  }
  const { ...all } = req;
  console.log(all);
  try {
    const updatedUser = await prisma.user.update({
      where: {
        account_no: +req.params.account_no
      },
      data: all
    });
    return new NextResponse(JSON.stringify(updatedUser), { status: 201 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ err, message: 'Operation failed' }),
      { status: 500 }
    );
  }
};
