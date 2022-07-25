import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { NFTContext } from '../context/NFTContext';
import { Loader, NFTCard, Banner, Searchbar } from '../components';
import images from '../assets';
import { shortenAddress } from './utils/shortenAddress';

const MyNFTs = () => {
  const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(NFTContext);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSelect, setActiveSelect] = useState('Recently Added');

  useEffect(() => {
    fetchMyNFTsOrListedNFTs('none')
      .then((items) => {
        setNfts(items);
        setNftsCopy(items);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  const onHandleSearch = (value) => {
    const filteredNFTs = nfts.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()));

    if (filteredNFTs.length) {
      setNfts(filteredNFTs);
    } else {
      setNfts(nftsCopy);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  return (
    <div className="w-full flex justify-start items-center flex-col min-h-screen">
      <div className="w-full flexCenter flex-col">
        <Banner
          name="Your NFTS"
          childStyles="text-center mb-4"
          parentStyles="justify-center h-80"
        />
        <div className="flexCenter flex-col -mt-20 z-0">
          <div className="flexCenter w-40 h-40 sm:w-36 sm:h-36 p-2 bg-nft-black-2 rounded-full">
            <Image
              className="rounded-full object-cover"
              objectFit="cover"
              src={images.creator1}
            />

          </div>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6">{shortenAddress(currentAccount)}</p>
        </div>
      </div>
      {!isLoading && !nfts.length && !nftsCopy.length
        ? (
          <div className="flexCenter sm:p-4 p-16">
            <h1 className="font-poppins dark:text-white text-nft-black-1 font-extrabold text-3xl">You don't own any NFTS</h1>
          </div>
        )
        : (
          <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
            <div className="flex-1 w-full flex flex-row sm:flex-col px-4 xs:px-0 minlg:px-8">
              <Searchbar
                activeSelect={activeSelect}
                setActiveSelect={setActiveSelect}
                handleSearch={onHandleSearch}
                clearSearch={onClearSearch}
              />
            </div>
            <div className="mt-3 w-full flex flex-wrap">
              {nfts.map((nft) => <NFTCard onProfilePage key={nft.tokenId} nft={nft} />)}
            </div>
          </div>
        )}
    </div>
  );
};

export default MyNFTs;
