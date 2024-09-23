"use client";

import { useState } from "react";
import styles from "@/styles/Dashboard.module.css";
// import { toast } from "@/components/hooks/use-toast";
import Modal from "@/components/Modal";
import { bankList } from "@/helpers/banksList";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MessageSquareWarning } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const SendMoney = () => {
  const [account_no, setAccount_no] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState("First Bank");
  const [trial, setTrial] = useState(0);
  const [isLoading, setIsloading] = useState(false);
  const [imf, setImf] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const FormSchema = z.object({
    pin: z.string().min(5, {
      message: "Your pin must be 5 digits.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
    console.log({ pin: data });
    if (data.pin == "44774") {
      setTrial(1);
      setOpenModal(true);
    } else {
      alert("Wrong pin");
    }
    // 44774
  }

  const sendMoney = (e: any) => {
    setIsloading(true);
    e.preventDefault();
    setTimeout(whatever, 1);

    setIsloading(false);
  };

  function whatever() {
    setShowPin(true);
    // alert("Account number not found. \nPlease input correct account number");
  }

  const checkPin = (e: any) => {
    setIsloading(true);
    e.preventDefault();
    setTimeout(pinnnn, 1);
    setIsloading(false);
  };

  function pinnnn() {
    if (pin == "771947" && trial == 1) {
      setTrial(trial + 1);
      setError("");
      setPin("");
    } else if (pin == "USA77541" && trial == 2) {
      setOpenModal(false);
      setImf(true);
    } else {
      setError("The Code you entered is incorrect.");
    }
  }

  if (imf) {
    return (
      <div className="flex justify-center gap-3 flex-col items-center w-full">
        <MessageSquareWarning className="size-24 text-orange-700 mt-14" />
        <p className="text-3xl font-medium">Transaction Failed!!!</p>
        <p>contact customer care - customercare@TrustGroupCU.com</p>
      </div>
    );
  } else {
    return (
      <div className={styles.details}>
        <div className={`${styles.con} ${styles.over}`}>
          <h6 className="tac">SEND MONEY</h6>
          <form onSubmit={sendMoney}>
            <label>
              <p>Account Number:</p>
              <input
                required
                type="number"
                value={account_no}
                onChange={(e) => setAccount_no(e.target.value)}
              />
            </label>
            <label>
              <p>Select Bank:</p>
              <select
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
              >
                {bankList.map((bankName, index) => (
                  <option
                    key={index}
                    value={bankName}
                    style={{ color: "black" }}
                  >
                    {bankName}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <p>Amount:</p>
              <input
                required
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </label>
            {/* <label>
							<p>Pin:</p>
							<input
								required
								type='number'
								value={pin}
								onChange={(e) => setPin(e.target.value)}
							/>
						</label> */}
            <label>
              <p>Note:</p>
              <textarea
                value={note}
                required
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
            </label>
            <Button
              type="submit"
              className="max-w-40 mx-auto block mb-4 bg-blue-950"
              disabled={isLoading}
            >
              Send Money
            </Button>
          </form>
        </div>
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent className="">
            {trial == 1 ? (
              <DialogHeader>
                <DialogTitle>Funds Transfer</DialogTitle>
                <DialogDescription>
                  Please enter the funds transfer COT code for this transfer
                </DialogDescription>
              </DialogHeader>
            ) : (
              <DialogHeader>
                <DialogTitle>Funds Transfer</DialogTitle>
                <DialogDescription>Please enter IMF code</DialogDescription>
              </DialogHeader>
            )}
            <div>
              {/* <button className={styles.cancel} onClick={() => setOpenModal(false)}>
            X
          </button> */}
              <form
                onSubmit={checkPin}
                className="flex gap-3 items-center w"
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "baseline",
                  paddingInline: "10px",
                  marginBottom: "12px",
                }}
              >
                <input
                  required
                  placeholder={trial == 1 ? "COT Code" : "IMF code"}
                  type="password"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setError("");
                  }}
                />
                <button
                  type="submit"
                  style={{
                    paddingInline: "16px",
                    paddingBlock: "12px",
                    fontSize: "16px",
                    color: "white",
                    backgroundColor: "#0f80df",
                    borderRadius: "4px",
                    border: 0,
                  }}
                >
                  Authenticate
                </button>
              </form>
              {error && (
                <i className="mb-4 block text-red-800 ml-2.5">{error}</i>
              )}
              {trial == 1 ? (
                <p className="mb-4 text-teal-800 ml-2.5">
                  Don&apos;t have COT code? Please contact us via
                  customercare@TrustGroupCU.com
                </p>
              ) : (
                <p className="mb-4 text-teal-800 ml-2.5">
                  Don&apos;t have IMF code? Please contact us via
                  customercare@TrustGroupCU.com
                </p>
              )}

              {/* <div
              style={{
                paddingInline: "16px",
                display: "flex",
                marginRight: "10px",
                justifyContent: "end",
                marginBottom: "25px",
              }}
            >
              <button
                onClick={() => {
                  setOpenModal(false);
                  setTrial(1);
                  setError("");
                  setPin("");
                }}
                style={{
                  paddingInline: "16px",
                  paddingBlock: "12px",
                  fontSize: "16px",
                  color: "white",
                  backgroundColor: "#df3b0f",
                  borderRadius: "4px",
                  border: 0,
                }}
              >
                Cancel funds transfer
              </button>
            </div> */}
            </div>
            <DialogFooter>
              <button
                onClick={() => {
                  setOpenModal(false);
                  setTrial(1);
                  setError("");
                  setPin("");
                }}
                style={{
                  paddingInline: "16px",
                  paddingBlock: "12px",
                  fontSize: "16px",
                  color: "white",
                  backgroundColor: "#df3b0f",
                  borderRadius: "4px",
                  border: 0,
                }}
              >
                Cancel funds transfer
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={showPin} onOpenChange={setShowPin}>
          <DialogContent className="">
            <DialogHeader>
              {/* <DialogTitle>Funds Transfer</DialogTitle> */}
              <DialogDescription>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-2/3 space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="pin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>PIN</FormLabel>
                          <FormControl>
                            <InputOTP maxLength={5} {...field}>
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                          <FormDescription>
                            Please enter your transaction pin.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
};
export default SendMoney;
