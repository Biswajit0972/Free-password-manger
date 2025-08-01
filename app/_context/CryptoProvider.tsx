"use client";

import { FC, ReactNode, createContext, useContext, useState } from "react";

type CryptoContextType = {
  derivedKey: CryptoKey | null;
  setDerivedKey: (key: CryptoKey | null) => void;
};

const CryptoContext = createContext<CryptoContextType | undefined>(undefined);
const CryptoProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [derivedKey, setDerivedKey] = useState<CryptoKey | null>(null);
  return (
    <CryptoContext.Provider value={{ derivedKey, setDerivedKey }}>
      {children}
    </CryptoContext.Provider>
  );
};

const useCryptoContext = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error("useCryptoContext must be used within a CryptoProvider");
  }
  return context;
};

export { CryptoProvider, useCryptoContext };
