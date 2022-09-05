export function setupWeb3({ customProvider, reloadOnAccountsChange, enforceReadOnly, enforceReload, ensAddress }: {
    customProvider: any;
    reloadOnAccountsChange?: boolean | undefined;
    enforceReadOnly?: boolean | undefined;
    enforceReload?: boolean | undefined;
    ensAddress: any;
}): Promise<{
    provider: any;
    signer: any;
} | undefined>;
export function getWeb3(): Promise<any>;
export function getWeb3Read(): Promise<any>;
export function isReadOnly(): boolean;
export function getProvider(): Promise<any>;
export function getSigner(): Promise<any>;
export function getAccount(): Promise<any>;
export function getAccounts(): Promise<any>;
export function getNetworkId(): Promise<any>;
export function getNetwork(): Promise<any>;
export function getBlock(number?: string): Promise<{
    number: any;
    timestamp: any;
}>;
//# sourceMappingURL=web3.d.ts.map