import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AES } from 'crypto-js';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    let { identity_doc, address_doc, account_no } = await request.json();
    account_no = +account_no - 1002784563;
    // console.log(req.params.account_no)
    await prisma.verification.create({
      data: {
        user_id: account_no,
        identity_doc,
        address_doc,
        users: {
          connect: {
            account_no
          }
        }
      }
    });
    await prisma.user.update({
      where: {
        account_no
      },
      data: {
        verifying: true
      }
    });
    return new NextResponse(
      JSON.stringify({ message: 'Details submitted sucessfully' }),
      { status: 201 }
    );
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
