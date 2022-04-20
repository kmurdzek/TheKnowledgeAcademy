import React, { FC } from "react";
import { useEffect, useState, useMemo } from "react";

const WalletCard = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("MetaMask Here!");

      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(result => {
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
        })
        .catch(error => {
          setErrorMessage(error.message);
        });
    } else {
      console.log("Need to install MetaMask");
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  // update account, will cause component re-render
  const accountChangedHandler = newAccount => {
    setDefaultAccount(newAccount);
  };

  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };

  // listen for account changes
  window.ethereum.on("accountsChanged", accountChangedHandler);

  window.ethereum.on("chainChanged", chainChangedHandler);

  return (
    <div className="walletCard">
      <button
        className="enableEthereumButton"
        style={{
          textTransform: "Connect Wallet" ? "uppercase" : "none"
        }}
        onClick={connectWalletHandler}
      >
        {connButtonText}
      </button>
    </div>
  );
};

export default WalletCard;
