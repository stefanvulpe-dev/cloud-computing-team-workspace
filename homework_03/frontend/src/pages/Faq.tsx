import { Box, Heading, Flex, Input, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Stack } from "@chakra-ui/react";

export function FAQ() {
    return (
        <div style={{ height: '100vh', width: '100vw', overflow: 'auto' }}>
            <Box p={5} bg="gray.100">
                <Flex direction="column" justifyContent="center" alignItems="center" height="100%">
                    <Heading as="h1" size="lg" mb={5}>FAQ</Heading>
                    <Input placeholder="Search..." width="50%" mb={5} />
                </Flex>
                <Accordion allowToggle>
                    <Stack spacing={3}>
                        <AccordionItem>
                            {({ isExpanded }) => (
                                <>
                                    <h2>
                                        <AccordionButton>
                                            <Box flex="1" textAlign="left" fontWeight={isExpanded ? 'bold' : 'normal'}>
                                                Q: What is Tasty Bites?
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        A: Tasty Bites is a recipe website that offers a wide range of delicious recipes, including appetizers, main courses, desserts, and drinks, to help you create amazing meals at home.
                                    </AccordionPanel>
                                </>
                            )}
                        </AccordionItem>
                        <AccordionItem>
                            {({ isExpanded }) => (
                                <>
                                    <h2>
                                        <AccordionButton>
                                            <Box flex="1" textAlign="left" fontWeight={isExpanded ? 'bold' : 'normal'}>
                                                Q: How can I find a recipe?
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        A: You can use the search bar to find a recipe by entering the name of the dish or the ingredients you have on hand. You can also browse recipes by category or cuisine.
                                    </AccordionPanel>
                                </>
                            )}
                        </AccordionItem>
                        <AccordionItem>
                            {({ isExpanded }) => (
                                <>
                                    <h2>
                                        <AccordionButton>
                                            <Box flex="1" textAlign="left" fontWeight={isExpanded ? 'bold' : 'normal'}>
                                                Q: How can I create an account on Tasty Bites?
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        A: To create an account, click on the "Sign Up" button at the top right corner of the homepage. Fill in your details and follow the prompts to complete the registration process.
                                    </AccordionPanel>
                                </>
                            )}
                        </AccordionItem>
                        <AccordionItem>
                            {({ isExpanded }) => (
                                <>
                                    <h2>
                                        <AccordionButton>
                                            <Box flex="1" textAlign="left" fontWeight={isExpanded ? 'bold' : 'normal'}>
                                                Q: I forgot my password. How can I reset it?
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        A: Click on the "Forgot Password" link on the login page. Enter your registered email address, and we will send you instructions to reset your password.
                                    </AccordionPanel>
                                </>
                            )}
                        </AccordionItem>
                        <AccordionItem>
                            {({ isExpanded }) => (
                                <>
                                    <h2>
                                        <AccordionButton>
                                            <Box flex="1" textAlign="left" fontWeight={isExpanded ? 'bold' : 'normal'}>
                                                Q: Why can't I log into my account?
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        A: Ensure you are using the correct email and password. If you still can't log in, try resetting your password. If the issue persists, contact our support team for assistance.
                                    </AccordionPanel>
                                </>
                            )}
                        </AccordionItem>
                        <AccordionItem>
                            {({ isExpanded }) => (
                                <>
                                    <h2>
                                        <AccordionButton>
                                            <Box flex="1" textAlign="left" fontWeight={isExpanded ? 'bold' : 'normal'}>
                                                Q: How can I contact Tasty Bites for support?
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        A: You can reach our support team by clicking on the "Contact Us" link at the bottom of the page or emailing support@tastybites.com. We are here to help with any questions or issues you may have.
                                    </AccordionPanel>
                                </>
                            )}
                        </AccordionItem>
                        <AccordionItem>
                            {({ isExpanded }) => (
                                <>
                                    <h2>
                                        <AccordionButton>
                                            <Box flex="1" textAlign="left" fontWeight={isExpanded ? 'bold' : 'normal'}>
                                                Q: I forgot my password. How can I reset it?
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        A: Click on the "Forgot Password" link on the login page. Enter your registered email address, and we will send you instructions to reset your password.
                                    </AccordionPanel>
                                </>
                            )}
                        </AccordionItem>
                    </Stack>
                </Accordion>
            </Box>
        </div>
    );
}