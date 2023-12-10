'use client';
import { useAuth } from '@/contexts/authContext';
import sendEmail from '@/services/sendEmail';
import { useRouter } from 'next/navigation';
import React, {
  useState,
  ChangeEvent,
  startTransition,
  useTransition,
} from 'react';
import toast from 'react-hot-toast';
import Button from './Button';
import FormRow from './FormRow';
import Spinner from './Spinner';

type Props = {};

type Event = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

function ContactForm({}: Props) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    name: '',
    message: '',
  });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { contactEmail, sendContactEmail } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({
      email: '',
      name: '',
      message: '',
    });
    if (!formData.email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Email is required',
      }));
    }
    if (!formData.name) {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'Name is required' }));
    }
    if (!formData.message) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        message: 'Message is required',
      }));
    }
    if (!formData.email || !formData.name || !formData.message) {
      return;
    }

    startTransition(async () => {
      try {
        const res = await sendEmail(formData);
        if (res.success) {
          toast.success(res.msg);
          setTimeout(() => {
            sendContactEmail();
            router.push('/');
          }, 500);
        } else {
          toast.error(res.msg);
        }
      } catch (err: any) {
        toast.error(err.message);
      }
    });
  };

  function handleInputChange(e: Event): void {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  return (
    <form
      className='flex-column w-full gap-4 p-4 font-mono'
      onSubmit={handleSubmit}
    >
      <FormRow
        id='email'
        type='email'
        name='email'
        value={formData.email}
        disabled={isPending}
        onChange={handleInputChange}
      />
      {errors.email && <p className='text-red-500'>{errors.email}</p>}
      <FormRow
        id='name'
        type='text'
        name='name'
        value={formData.name}
        disabled={isPending}
        onChange={handleInputChange}
      />
      {errors.name && <p className='text-red-500'>{errors.name}</p>}
      <label htmlFor='message' className='text-black'>
        Please enter your message
      </label>
      <textarea
        id='message'
        name='message'
        className='w-full rounded-md p-2 text-black ring-2'
        placeholder='Something you want to tell us...'
        value={formData.message}
        disabled={isPending}
        onChange={handleInputChange}
      />
      {errors.message && <p className='text-red-500'>{errors.message}</p>}
      <Button
        type='submit'
        variation='formButton'
        disabled={isPending || contactEmail}
      >
        {isPending ? (
          <span className='flex h-[24px] items-center justify-center'>
            <Spinner /> Sending
          </span>
        ) : (
          'Send  Message'
        )}
      </Button>
      {contactEmail && (
        <p className='text-green-500'>Email has already been sent</p>
      )}
    </form>
  );
}

export default ContactForm;
