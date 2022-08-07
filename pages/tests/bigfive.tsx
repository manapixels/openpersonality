import { Badge, Box, Button, Flex } from '@chakra-ui/react'
import Head from 'next/head'
import {
   useContractRead,
   useContractWrite,
   usePrepareContractWrite,
   useWaitForTransaction,
} from 'wagmi'
import { useForm } from 'react-hook-form'

const contractABI = require('../../abis/BigFiveAspectsScales.json')

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
   // const { data:readData, isError:isErrorRead, isLoading:isLoadingRead } = useContractRead({
   //    addressOrName: '0xecb504d39723b0be0e3a9aa33d646642d1051ee1',
   //    contractInterface: contractABI,
   //    functionName: 'getHunger',
   //  })

   // Load contract
   const {
      config,
      error: prepareError,
      isError: isPrepareError,
   } = usePrepareContractWrite({
      addressOrName: '0x302D212529a749aD7c385790A6b1BfC9F5edE359',
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
         <Box>
            {/* @ts-ignore */}
            <form onSubmit={handleSubmit(onSubmit)}>
               {/* register your input into the hook by invoking the "register" function */}
               <input defaultValue="test" {...register('example')} />

               {/* include validation with required or other standard HTML validation rules */}
               <input {...register('exampleRequired', { required: true })} />
               {/* errors will return when field validation fails  */}
               {errors.exampleRequired && <span>This field is required</span>}

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
