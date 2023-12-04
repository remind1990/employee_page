import { whiteCoverCSSClasses } from '@/app/constants/constants';
import React from 'react';
import ContactForm from './ui/ContactForm';
import Logo from './ui/Logo';

type Props = {};
const ContactsPage = (props: Props) => {
  return (
    <section
      className={`flex h-full w-full flex-1 items-center justify-start bg-cover bg-no-repeat p-6 ${whiteCoverCSSClasses}`}
      style={{ backgroundImage: 'url(/contacts.jpg)' }}
    >
      <div className=' z-10 flex max-w-xl animate-attractAttention flex-col items-center gap-4 rounded-md bg-white bg-opacity-90 bg-cover bg-no-repeat p-6 shadow-levitate'>
        <Logo />
        <h1 className='text-center text-3xl text-black'>
          Looking for a job? Send us an quick note to start working us!
        </h1>
        <ContactForm />
      </div>
    </section>
  );
};

export default ContactsPage;
