import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AES } from 'crypto-js';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const getUser = async (request: Request) => {
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
    return new NextResponse(JSON.stringify(user), { status: 201 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ err, message: 'User not found' }),
      { status: 500 }
    );
  }
};

export const getAllUsers = async () => {
  console.log('working');
  try {
    const user = await prisma.user.findMany({
      include: {
        verification: true,
        transactions: true
      }
    });
    // Filterm password_hash
    const list: any = [];

    user.forEach((el: Partial<(typeof user)[0]>) => {
      delete el.password_hash;
      el.account_no! += 1002784563;
      console.log(
        '🚀 ~ file: usersController.js:26 ~ user.forEach ~ el.account_bal:',
        el.account_bal
      );
      list.push(el);
    });
    console.log(
      '🚀 ~ file: usersController.js:30 ~ user.forEach ~ el.password_hash:',
      list
    );
    return new NextResponse(JSON.stringify(user), { status: 201 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ err, message: 'User not found' }),
      { status: 500 }
    );
  }
};

export const updateAdmin = async (
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

    console.log(updateAdmin);
    return new NextResponse(JSON.stringify(updateAdmin), { status: 201 });
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

export const verify = async (request: Request) => {
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

export const updateUser = async (request: Request) => {
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

export const dbAccBal = async (request: Request) => {
  let { account_no, amount, currency } = await request.json();
  if (!isNaN(account_no)) {
    account_no = +account_no - 1002784563;
  }
  try {
    const updatedUser = await prisma.user.update({
      where: {
        // OR: [{ account_no: account_no }, { email: account_no }]
        email: account_no
      },
      data: {
        account_bal: {
          decrement: +amount
        },
        currency: currency,
        transactions: {
          create: [
            {
              amount,
              // charge,
              // type,
              // condition,
              cr_or_dr: 'DR',
              currency,
              // from,
              to: account_no.toString()
            }
          ]
        }
      }
    });
    console.log(updatedUser);
    return new NextResponse(JSON.stringify(updateUser), { status: 201 });
  } catch (e) {
    console.log(e);
    return new NextResponse(
      JSON.stringify({ e, message: 'Operation failed' }),
      { status: 500 }
    );
  }
};
