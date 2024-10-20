
export const getMyWalletAddress = () => {
    const {address} = useAccount();

    return address;
}