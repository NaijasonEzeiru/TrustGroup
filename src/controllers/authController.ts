import { PrismaClient as Prisma } from '@prisma/client';
import { AES, enc } from 'crypto-js';
import { NextRequest, NextResponse } from 'next/server';
import { LoginSchema, RegisterApiSchema } from '@/helpers/schema';
import { signJwt, verifyJWT } from '@/helpers/token';

const prisma = new Prisma();

export const registerUser = async (request: Request) => {
  const { password, fullName, phoneNumber, email } = RegisterApiSchema.parse(
    await request.json()
  );
  // console.log(`to prisma ${password}, ${fullName}, ${phoneNumber} and ${email}`)
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

export const login = async (request: NextRequest) => {
  const { email, password } = LoginSchema.parse(await request.json());
  console.log(`${email} and ${password}`);
  if (email) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email
        }
      });
      if (!user) {
        return new NextResponse(
          JSON.stringify({
            message: 'Email address is not registered'
          }),
          { status: 401 }
        );
      } else {
        const { password_hash, ...rest } = user;
        const unhashedPassword = AES.decrypt(
          password_hash,
          'process.env.PASSWORD_SECRET!'
        ).toString(enc.Utf8);
        if (password !== unhashedPassword) {
          return new NextResponse(
            JSON.stringify({
              message: 'Incorrect password. Try again'
            }),
            { status: 401 }
          );
        } else {
          const accessToken = await signJwt({
            account_no: user.account_no,
            is_admin: user.isAdmin
          });
          rest.account_no = 1002784563 + rest.account_no;
          const response = NextResponse.json(
            {
              ...rest,
              Message: 'logged in successfully'
            },
            { status: 201 }
          );
          response.cookies.set({
            name: 'access_token',
            value: accessToken,
            httpOnly: true,
            path: '/'
          });
          return response;
        }
      }
    } catch (err) {
      return new NextResponse(JSON.stringify(err), { status: 500 });
    }
  } else {
    return new NextResponse(JSON.stringify({ message: 'No Email Provided' }), {
      status: 401
    });
  }
};

export const me = async (request: NextRequest) => {
  const token = request.cookies.get('access_token')?.value;
  console.log({ me: token });
  if (token) {
    // const { account_no }: any = verify(token, process.env.JWT_SECRET!);
    const { account_no } = await verifyJWT<{
      account_no: number;
      is_admin: boolean;
    }>(token);
    if (!account_no) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: 'invalid token'
        }),
        { status: 401 }
      );
    } else {
      try {
        const user = await prisma.user.findUnique({
          where: { account_no },
          include: { transactions: true }
        });
        if (!user) {
          return new NextResponse(
            JSON.stringify('Email address is not registered'),
            { status: 401 }
          );
        }
        const { password_hash, ...rest } = user;
        const accessToken = await signJwt({
          account_no: user.account_no,
          is_admin: user.isAdmin
        });
        rest.account_no = 1002784563 + rest.account_no;
        console.log(rest);
        const response = NextResponse.json(
          {
            ...rest,
            Message: 'logged in successfully'
          },
          { status: 201 }
        );
        response.cookies.set({
          name: 'access_token',
          value: accessToken,
          httpOnly: true,
          path: '/'
        });
        return response;
      } catch (err) {
        return new NextResponse(JSON.stringify(err), { status: 500 });
      }
    }
  } else {
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: 'Error! Token was not provided'
      }),
      { status: 401 }
    );
  }
};

export const logout = async (req: NextRequest) => {
  console.log('logout');
  const response = NextResponse.redirect(
    new URL(
      `/?${new URLSearchParams({ message: 'Logged out successfully' })}`,
      req.url
    )
  );
  response.cookies.set({
    name: 'access_token',
    value: '',
    httpOnly: true,
    path: '/',
    maxAge: -1
  });
  return response;
};
