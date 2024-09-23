import { RegisterApiSchema } from '@/helpers/schema';
import { AES } from 'crypto-js';
import { NextResponse } from 'next/server';
import { PrismaClient as Prisma } from '@prisma/client';

const prisma = new Prisma();

export const POST = async (request: Request) => {
  const { password, fullName, phoneNumber, email } = RegisterApiSchema.parse(
    await request.json()
  );
  try {
    const register = await prisma.user.create({
      data: {
        password_hash: AES.encrypt(
          password,
          'process.env.PASSWORD_SECRET!'
        ).toString(),
        phoneNumber: phoneNumber!.toString(),
        fullName,
        email
      }
    });
    const { password_hash, ...rest } = register;
    return new NextResponse(
      JSON.stringify({
        ...rest,
        message: `${register.fullName} registered successfully`
      }),
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);
    if (error?.code === 'P2002') {
      return new NextResponse(
        JSON.stringify({
          message: 'A user with this email already exists'
        }),
        { status: 500 }
      );
    }
    return new NextResponse(
      JSON.stringify({
        error,
        message: error.message
      }),
      { status: 500 }
    );
  }
};
