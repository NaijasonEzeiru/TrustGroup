'use client';

import React, { useState, useContext } from 'react';
import styles from '@/styles/Verify.module.css';
import useImgInput from '@/helpers/useImgInput';
import Image from 'next/image';
import { TbCloudUpload } from 'react-icons/tb';
import AuthContext from '../AuthContext';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/helpers/vars';

const Verify = () => {
  const { user, checkUserLoggedIn }: any = useContext(AuthContext);
  const router = useRouter();

  const [img1, imgPreview1, bind1] = useImgInput();
  const [img2, imgPreview2, bind2] = useImgInput();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData();
    // const images = [img1, img2];
    // for (let i = 0; i < images.length; i++) {
    // 	formData.append("images[]", images[i]);
    // }
    formData.append('file', img1);
    formData.append('upload_preset', 'u16vszak');
    formData.append('cloud_name', 'dyez5iyvm');
    const identityVerification = await fetch(
      `https://api.cloudinary.com/v1_1/dyez5iyvm/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );
    formData.append('file', img2);
    formData.append('upload_preset', 'u16vszak');
    formData.append('cloud_name', 'dyez5iyvm');
    const addressVerification = await fetch(
      `https://api.cloudinary.com/v1_1/dyez5iyvm/image/upload`,
      {
        method: 'POST',
        body: formData
      }
    );

    const idVerification = await identityVerification.json();
    const adVerification = await addressVerification.json();
    const { account_no } = user;
    const identity_doc = idVerification.url;
    const address_doc = adVerification.url;

    console.log({ id: idVerification.url, ad: adVerification.url });

    if (identityVerification.ok && addressVerification.ok) {
      const VerificationSubmit = await fetch(`${API_URL}/user/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
          account_no,
          address_doc,
          identity_doc
        })
      });
      const data = await VerificationSubmit.json();
      setIsSubmitting(false);
      if (VerificationSubmit.ok) {
        checkUserLoggedIn();
        router.push('/dashboard');
      } else {
        console.error(data.message);
      }
    } else {
      setIsSubmitting(false);
      console.log('error');
    }
  };

  return (
    <div className={styles.card}>
      {user?.verifying ? (
        <p className='tac'>
          Your documents have been submitted for Verification. <br /> Your
          Verification might take a while. Please be patient. Thank you
        </p>
      ) : (
        <div>
          <h6 className='tac'>KYC Verification</h6>
          <div className={styles.cardBody}>
            <form onSubmit={submit}>
              <h5>IDENTITY VERIFICATION:</h5>
              <div className='dropifyWrapper'>
                <div className={styles.imgField}>
                  <label htmlFor='productImage1' className={styles.imgPreview}>
                    {!imgPreview1 ? (
                      <div className='droppifyMessage'>
                        <span className='fileIcon'>
                          <TbCloudUpload />
                          <p>Click here to upload an image</p>
                        </span>
                      </div>
                    ) : (
                      <Image src={imgPreview1} alt='' fill />
                    )}
                    <input
                      {...bind1}
                      type='file'
                      accept='image/*'
                      id='productImage1'
                      hidden
                      required
                    />
                  </label>
                </div>
              </div>
              <h5>ADDRESS VERIFICATION:</h5>
              <div className='dropifyWrapper'>
                <div className={styles.imgField}>
                  <label htmlFor='productImage2' className={styles.imgPreview}>
                    {!imgPreview1 ? (
                      <div className='droppifyMessage'>
                        <span className='fileIcon'>
                          <TbCloudUpload />
                          <p>Click here to upload an image</p>
                        </span>
                      </div>
                    ) : (
                      <Image src={imgPreview2} alt='' fill />
                    )}
                    <input
                      {...bind2}
                      type='file'
                      accept='image/*'
                      id='productImage2'
                      hidden
                      required
                    />
                  </label>
                </div>
              </div>
              <button type='submit' disabled={isSubmitting}>
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
