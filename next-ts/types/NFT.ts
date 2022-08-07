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
        extraversion: string
        conscientiousness: string
        agreeableness: string
        emotionalStability: string
        intellect: string
    }
    timeLastUpdated: string
    title: string
    tokenUri: {
        gateway: string
        raw: string
    }
}