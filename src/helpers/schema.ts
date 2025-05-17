import { number, string, z } from "zod";

export const LoginSchema = z.object({
  email: string()
    .email({ message: "Please input a valid email address" })
    .max(50, { message: "Must contain at most 50 characters" }),
  password: string()
    .min(4, { message: "Must contain at least 4 characters" })
    .max(20, { message: "Must contain at most 20 characters" }),
});

export const UpdateBalSchema = z.object({
  account_no: number({
    invalid_type_error: "Please input a valid acoount number",
  }).min(1000000000, { message: "Please input a valid acoount number" }),
  amount: number({
    invalid_type_error: "Please input a valid amount",
  }).positive(),
  currency: string({ invalid_type_error: "Please select a currency" }).min(1, {
    message: "Please select a currency",
  }),
  date: z.coerce.date().optional(),
});

export const RegisterApiSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Must contain at least 2 characters" })
    .max(15, { message: "Must contain at most 15 characters" })
    .regex(/[a-zA-z]/, { message: "Must contain alphabets only" }),
  phoneNumber: z.string().optional(),
  email: z
    .string()
    .email({ message: "Please input a valid email address" })
    .max(50, { message: "Must contain at most 50 characters" }),
  password: z
    .string()
    .min(4, { message: "Must contain at least 4 characters" })
    .max(20, { message: "Must contain at most 20 characters" }),
});

export const EditUserSchema = z.object({
  pin: z.string().length(5, { message: "Must be 5 characters long" }),
  isAdmin: z.boolean(),
  verified: z.boolean(),
  email: z
    .string()
    .email({ message: "Please input a valid email address" })
    .max(50, { message: "Must contain at most 50 characters" }),
  fullName: z
    .string()
    .min(2, { message: "Must contain at least 2 characters" })
    .max(15, { message: "Must contain at most 15 characters" })
    .regex(/[a-zA-z]/, { message: "Must contain alphabets only" }),
  password: z
    .string()
    .min(4, { message: "Must contain at least 4 characters" })
    .max(20, { message: "Must contain at most 20 characters" }),
  TAC: z.string().length(6, { message: "Must be 6 characters long" }),
  MLC: z.string().length(8, { message: "Must be 8 characters long" }),
  IMF: z.string().length(7, { message: "Must be 7 characters long" }),
});

export const CreateUserSchema = RegisterApiSchema.extend({
  confirm_password: z
    .string()
    .min(4, { message: "Must contain at least 4 characters" })
    .max(20, { message: "Must contain at most 20 characters" }),
}).superRefine(({ confirm_password, password }, ctx) => {
  if (confirm_password !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords do not match",
      path: ["confirm_password"],
    });
  }
});

export const RegisterSchema = RegisterApiSchema.extend({
  agree: z.boolean(),
  confirm_password: z
    .string()
    .min(4, { message: "Must contain at least 4 characters" })
    .max(20, { message: "Must contain at most 20 characters" }),
}).superRefine(({ confirm_password, password, agree }, ctx) => {
  if (confirm_password !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords do not match",
      path: ["confirm_password"],
    });
  }
  if (agree !== true) {
    ctx.addIssue({
      code: "custom",
      message: "Agree to the Terms and condition",
      path: ["agree"],
    });
  }
});
// model Trans {
//   id             Int      @id @default(autoincrement())
//   account        User     @relation(fields: [userAccount_no], references: [account_no])
//   amount         Int
//   // charge         Int      @default(0)
//   type           String   @default("Deposit")
//   condition      String   @default("Completed")
//   currency       String   @default("$")
//   created_at     DateTime @default(now())
//   name           String
//   userAccount_no Int
//   note           String   @default("")
// }

export const TransactionsSchema = z.object({
  id: string().length(10),
  amount: z.number(),
  type: z.string(),
  date: z.string(),
  accountName: string(),
  note: z.string(),
});
// export const UpdateBalSchema = z.object({
// 	email: string()
// 		.email({ message: "Please input a valid email address" })
// 		.max(50, { message: "Must contain at most 50 characters" }),
// 	password: string()
// 		.min(4, { message: "Must contain at least 4 characters" })
// 		.max(20, { message: "Must contain at most 20 characters" })
// });

// export const requestOtpSchema = z.object({
//   email: z.string().email(),
//   redirect: z.string().default("/"),
// });

export type LoginSchemaType = z.infer<typeof LoginSchema>;

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;

export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;

export type UpdateBalSchemaType = z.infer<typeof UpdateBalSchema>;

// export type requestOtpInput = z.TypeOf<typeof requestOtpSchema>;

export const TestSchema = z.object({
  email: string()
    .email({ message: "Please input a valid email address" })
    .max(10, { message: "Must contain at most 50 characters" }),
  password: string()
    .min(4, { message: "Must contain at least 4 characters" })
    .max(10, { message: "Must contain at most 20 characters" }),
  figure: number(),
});
