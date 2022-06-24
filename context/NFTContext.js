import React, { usestate, useEffect } from 'react';
import webModal from 'web3modal';
import { ethers } from 'ethers';
import axios from 'axios';
import { MarketAddress, MarketABI } from './constants';

export const NFTContext = React.createContext();

export const NFTProvider = ({ children }) => {
  const nftCurrency = 'MATIC';

  return (

    <NFTContext.Provider
      value={{ nftCurrency }}
    >
      {children}
    </NFTContext.Provider>

  );
};
