import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, polygonAmoy } from 'wagmi/chains'

export const config = createConfig({
    chains: [polygonAmoy, mainnet, sepolia],
    multiInjectedProviderDiscovery: false,
    transports: {

        [mainnet.id]: http(),
        [sepolia.id]: http(),
        [polygonAmoy.id]: http(),
    },
})