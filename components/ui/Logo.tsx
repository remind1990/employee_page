import Image from 'next/image';
import React from 'react';

type Props = {
  width?: number;
  height?: number;
};

const Logo: React.FC<Props> = ({ width = 150, height = 150 }: Props) => {
  return <Image src='/logo.png' alt='logo' width={width} height={height} />;
};

export default Logo;
