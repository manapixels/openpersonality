import { Badge, Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Text } from '@chakra-ui/react'
import Head from 'next/head'
import {
   useContractRead,
   useContractWrite,
   usePrepareContractWrite,
   useWaitForTransaction,
} from 'wagmi'
import { useForm } from 'react-hook-form'

const contractABI = require('../../abis/BigFiveAspectsScales.json')
const contractAddress = "0xd961Fa6C2BEd54bF788dc16Cc96362b80ffe560a"

export default function BigFive() {
   
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm()

   const onSubmit = (data: number[]) => {

      console.log(data, 'lalala')
      //@ts-ignore
      // write?.(data)
   }

   // Load questions from contract
   const { data:questions, isError:isErrorRead, isLoading:isLoadingRead } = useContractRead({
      addressOrName: contractAddress,
      contractInterface: contractABI,
      functionName: 'getQuestions',
    })

   // Load contract
   const {
      config,
      error: prepareError,
      isError: isPrepareError,
   } = usePrepareContractWrite({
      addressOrName: contractAddress,
      contractInterface: contractABI,
      functionName: 'mintResultNFT',
   })

   const { data, error, isError, write } = useContractWrite(config)

   const { isLoading, isSuccess } = useWaitForTransaction({
      hash: data?.hash,
   })

   if (isSuccess) {
      ;<Flex height="100vh" alignItems="center" justifyContent="center">
         <Badge colorScheme="orange">
            Successfully minted your Big Five NFT
         </Badge>
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
               {questions && questions.map((q, i) => (
                  <FormControl key={`${i}`} mb={8}>
                     <FormLabel>{i+1}. {q}</FormLabel>
                     <Flex justifyContent="space-between" mb={1}>
                        <Text fontSize="sm" color="gray.500">Very Inaccurate</Text>
                        <Text fontSize="sm" color="gray.500">Very Accurate</Text>
                     </Flex>
                     <Flex justifyContent="space-between" background="gray.100" borderRadius="md" p={2}>
                        <input type="radio" id={`${i}-1`} {...register(`${i}`, { required: true, value: 1 })} />
                        <input type="radio" id={`${i}-2`} {...register(`${i}`, { required: true, value: 2 })} />
                        <input type="radio" id={`${i}-3`} {...register(`${i}`, { required: true, value: 3 })} />
                        <input type="radio" id={`${i}-4`} {...register(`${i}`, { required: true, value: 4 })} />
                        <input type="radio" id={`${i}-5`} {...register(`${i}`, { required: true, value: 5 })} />
                     </Flex>
                     {errors.exampleRequired && (
                        <FormErrorMessage>Please answer this question</FormErrorMessage>
                     )}
                  </FormControl>
               ))}
            </Box>
            <Box py={2} px={8} background="white" position="sticky" bottom="0" borderTop="1px solid var(--chakra-colors-gray-200)">
                  <Box width="620px" maxW="100%" textAlign="right">
                     <Button type="submit" disabled={isLoading} variant="black">
                        {isLoading ? 'Minting...' : 'Submit & Mint'}
                     </Button>
                     {(isPrepareError || isError) && (
                     <Text color="red.500" fontSize="sm">Error: {(prepareError || error)?.message}</Text>
                  )}
                  </Box>
                  
               </Box>
         </form>
      </Box>
   )
}
