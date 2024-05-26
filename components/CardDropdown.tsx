import { useAuth } from '@/contexts/authContext';
import React, { useState, useLayoutEffect, useRef, useTransition } from 'react';
import ReactDOM from 'react-dom';
import toast from 'react-hot-toast';
import Button from './ui/Button';
import Spinner from './ui/Spinner';

type cardError = {
  message?: string;
} | null;
const CardDropdown: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [card, setCard] = useState('');
  const { mongooseUser } = useAuth();
  const headerLinkRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<cardError>(null);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    setOpen(!open);
  };

  const formatCardNumber = (input: string) => {
    return input
      .replace(/\D/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setError(null);
    setCard(formatCardNumber(inputValue));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!card) return;
    if (card?.length < 19) {
      setError({
        message: 'card have to be minimum of 16 digits',
      });
    }
    startTransition(async () => {
      try {
        console.log(mongooseUser.translator._id);
        const cardWithoutSpaces = card.replace(/\s/g, '');

        const response = await fetch(
          `/api/translators/${mongooseUser.translator._id}/updateTranslator`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ card: cardWithoutSpaces }),
          }
        );

        if (!response.ok) {
          toast.error('Something went wrong updating your card');
        } else {
          const data = await response.json();
          toast.success(data.message);
        }
      } catch (error) {
        console.error('Error updating translator:', error);
      } finally {
        setOpen(false);
      }
    });
  };

  const handleCloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setOpen(false);
  };

  return (
    <>
      <div
        onClick={handleToggle}
        ref={headerLinkRef}
        className={`header-link text-center ${open ? 'link' : ''} `}
      >
        Change salary card
      </div>
      {open &&
        ReactDOM.createPortal(
          <div
            className='fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-50'
            onClick={handleCloseModal}
          >
            <form
              className='flex min-h-[200px] w-[400px] flex-col  justify-center gap-2 rounded-md bg-stone-100  p-2 shadow-lg'
              onSubmit={handleSubmit}
            >
              <h1>Please enter your card number for salary</h1>
              <div
                className='flex items-end gap-4'
                onClick={(e) => e.stopPropagation()}
              >
                <div className='flex min-w-[60%] flex-col gap-2 '>
                  <label htmlFor={'card'} className='text-black'>
                    Card Number{' '}
                  </label>
                  <input
                    id='card'
                    className='w-full   rounded-md p-2 text-black ring-2'
                    type='text'
                    name='card'
                    value={card}
                    onChange={handleChange}
                    placeholder='Enter card number'
                    maxLength={19}
                  />
                </div>
                <div className='flex max-h-[42px]'>
                  <Button
                    type='submit'
                    variation='formButton'
                    disabled={isPending}
                  >
                    {isPending ? (
                      <span className='flex h-[24px] items-center justify-center'>
                        <Spinner /> Sending
                      </span>
                    ) : (
                      'Save card'
                    )}
                  </Button>
                </div>
              </div>
              {error?.message && (
                <span className='text-red-500'>{error?.message}</span>
              )}
            </form>
          </div>,
          document.body
        )}
    </>
  );
};

export default CardDropdown;
