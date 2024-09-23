import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const POST = async (request: Request) => {
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
