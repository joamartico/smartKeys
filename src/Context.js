import React, { useState, createContext, useEffect, useContext } from 'react';
import { useMoralis } from 'react-moralis';
import ResodeContractJSON from '../truffle/build/contracts/Resode.json';

const Context = createContext();

const ContextComponent = props => {
  const { web3, Moralis, user } = useMoralis();
  const [walletAddress, setWalletAddress] = useState();
  const [chainId, setChainId] = useState();
  const [contractABI, setContractABI] = useState(ResodeContractJSON.abi);
  const [contractAddress, setContractAddress] = useState('');
  const [selectedCategory, setSelectedCategory] = useState({
    categoryId: '0x91',
    category: 'default',
  });

  useEffect(() => {
    Moralis.onChainChanged(function (chain) {
      setChainId(chain);
    });

    Moralis.onAccountsChanged(function (address) {
      setWalletAddress(address[0]);
    });
  }, []);

  useEffect(() => setChainId(web3.givenProvider?.chainId));

  useEffect(
    () => setWalletAddress(web3.givenProvider?.selectedAddress || user?.get('ethAddress')),
    [web3, user]
  );

  return (
    <Context.Provider
      value={{
        ...props.value,
        walletAddress,
        chainId,
        selectedCategory,
        setSelectedCategory,
        contractABI,
        setContractABI,
        contractAddress,
        setContractAddress,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export function useGlobalState(){
  const globalState = useContext(Context);
  return globalState;
}

export default ContextComponent;
