import { Badge, Box, Flex } from '@chakra-ui/react'
import styles from '../styles/Home.module.css'

export default function Home() {
   return (
      <Box className={styles.container}>
         <Flex height="100vh" alignItems="center" justifyContent="center">
            <Badge colorScheme="orange">Select a test to get started</Badge>
         </Flex>
      </Box>
   )
}
