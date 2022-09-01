/// <reference types="react-scripts" />

import * as ethers from 'ethers';

declare module 'immutable-tuple';

declare global {
  interface Window {
    web3?: {
      eth?: {
        net: {
          getId: () => any;
        };
      };
      version: {
        getNetwork(cb: (err: Error | undefined, networkId: any) => void): void;
        network: any;
      };
    };
    ethereum?: {
      on: (event: string, cb: () => void) => void;
      autoRefreshOnNetworkChange?: boolean;
      chainId: string;
      ethereum: ethers.providers.Provider | undefined;
      request: (...params: unknown[]) => void;
      networkVersion: any;
      isMetaMask: boolean;
      enable: () => void;
    };
  }
}
