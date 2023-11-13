import Image from 'next/image';
import React from 'react';

type Props = {};

function Logo({}: Props) {
  return <Image src='/logo.png' alt='logo' width='150' height='150' />;
}

export default Logo;
