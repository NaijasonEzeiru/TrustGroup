import { AES } from 'crypto-js';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

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
