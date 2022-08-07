import { Box, Button, Flex, FormControl, FormLabel, Image, Link, Progress, Spinner, Text } from '@chakra-ui/react'
import Head from 'next/head'
import {
   useAccount,
   useContract,
   useContractRead,
   useSigner,
   useWaitForTransaction,
} from 'wagmi'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useEffect, useState } from 'react'
import NFT from '../../types/NFT'

const contractABI = require('../../abis/BigFiveAspectsScales.json')
const contractAddress = "0x5CaA995A1598B67e840F6DAdFA0e4BE4D5760A0F"

// let obj:any = {}
// for (let i=0; i<64; i++) {
//    obj[`qns${i}`] = Math.floor(Math.random() * (5 - 1 + 1) + 1).toString()
// }
export default function BigFive() {

   const [isLoading, setIsLoading] = useState(false)
   const [hash, setHash] = useState()
   const [nfts, setNfts] = useState<NFT[]>([])
   const [isDoingTest, setIsDoingTest] = useState(true)
   const { address } = useAccount()
   const { data: signer } = useSigner()

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      shouldFocusError: true,
      // defaultValues: obj
   })

   // Load questions from contract
   const { data:questions, isError:isErrorRead, isLoading:isLoadingRead } = useContractRead({
      addressOrName: contractAddress,
      contractInterface: contractABI,
      functionName: 'getQuestions',
    })

    const contract = useContract({
      addressOrName: contractAddress,
      contractInterface: contractABI,
      signerOrProvider: signer,
    })

   
   const onSubmit: SubmitHandler<any> = async unformattedData => {
      const data = Object.keys(unformattedData).map((k, i) => {
         return unformattedData[k]
      })

      // console.log('onSubmit:', data, contract)

      if (window.ethereum && contract) {
         setIsLoading(true)
         try {
            await contract.mintResultNFT(data).then((result: any) => {
               // console.log(result)
               if (result.hash) {
                  setHash(result.hash)
               }
            })
            setIsLoading(false)
         } catch(e) {
            console.log(e)
         }
      }
   }

   const { isLoading: isLoadingTxn, isSuccess: isSuccessTxn } = useWaitForTransaction({
      hash
   })

   useEffect(() => {
      if (address) {
         const baseURL = `https://eth-goerli.g.alchemy.com/nft/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTs`

         fetch(`${baseURL}?contractAddresses[]=${contractAddress}&owner=${address}`, {
            method: 'GET',
         })
            .then((response) => response.json())
            .then((data) => {
               console.log('✅[GET][NFTs]:', data)
               if (data?.ownedNfts && data.ownedNfts.length > 0) {
                  setNfts(data.ownedNfts)
                  setIsDoingTest(false)
               }
               
            })
            .catch((error) => console.log('error', error))
      }
   }, [address, isSuccessTxn])

   if (nfts && nfts.length > 0 && !isDoingTest) {
      return (
         <Flex justifyContent="center" alignItems="center" minHeight="100vh" flexDirection="column" p={8}>
            <Box mb={8}>
               {nfts.map((nft, i) => (
                  <Box key={i}>
                     {nft?.metadata && (
                        <Box background="white" borderRadius="md" p={3}>
                           <Image src={nft.metadata?.image} alt="" width="180px" height="180px" borderRadius="sm" />
                           <Text fontWeight="bold">{nft.metadata.name}</Text>
                           {nft?.metadata?.extraversion && (
                              <Box>
                                 <Text fontSize="sm">Extraversion</Text>
                                 <Flex width="100%" alignItems="center">
                                    <Progress value={parseFloat(nft.metadata.extraversion)/5*100} flex="1" />
                                    <Text fontSize="sm" ml={2}>{(parseFloat(nft.metadata.extraversion)/5*100).toFixed(0)}%</Text>
                                 </Flex>
                              </Box>
                           )}
                           {nft?.metadata?.conscientiousness && (
                              <Box>
                                 <Text fontSize="sm">Conscientiousness</Text>
                                 <Flex width="100%" alignItems="center">
                                    <Progress value={parseFloat(nft.metadata.conscientiousness)/5*100} flex="1" />
                                    <Text fontSize="sm" ml={2}>{(parseFloat(nft.metadata.conscientiousness)/5*100).toFixed(0)}%</Text>
                                 </Flex>
                              </Box>
                           )}
                           {nft?.metadata?.agreeableness && (
                              <Box>
                                 <Text fontSize="sm">Agreeableness</Text>
                                 <Flex width="100%" alignItems="center">
                                    <Progress value={parseFloat(nft.metadata.agreeableness)/5*100} flex="1" />
                                    <Text fontSize="sm" ml={2}>{(parseFloat(nft.metadata.agreeableness)/5*100).toFixed(0)}%</Text>
                                 </Flex>
                              </Box>
                           )}
                           {nft?.metadata?.emotionalStability && (
                              <Box>
                                 <Text fontSize="sm">Emotional Stability</Text>
                                 <Flex width="100%" alignItems="center">
                                    <Progress value={parseFloat(nft.metadata.emotionalStability)/5*100} flex="1" />
                                    <Text fontSize="sm" ml={2}>{(parseFloat(nft.metadata.emotionalStability)/5*100).toFixed(0)}%</Text>
                                 </Flex>
                              </Box>
                           )}
                           {nft?.metadata?.intellect && (
                              <Box>
                                 <Text fontSize="sm">Openness</Text>
                                 <Flex width="100%" alignItems="center">
                                    <Progress value={parseFloat(nft.metadata.intellect)/5*100} flex="1" />
                                    <Text fontSize="sm" ml={2}>{(parseFloat(nft.metadata.intellect)/5*100).toFixed(0)}%</Text>
                                 </Flex>
                              </Box>
                           )}
                        </Box>
                     )}
                  </Box>
               ))}
            </Box>
            <Button colorScheme='blue' onClick={() => setIsDoingTest(true)} variant="outline">Take test again</Button>
         </Flex>
      )
   }

   if (hash && isLoadingTxn) {
      return (
         <Flex height="100vh" alignItems="center" justifyContent="center" flexDirection="column">
            <Spinner />
            <Text>Awaiting confirmation on blockchain...</Text>
            <Text><Link href={`https://goerli.etherscan.io/tx/${hash}`}>View Transaction</Link></Text>
         </Flex>
      )
   }

   return (
      <Box>
         <Head>
            <title>OpenPersonality · Big 5</title>
         </Head>

         {/* @ts-ignore */}
         <form onSubmit={handleSubmit(onSubmit)} style={{ position: 'relative' }}>
            <Box width="620px" maxW="100%" m="auto" borderRadius="md" background="white" py={6} px={8} mt={12}>
               {questions && questions.map((q, i) => {

                  const index = "qns" + i

                  return (
                  // @ts-ignore
                  <FormControl key={`${i}`} mb={8}>
                     <FormLabel>{i+1}. {q}</FormLabel>
                     <Flex justifyContent="space-between" mb={1}>
                        <Text fontSize="sm" color="gray.500">Very Inaccurate</Text>
                        <Text fontSize="sm" color="gray.500">Very Accurate</Text>
                     </Flex>
                     <Flex justifyContent="space-between" background="gray.100" borderRadius="md" p={2}>
                        {/* @ts-ignore */}
                        <input type="radio" {...register(index, { required: true })} value="1" />
                        {/* @ts-ignore */}
                        <input type="radio" {...register(index, { required: true })} value="2" />
                        {/* @ts-ignore */}
                        <input type="radio" {...register(index, { required: true })} value="3" />
                        {/* @ts-ignore */}
                        <input type="radio" {...register(index, { required: true })} value="4" />
                        {/* @ts-ignore */}
                        <input type="radio" {...register(index, { required: true })} value="5" />
                     </Flex>
                     {/* @ts-ignore */}
                     {errors[index] && (
                        <Box textAlign="right">
                           <Text color="white" background="red.500" fontSize="sm">Please answer this question</Text>
                        </Box>
                     )}
                  </FormControl>
               )})}
            </Box>
            <Box py={2} px={8} background="white" position="sticky" bottom="0" borderTop="1px solid var(--chakra-colors-gray-200)">
                  <Box width="620px" maxW="100%" textAlign="right" mx="auto">
                     <Button type="submit" disabled={isLoading || isLoadingTxn} variant="black">
                        {(isLoading || isLoadingTxn) ? 'Minting...' : 'Submit & Mint'}
                     </Button>
                  </Box>
                  
               </Box>
         </form>
      </Box>
   )
}
