export default interface NFT {
    balance: string
    contract: {
        address: string
    }
    description: string
    id: {
        tokenId: string
        tokenMetadata: {
            tokenType: string
        }
    }
    media?: Array<{
        gateway: string
        raw: string
    }>
    metadata: {
        description?: string
        image?: string
        name: string
    }
    timeLastUpdated: string
    title: string
    tokenUri: {
        gateway: string
        raw: string
    }
}