import { useState } from 'react';
import {
  Box,
  Heading,
  Flex,
  Input,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stack,
} from '@chakra-ui/react';

export function FAQ() {
  const [searchValue, setSearchValue] = useState('');

  const filteredQuestions = faqQuestions.filter(
    ({ question, answer }) =>
      question.toLowerCase().includes(searchValue.toLowerCase()) ||
      answer.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'auto' }}>
      <Box p={5} bg="gray.100">
        <Flex
          direction="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Heading as="h1" size="lg" mb={5}>
            FAQ
          </Heading>
          <Input
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Search..."
            width="50%"
            mb={5}
          />
        </Flex>
        <Accordion allowToggle>
          <Stack spacing={3}>
            {filteredQuestions.map(({ question, answer }) => (
              <AccordionItem>
                {({ isExpanded }) => (
                  <>
                    <h2>
                      <AccordionButton>
                        <Box
                          flex="1"
                          textAlign="left"
                          fontWeight={isExpanded ? 'bold' : 'normal'}
                        >
                          Q: {question}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>A: {answer}</AccordionPanel>
                  </>
                )}
              </AccordionItem>
            ))}
          </Stack>
        </Accordion>
      </Box>
    </div>
  );
}

const faqQuestions = [
  {
    question: 'What is Tasty Bites?',
    answer:
      'Tasty Bites is a recipe website that offers a wide range of delicious recipes, including appetizers, main courses, desserts, and drinks, to help you create amazing meals at home.',
  },
  {
    question: 'How can I find a recipe?',
    answer:
      'You can use the search bar to find a recipe by entering the name of the dish or the ingredients you have on hand. You can also browse recipes by category or cuisine.',
  },
  {
    question: 'How can I create an account on Tasty Bites?',
    answer:
      'To create an account, click on the "Sign Up" button at the top right corner of the homepage. Fill in your details and follow the prompts to complete the registration process.',
  },
  {
    question: 'I forgot my password. How can I reset it?',
    answer:
      'Click on the "Forgot Password" link on the login page. Enter your registered email address, and we will send you instructions to reset your password.',
  },
  {
    question: "Why can't I log into my account?",
    answer:
      "Ensure you are using the correct email and password. If you still can't log in, try resetting your password. If the issue persists, contact our support team for assistance.",
  },
  {
    question: 'How can I contact Tasty Bites for support?',
    answer:
      'You can reach our support team by clicking on the "Contact Us" link at the bottom of the page or emailing support@tastybites.com. We are here to help with any questions or issues you may have.',
  },
  {
    question: 'I forgot my password. How can I reset it?',
    answer:
      'Click on the "Forgot Password" link on the login page. Enter your registered email address, and we will send you instructions to reset your password.',
  },
];
