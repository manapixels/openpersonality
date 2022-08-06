import {
   Box,
   Button,
   Divider,
   Heading,
   Tag,
   TagLabel,
   Text,
   Tooltip,
} from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
   return (
      <Box className={styles.container}>
         <Head>
            <title>OpenPersonality</title>
            <meta name="description" content="Mint your personality traits" />
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <main className={styles.main}>
            <Heading size="xl">Every one of us is unique ❤️</Heading>

            <p className={styles.description}>
               Mint your unique personality traits NFT
            </p>

            <div className={styles.grid}>
               <a href="https://nextjs.org/docs" className={styles.card}>
                  <Heading size="md" mb={2}>
                     Big 5 &rarr;
                  </Heading>
                  <Text fontSize="sm">
                     The core five basic dimensions of our personality. It can
                     be used for understanding how individuals might think and
                     handle stress.
                  </Text>
                  <Divider my={2} />
                  <Text fontSize="sm" mb={1}>
                     Traits you&apos;ll get:
                  </Text>
                  <Box>
                     <Tooltip label="Extraversion: How much a person is energized by the outside world">
                        <Tag
                           size="md"
                           borderRadius="full"
                           variant="solid"
                           colorScheme="green"
                           mr={1}
                           mb={1}
                        >
                           <TagLabel>Extraversion</TagLabel>
                        </Tag>
                     </Tooltip>
                     <Tooltip label="Conscientiousness: How goal-directed, persistent, and organized a person is">
                        <Tag
                           size="md"
                           borderRadius="full"
                           variant="solid"
                           colorScheme="green"
                           mr={1}
                           mb={1}
                        >
                           <TagLabel>Conscientiousness</TagLabel>
                        </Tag>
                     </Tooltip>
                     <Tooltip label="Agreeableness: How much a person puts others' interests and needs ahead of their own">
                        <Tag
                           size="md"
                           borderRadius="full"
                           variant="solid"
                           colorScheme="green"
                           mr={1}
                           mb={1}
                        >
                           <TagLabel>Agreeableness</TagLabel>
                        </Tag>
                     </Tooltip>
                     <Tooltip label="Emotional Stability: How sensitive a person is to stress and negative emotional triggers">
                        <Tag
                           size="md"
                           borderRadius="full"
                           variant="solid"
                           colorScheme="green"
                           mr={1}
                           mb={1}
                        >
                           <TagLabel>Emotional Stability</TagLabel>
                        </Tag>
                     </Tooltip>
                     <Tooltip label="Openness: How open a person is to new ideas and experiences">
                        <Tag
                           size="md"
                           borderRadius="full"
                           variant="solid"
                           colorScheme="green"
                           mr={1}
                           mb={1}
                        >
                           <TagLabel>Openness</TagLabel>
                        </Tag>
                     </Tooltip>
                  </Box>
               </a>

               <Button
                  className={styles.card}
                  disabled
                  height="auto"
                  whiteSpace="unset"
                  display="unset"
               >
                  <Heading size="md" mb={2}>
                     HEXACO{' '}
                     <Tag
                        size="md"
                        borderRadius="full"
                        variant="solid"
                        colorScheme="gray"
                        ml={1}
                     >
                        <TagLabel>Coming soon</TagLabel>
                     </Tag>
                  </Heading>
                  <Text fontSize="sm">
                     A test focused on moral character. Character reveals a
                     person&apos;s deepest intentions toward others. We want to
                     know whether that stranger standing before us intends to
                     help or harm us.
                  </Text>
                  <Divider my={2} />
                  <Text fontSize="sm" mb={1}>
                     Traits you&apos;ll get:
                  </Text>
                  <Box>
                     <Tooltip label="Gentleness: Assesses a tendency to be mild and lenient in dealings with other people. Low scorers tend to be critical in their evaluations of others, whereas high scorers are reluctant to judge others harshly.">
                        <Tag
                           size="md"
                           borderRadius="full"
                           variant="solid"
                           colorScheme="green"
                           mr={1}
                           mb={1}
                        >
                           <TagLabel>Gentleness</TagLabel>
                        </Tag>
                     </Tooltip>
                     <Tooltip label="Aesthetic Appreciation: Assesses one's enjoyment of beauty in art and in nature. Low scorers tend not to become absorbed in works of art or in natural wonders, whereas high scorers have a strong appreciation of various art forms and of natural wonders.">
                        <Tag
                           size="md"
                           borderRadius="full"
                           variant="solid"
                           colorScheme="green"
                           mr={1}
                           mb={1}
                        >
                           <TagLabel>Aesthetic Appreciation</TagLabel>
                        </Tag>
                     </Tooltip>
                     <Tooltip label="Anxiety: Assesses a tendency to worry in a variety of contexts. Low scorers feel little stress in response to difficulties, whereas high scorers tend to become preoccupied even by relatively minor problems.">
                        <Tag
                           size="md"
                           borderRadius="full"
                           variant="solid"
                           colorScheme="green"
                           mr={1}
                           mb={1}
                        >
                           <TagLabel>Anxiety</TagLabel>
                        </Tag>
                     </Tooltip>
                     <Tooltip label="Dependence: Assesses one's need for emotional support from others. Low scorers feel self-assured and able to deal with problems without any help or advice, whereas high scorers want to share their difficulties with those who will provide encouragement and comfort.">
                        <Tag
                           size="md"
                           borderRadius="full"
                           variant="solid"
                           colorScheme="green"
                           mr={1}
                           mb={1}
                        >
                           <TagLabel>Dependence</TagLabel>
                        </Tag>
                     </Tooltip>
                     <Tooltip label="Creativity: Assesses one's preference for innovation and experiment. Low scorers have little inclination for original thought, whereas high scorers actively seek new solutions to problems and express themselves in art.">
                        <Tag
                           size="md"
                           borderRadius="full"
                           variant="solid"
                           colorScheme="green"
                           mr={1}
                           mb={1}
                        >
                           <TagLabel>Creativity</TagLabel>
                        </Tag>
                     </Tooltip>
                     <Text display="inline-block">+18</Text>
                  </Box>
               </Button>
            </div>

            <Tag
               size="md"
               borderRadius="full"
               variant="solid"
               colorScheme="twitter"
               mr={1}
               mt={8}
            >
               <TagLabel>More tests coming soon</TagLabel>
            </Tag>
         </main>

         <footer className={styles.footer}>
            <Box my={4}>
               <Text color="gray.400" fontStyle="italic" fontSize="lg">
                  OpenPersonality - Portable personality traits across all web3
                  apps.
               </Text>
            </Box>
            <Box fontSize="sm" mb={2}>
               <a
                  href="https://ipip.ori.org/"
                  target="_blank"
                  rel="noopener noreferrer"
               >
                  Built upon the&nbsp;
                  <strong>International Personality Item Pool</strong>
               </a>
            </Box>
         </footer>
      </Box>
   )
}
