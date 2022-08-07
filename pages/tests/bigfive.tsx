import { Box, Button, Flex, FormControl, FormLabel, Link, Spinner, Text } from '@chakra-ui/react'
// import { Network, Alchemy } from "alchemy-sdk"
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
import { useRouter } from 'next/router'

const contractABI = require('../../abis/BigFiveAspectsScales.json')
const contractAddress = "0xd961Fa6C2BEd54bF788dc16Cc96362b80ffe560a"

let obj:any = {}
for (let i=0; i<64; i++) {
   obj[`qns${i}`] = Math.floor(Math.random() * (5 - 1 + 1) + 1).toString()
}
export default function BigFive() {

   const [isLoading, setIsLoading] = useState(false)
   const [hash, setHash] = useState()
   const { address } = useAccount()
   const { data: signer } = useSigner()
   const router = useRouter()
   
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      shouldFocusError: true,
      defaultValues: obj
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

   const { isLoading: isLoadingTxn, isSuccess: isSuccessTxn } = useWaitForTransaction({
      hash
   })

   const onSubmit: SubmitHandler<any> = async unformattedData => {
      const data = Object.keys(unformattedData).map((k, i) => {
         return unformattedData[k]
      })
      console.log('onSubmit:', data, contract)

      if (window.ethereum && contract) {
         setIsLoading(true)
         contract.mintResultNFT(data).then((result: any) => {
            console.log(result)
            if (result.hash) {
               setHash(hash)
            }
         })

         setIsLoading(false)
      }
   }

   if (hash && isLoadingTxn) {
      <Flex height="100vh" alignContent="center" justifyContent="center">
         <Spinner />
         <Text>Awaiting confirmation on blockchain...</Text>
         <Text><Link href={`https://goerli.etherscan.io/tx/${hash}`}>View Transaction</Link></Text>
      </Flex>
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
                  <Box width="620px" maxW="100%" textAlign="right">
                     <Button type="submit" disabled={isLoading} variant="black">
                        {isLoading ? 'Minting...' : 'Submit & Mint'}
                     </Button>
                  </Box>
                  
               </Box>
         </form>
      </Box>
   )
}
