import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Flex,
  VStack,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Text,
  Avatar,
  Stack,
  useBreakpointValue,
  chakra,
  Image,
  HStack,
  Spinner,
  Progress,
} from "@chakra-ui/react";
import neferlogo from "./assets/img/neferlogo.png";
import neferchaticon from "./assets/img/nefer-chat-icon.png";

import { ChatIcon, AtSignIcon } from "@chakra-ui/icons";
import { CustomLoader } from "./Customloader.js";

const ChatMessage = ({ isUser, message }) => {
  return (
    <HStack justifyContent={"flex-start"} width="100%">
      <Stack
        direction="row"
        align="flex-start"
        spacing={4}
        width="-webkit-fill-available"
      >
        {isUser ? (
          <Avatar
            width={"40px"}
            height={"40px"}
            name="User"
            bg="#CCFF00"
            fontSize={"16px"}
            fontWeight={"700"}
            color="#000000"
          />
        ) : (
          <Image src={neferchaticon} size="sm" w={"40px"} />
        )}
        <chakra.div
          bg={isUser ? "none" : "#FFFFFF"}
          color="#1B2559"
          p={3}
          fontSize={"16px"}
          fontWeight={"600"}
          borderRadius="lg"
          width={"-webkit-fill-available"}
          maxWidth="100%" // Prevents the message from stretching too long
          border={isUser ? "1px solid #7E7E7E" : "none"}
          textAlign={"left"} // Aligns text based on the sender
        >
          {message}
        </chakra.div>
      </Stack>
    </HStack>
  );
};

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Create a ref for the messages container
  const bottomRef = useRef(null);

  useEffect(() => {
    // Whenever messages change, scroll to the bottom
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); // Dependency array with messages ensures effect runs when messages change

  const handleResponse = async () => {
    // Check for empty userResponse
    if (!newMessage.trim()) {
      console.error("Input is empty");
      return;
    }
    // Create a message object for the user's input and update the state
    const userMessage = { text: newMessage.trim(), sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Clear the input field
    setNewMessage("");

    // Start loading indicator
    setIsLoading(true);

    // Simulate API call with a delay of 5 seconds
    // setTimeout(() => {
    //   // Simulate the response message
    //   const responseMessage = {
    //     text: `Simulated Response: ${userMessage.text}`,
    //     sender: "response",
    //   };

    //   // Update the state with the chatbot's response and stop the loading indicator
    //   setMessages((prevMessages) => [...prevMessages, responseMessage]);
    //   setIsLoading(false);
    // }, 5000);
    // Create a message object for the user's input
    // const userMessage = { text: newMessage.trim(), sender: "user" };

    try {
      const response = await fetch("https://chat.nefer.ai/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newMessage }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      const responseMessage = {
        text: data.data.trim(),
        sender: "response",
      };

      // Update state with both the user's and chatbot's messages
      setMessages((prevMessages) => [
        ...prevMessages,
        userMessage,
        responseMessage,
      ]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error during fetch:", error);
    } finally {
      // Reset user input and indicate loading is finished
      setNewMessage(""); // Assuming this resets the input field
      setIsLoading(false); // Assuming you're tracking loading state
    }
  };

  const inputSize = useBreakpointValue({ base: "md", md: "lg" });

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission or newline in textarea
      handleResponse();
    }
  };

  return (
    <Flex direction="column" h="100vh" bg="#DFDFDF">
      <Box
        p="4"
        // bg="blue.500"
        color="#000000"
        position="sticky"
        top="0"
        zIndex="sticky"
      >
        <Flex alignItems="center">
          <Image src={neferlogo} w={"40px"} />
          <Text
            fontSize={"36px"}
            fontWeight={"700"}
            lineHeight={"43px"}
            textAlign={"left"}
            ml={2}
          >
            nefer.ai
          </Text>
        </Flex>
      </Box>

      <VStack
        flex="1"
        overflowY="auto"
        p="4"
        width={"100%"}
        spacing="4"
        bg="#DFDFDF"
      >
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            isUser={msg.sender === "user"}
            message={msg.text}
          />
        ))}
        {/* Show Spinner when loading */}
        {isLoading && (
          <Flex
            // position="absolute" // Spinner will be positioned absolutely
            bottom="70px" // Position the spinner above the input box
            left="0"
            right="0"
            justify="center"
          >
            <CustomLoader />
          </Flex>
        )}
        {/* Add a div at the end of the messages that the ref will point to */}
        <div ref={bottomRef} />
      </VStack>

      <Box p="4" position="sticky" bottom="0" bg="#DFDFDF" zIndex="sticky">
        <Flex>
          <Input
            placeholder="Type your message here..."
            _placeholder={{ color: "gray.500" }}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            h="54px"
            flex="1" // Makes the input field take up the maximum available space
            minW="250px"
            borderRadius="45px"
            border="1px solid #7E7E7E"
            padding="18px 20px 22px"
            bg={"#DFDFDF"}
            color={"#1B2559"}
            marginRight="8px" // Adds a small gap between the input field and the button
          />
          <Button
            h="54px"
            w="100%"
            minW="100px" // Ensures the button has a minimum width of 102px
            maxW="192px"
            bg="#CCFF00"
            borderRadius="45px"
            fontSize="14px"
            fontWeight="600"
            lineHeight="16px"
            textAlign="left"
            color={"black"}
            fontFamily="'Plus Jakarta Sans', sans-serif"
            onClick={handleResponse}
          >
            Submit
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ChatPage;
