'use client';

import React, { useState } from 'react';
import styles from '@/styles/Form.module.css';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateUserSchema, CreateUserSchemaType } from '@/helpers/schema';
import { useRouter } from 'next/navigation';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { API_URL } from '@/helpers/vars';

const Register = () => {
  const [error, setError] = useState(null) as any;
  const [phoneNumber, setPhoneNumber] = useState('') as any;

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CreateUserSchemaType>({
    resolver: zodResolver(CreateUserSchema)
  });
  const signUp = async ({ email, password, fullName }: any) => {
    if (navigator && navigator.onLine) {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          phoneNumber,
          fullName
        })
      });
      const data = await res.json();
      if (res.ok) {
        console.log(data);
        router.push('/');
      } else {
        setError(data.message);
        error ?? console.log(error);
      }
    } else {
      setError('You appear to be offline. Check your internet connection');
      console.log('error');
    }
  };

  return (
    <div className={styles.form}>
      {error ? <h6 className={styles.error}>{error}</h6> : <span></span>}
      <h6>Add a New User</h6>
      <form onSubmit={handleSubmit(signUp)} method='POST'>
        <input type='text' {...register('fullName')} placeholder='Full Name' />
        <span className={styles.error}> {errors.fullName?.message}</span>
        <input
          type='email'
          placeholder='E-mail Address'
          required={false}
          {...register('email')}
        />
        <span className={styles.error}> {errors.email?.message}</span>
        {/* <input
						type="number"
						placeholder="Phone number"
						{...register("phoneNumber")}
					/> */}
        <PhoneInput
          // name="PhoneInputWithCountrySelect"
          // control={control}
          rules={{ required: true }}
          placeholder='Phone Number'
          // {...register("phoneNumber")}
          value={phoneNumber}
          // onChange={(e) => {
          // 	console.log(e.target);
          // 	setPhoneNumnber(e.target);
          // }}
          required={false}
          onChange={setPhoneNumber}
        />
        <span className={styles.error}> {errors.phoneNumber?.message}</span>
        <input
          type='password'
          placeholder='Password'
          {...register('password')}
        />
        <span className={styles.error}> {errors.password?.message}</span>
        <input
          type='password'
          placeholder='Confirm Password'
          {...register('confirm_password')}
        />
        <span className={styles.error}>
          {' '}
          {errors.confirm_password?.message}
        </span>
        <button type='submit' disabled={isSubmitting}>
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;
