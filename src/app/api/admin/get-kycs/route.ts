import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async (request: Request) => {
  console.log(request);
  try {
    const kyc = await prisma.verification.findMany();
    revalidatePath(request.url);
    return new NextResponse(JSON.stringify(kyc), { status: 201 });
  } catch (err) {
    return new NextResponse(JSON.stringify({ err, message: 'No KYC yet' }), {
      status: 500
    });
  }
};
