import { Badge, Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Radio, Text } from '@chakra-ui/react'
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
   // const [answers, setAnswers] = useState<number[]>([])
   
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm()

   const onSubmit = (data: number[]) => {
      console.log(data)
      //@ts-ignore
      write?.(data)
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
      <Box p={8} overflow="auto">
         <Head>
            <title>OpenPersonality · Big 5</title>
         </Head>
         <Box width="500px" maxW="100%" m="auto">
            {/* @ts-ignore */}
            <form onSubmit={handleSubmit(onSubmit)}>

               {questions && questions.map((q, i) => (
                  <FormControl key={`${i}`}>
                     <FormLabel>{q}</FormLabel>
                     <Flex justifyContent="space-between">
                        <Text>Very Inaccurate</Text>
                        <Text>Very Accurate</Text>
                     </Flex>
                     <Flex justifyContent="space-between">
                     <Radio {...register(`${i}`, { required: true, value: 1 })}></Radio>
                     <Radio {...register(`${i}`, { required: true, value: 2 })}></Radio>
                     <Radio {...register(`${i}`, { required: true, value: 3 })}></Radio>
                     <Radio {...register(`${i}`, { required: true, value: 4 })}></Radio>
                     <Radio {...register(`${i}`, { required: true, value: 5 })}></Radio>
                     </Flex>
                     {errors.exampleRequired && (
                        <FormErrorMessage>Please answer this question</FormErrorMessage>
                     )}
                  </FormControl>
               ))}

               <Button type="submit" disabled={!write || isLoading}>
                  {isLoading ? 'Minting...' : 'Mint'}
               </Button>

               {(isPrepareError || isError) && (
                  <Box>Error: {(prepareError || error)?.message}</Box>
               )}
               <input type="submit" />
            </form>
         </Box>
      </Box>
   )
}
