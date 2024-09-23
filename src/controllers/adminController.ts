import { PrismaClient } from '@prisma/client';
import { AES } from 'crypto-js';
import { NextResponse } from 'next/server';
// const { PrismaClientKnownRequestError, PrismaClientUnknownRequestError, PrismaClientRustPanicError } = require("@prisma/client/runtime/library");

const prisma = new PrismaClient();

export const getUser = async (
  request: Request,
  { params }: { params: { slug: string } }
) => {
  const account_no = +params.slug;
  try {
    const user = await prisma.user.findUnique({
      where: {
        account_no
      }
    });
    return new NextResponse(JSON.stringify(user), { status: 201 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ err, message: 'User not found' }),
      { status: 500 }
    );
  }
};

export const getKycs = async () => {
  try {
    const kyc = await prisma.verification.findMany();
    return new NextResponse(JSON.stringify(kyc), { status: 201 });
  } catch (err) {
    return new NextResponse(JSON.stringify({ err, message: 'No KYC yet' }), {
      status: 500
    });
  }
};

export const getAllTransactions = async (request: Request) => {
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

export const updateUser = async (
  request: Request,
  { params }: { params: { slug: string } }
) => {
  const req = await request.json();
  const account_no = +params.slug;
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
        account_no
      },
      data: all
    });
    return new NextResponse(JSON.stringify(updatedUser), {
      status: 201
    });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ err, message: 'Operation failed' }),
      {
        status: 500
      }
    );
  }
};

export const crAccBal = async (request: Request) => {
  let { account_no, amount, currency, fullName } = await request.json();
  if (!isNaN(account_no)) {
    account_no = +account_no - 1002784563;
  }
  try {
    const updatedUser = await prisma.user.update({
      where: {
        // OR: [{ account_no: account_no }, { email: account_no }]
        account_no
      },
      data: {
        account_bal: {
          increment: +amount
        },
        // created_at,
        currency: currency,
        transactions: {
          create: [
            {
              amount: +amount,
              // charge,
              type: 'Withdrawal',
              // condition,
              cr_or_dr: 'CR',
              currency,
              // from,
              to: fullName
            }
          ]
        }
      }
    });
    const { password_hash, ...rest } = updatedUser;
    return new NextResponse(JSON.stringify(rest), { status: 201 });
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

export const dbAccBal = async (request: Request) => {
  let { account_no, amount, currency, fullName } = await request.json();
  if (!isNaN(account_no)) {
    account_no = +account_no - 1002784563;
  }
  try {
    const updatedUser = await prisma.user.update({
      where: {
        // OR: [{ account_no: account_no }, { email: account_no }]
        account_no
      },
      data: {
        account_bal: {
          decrement: +amount
        },
        // created_at,
        currency: currency,
        transactions: {
          create: [
            {
              amount: +amount,
              // charge,
              // type,
              // condition,
              cr_or_dr: 'DR',
              currency,
              // from,
              to: fullName
            }
          ]
        }
      }
    });
    const { account_bal, ...rest } = updatedUser;
    return new NextResponse(JSON.stringify(rest), {
      status: 201
    });
  } catch (e) {
    return new NextResponse(
      JSON.stringify({ e, message: 'Operation failed' }),
      {
        status: 500
      }
    );
    console.log(e);
  }
};

// export const updateVerify = async (request: Request) => {
//   let {account_no } = req.body;
//  account_no = +account_no -1002784563
//   try {
//     const updatedUser = await prisma.user.update({
//       where: {
//         // account_no: +req.params.account_no,
//         account_no:  +account_no,
//       },
//       data: {
//        verified: true,
//        verification: false
//       }
//     });
//     console.log(updatedUser)
//     res.status(201).json(updatedUser);
//   } catch (e) {
//     res.status(500).json({ e, message: "Operation failed" });
//     console.log(e)
//   }
// };

export const updateVerification = async (request: Request) => {
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

export const updateTransaction = async (request: Request) => {
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
