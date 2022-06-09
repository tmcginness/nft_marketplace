import { useState, useEffect, useContext } from 'react';

import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

import images from '../assets';
import Button from './Button';

const MenuItems = ({ isMobile, active, setActive }) => {
  const generateLink = (i) => {
    switch (i) {
      case 0:
        return '/';
      case 1:
        return '/created-nfts';
      case 2:
        return '/my-nfts';
      default: return '/';
    }
  };
  return (
    <ul className={`list-none flex-row flexCenter ${isMobile && 'flex-col h-full'}`}>
      {['Explore NFTs', 'Listed NFTs', 'My NFTS'].map((item, i) => (
        <li
          key={i}
          onClick={() => { setActive(item); }}
          className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3 
          ${active === item
            ? 'dark:text-white text-nft-black-1'
            : 'dark:text-nft-gray-3 text-nft-gray-2'}
            `}
        >
          <Link href={generateLink(i)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};

const ButtonGroup = ({ setActive, router }) => {
  const hasConnected = true;

  return hasConnected ? (
    <Button
      btnName="Create"
      classStyles="mx-2 rounded-xl"
      handleClick={() => {
        setActive('');
        router.push('/create-nft');
      }}
    />
  )
    : (
      <Button
        btnName="Connect"
        classStyles="mx-2 rounded-xl"
        handleClick={() => {
          setActive('');
          router.push('/create-nft');
        }}
      />
    );
};

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [active, setActive] = useState('Explore NFTs');

  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
      <div className="flex flex-1 flex-row justify-start">
        <Link href="/nfts">
          <div className="flexCenter md:hidden cursor-pointer">
            <Image src={images.logo02} objectFit="contain" width={32} height={32} alt="Logo" />
            <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1">NFT MARKETPLACE</p>
          </div>
        </Link>

        <Link href="/nft">
          <div className="hidden md:flex" onClick={() => {}}><Image src={images.logo02} objectFit="contain" width={32} height={32} alt="Logo" /></div>
        </Link>
      </div>
      <div className="flex flex-initial flex-row justify-end">
        <div className="flex items-center mr-2">
          <input type="checkbox" className="checkbox" id="checkbox" onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
          <label className="flexBetween w-8 h-4 bg-black rounded-2xl p-1 relative label" htmlFor="checkbox">
            <i className="fas fa-sun" />
            <i className="fas fa-moon" />
            <div className="bg-white rounded-full ball w-3 h-3 absolute" />
          </label>
        </div>
        <div className="md:hidden flex">

          <MenuItems active={active} setActive={setActive} />
          <div className="ml-4">
            <ButtonGroup setActive={setActive} router={router} />
          </div>
        </div>
      </div>

    </nav>
  );
};

export default Navbar;