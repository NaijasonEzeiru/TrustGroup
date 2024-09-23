import { PrismaClient as Prisma } from "@prisma/client";
import { AES, enc } from "crypto-js";
import { NextRequest, NextResponse } from "next/server";
import { LoginSchema } from "@/helpers/schema";
import { signJwt, verifyJWT } from "@/helpers/token";

const prisma = new Prisma();

export const POST = async (request: NextRequest) => {
  const { email, password } = LoginSchema.parse(await request.json());
  console.log(`${email} and ${password}`);
  if (email) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });
      console.log({ user });
      if (!user) {
        return new NextResponse(
          JSON.stringify({
            message: "Email address is not registered",
          }),
          { status: 401 }
        );
      } else {
        const { password_hash, ...rest } = user;
        const unhashedPassword = AES.decrypt(
          password_hash,
          "process.env.PASSWORD_SECRET!"
        ).toString(enc.Utf8);
        if (password !== unhashedPassword) {
          return new NextResponse(
            JSON.stringify({
              message: "Incorrect password. Try again",
            }),
            { status: 401 }
          );
        } else {
          const accessToken = await signJwt({
            account_no: user.account_no,
            is_admin: user.isAdmin,
          });
          rest.account_no = 1002784563 + rest.account_no;
          const response = NextResponse.json(
            {
              ...rest,
              Message: "logged in successfully",
            },
            { status: 201 }
          );
          response.cookies.set({
            name: "access_token",
            value: accessToken,
            httpOnly: true,
            path: "/",
          });
          return response;
        }
      }
    } catch (err) {
      return new NextResponse(JSON.stringify(err), { status: 500 });
    }
  } else {
    return new NextResponse(JSON.stringify({ message: "No Email Provided" }), {
      status: 401,
    });
  }
};

export const GET = async (request: NextRequest) => {
  const token = request.cookies.get("access_token")?.value;
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
          message: "invalid token",
        }),
        { status: 401 }
      );
    } else {
      try {
        const user = await prisma.user.findUnique({
          where: { account_no },
          include: { transactions: true },
        });
        if (!user) {
          return new NextResponse(
            JSON.stringify("Email address is not registered"),
            { status: 401 }
          );
        }
        const { password_hash, ...rest } = user;
        const accessToken = await signJwt({
          account_no: user.account_no,
          is_admin: user.isAdmin,
        });
        rest.account_no = 1002784563 + rest.account_no;
        console.log(rest);
        const response = NextResponse.json(
          {
            ...rest,
            Message: "logged in successfully",
          },
          { status: 201 }
        );
        response.cookies.set({
          name: "access_token",
          value: accessToken,
          httpOnly: true,
          path: "/",
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
        message: "Error! Token was not provided",
      }),
      { status: 401 }
    );
  }
};
