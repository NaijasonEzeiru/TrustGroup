"use client";

import React, { useState, useContext } from "react";
import styles from "@/styles/Verify.module.css";
import useImgInput from "@/helpers/useImgInput";
import Image from "next/image";
import { TbCloudUpload } from "react-icons/tb";
import AuthContext from "../AuthContext";
import { useRouter } from "next/navigation";

const Verify = () => {
  const { user, checkUserLoggedIn }: any = useContext(AuthContext);
  const router = useRouter();

  const [img1, imgPreview1, bind1] = useImgInput();
  const [img2, imgPreview2, bind2] = useImgInput();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const { account_no } = user;
    // const formData = new FormData();
    // formData.append("account_no", account_no);
    // formData.append("images[]", img1);
    // formData.append("images[]", img2);
    // try {
    //   const res = await fetch("/api/user/verify", {
    //     method: "POST",
    //     body: formData,
    //     keepalive: true,
    //   });
    //   const data = await res.json();
    //   setIsSubmitting(false);
    //   if (res.ok) {
    //     checkUserLoggedIn();
    //     router.push("/dashboard");
    //   } else {
    //     alert(data.message || "Documents not submitted. Something went wrong");
    //     console.error(data.message);
    //   }
    // } catch (err) {
    //   console.error({ err });
    //   alert("Documents not submitted. Something went wrong");
    // }

    const imgObjects = await Promise.all(
      [img1, img2].map(async (v) => {
        const formInput = new FormData();
        formInput.append("file", v);
        formInput.append("upload_preset", "u16vszak");
        const res = fetch(
          "https://api.cloudinary.com/v1_1/dyez5iyvm/image/upload",
          {
            method: "POST",
            body: formInput,
          }
        );
        return (await res).json();
      })
    );
    const [identity_doc, address_doc] = imgObjects.map((a) => a.secure_url);

    if (identity_doc && address_doc) {
      const VerificationSubmit = await fetch("/api/user/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          account_no,
          address_doc,
          identity_doc,
        }),
      });
      const data = await VerificationSubmit.json();
      setIsSubmitting(false);
      if (VerificationSubmit.ok) {
        checkUserLoggedIn();
        router.push("/dashboard");
      } else {
        alert(data.message || "Documents not submitted. Something went wrong");
        console.error(data.message);
      }
    } else {
      setIsSubmitting(false);
      alert("Documents not submitted. Something went wrong");
    }
  };

  return (
    <div className={styles.card}>
      {user?.verifying ? (
        <p className="tac">
          Your documents have been submitted for Verification. <br /> Your
          Verification might take a while. Please be patient. Thank you
        </p>
      ) : (
        <div>
          <h6 className="tac">KYC Verification</h6>
          <div className={styles.cardBody}>
            <form onSubmit={submit}>
              <h5>IDENTITY VERIFICATION:</h5>
              <div className="dropifyWrapper">
                <div className={styles.imgField}>
                  <label htmlFor="productImage1" className={styles.imgPreview}>
                    {!imgPreview1 ? (
                      <div className="droppifyMessage">
                        <span className="fileIcon">
                          <TbCloudUpload />
                          <p>Click here to upload an image</p>
                        </span>
                      </div>
                    ) : (
                      <Image src={imgPreview1} alt="" fill />
                    )}
                    <input
                      {...bind1}
                      type="file"
                      accept=".png, .jpg, .jpeg, .webp"
                      id="productImage1"
                      hidden
                      required
                    />
                  </label>
                </div>
              </div>
              <h5>ADDRESS VERIFICATION:</h5>
              <div className="dropifyWrapper">
                <div className={styles.imgField}>
                  <label htmlFor="productImage2" className={styles.imgPreview}>
                    {!imgPreview1 ? (
                      <div className="droppifyMessage">
                        <span className="fileIcon">
                          <TbCloudUpload />
                          <p>Click here to upload an image</p>
                        </span>
                      </div>
                    ) : (
                      <Image src={imgPreview2} alt="" fill />
                    )}
                    <input
                      {...bind2}
                      type="file"
                      accept=".png, .jpg, .jpeg, .webp"
                      id="productImage2"
                      hidden
                      required
                    />
                  </label>
                </div>
              </div>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verify;
