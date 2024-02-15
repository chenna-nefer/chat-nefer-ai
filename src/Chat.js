import React, { useState } from "react";
import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Button,
  VStack,
  Text,
  Box,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return; // Prevent sending empty messages

    const userMessage = { text: newMessage.trim(), sender: "user" };
    setIsLoading(true);
    // Simulate sending message
    setTimeout(() => {
      const responseMessage = { text: newMessage.trim(), sender: "response" };
      setMessages((prevMessages) => [
        ...prevMessages,
        userMessage,
        responseMessage,
      ]);
      setNewMessage("");
      setIsLoading(false);
    }, 50);
  };
  const handleResponse = async () => {
    // Check for empty userResponse
    if (!newMessage.trim()) {
      console.error("Input is empty");
      return;
    }
    console.log("newMessage:", newMessage);
    console.log("body:", JSON.stringify({ text: newMessage }));
    // Create a message object for the user's input
    const userMessage = { text: newMessage.trim(), sender: "user" };

    try {
      const response = await fetch("http://localhost:5001/api/chat", {
        // Use the full URL here
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
      // Assuming `data.response` is the text response from the chatbot
      // Create a message object for the chatbot's response
      const responseMessage = {
        text: data.response.trim(),
        sender: "response",
      };

      // Update state with both the user's and chatbot's messages
      setMessages((prevMessages) => [
        ...prevMessages,
        userMessage,
        responseMessage,
      ]);
    } catch (error) {
      console.error("Error during fetch:", error);
    } finally {
      // Reset user input and indicate loading is finished
      setNewMessage(""); // Assuming this resets the input field
      setIsLoading(false); // Assuming you're tracking loading state
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission or newline in textarea
      handleResponse();
    }
  };

  return (
    <Flex flexDirection="column" bg="cream" alignItems="center" p={5}>
      <VStack spacing={4} mb={2}>
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          nefer.ai
        </Text>
      </VStack>
      <VStack
        spacing={4}
        w="full"
        maxW="md"
        mb={4}
        overflowY="auto"
        height="lg"
        sx={{ scrollBehavior: "smooth" }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            alignSelf={message.sender === "user" ? "flex-end" : "flex-start"}
            bg={message.sender === "user" ? "#718096" : "white"}
            color={message.sender === "user" && "white"}
            p={3}
            fontWeight={"bold"}
            borderRadius="lg"
          >
            <Text>{message.text}</Text>
          </Box>
        ))}
      </VStack>
      {isLoading && <Text>Loading...</Text>}
      <Flex w="full" maxW="md">
        <InputGroup mt={4} bg={"white"} borderRadius={"10px"}>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here... "
            onKeyDown={handleKeyDown}
            boxShadow="base"
          />
          <InputRightElement width="3.5rem">
            <IconButton
              aria-label="Send message"
              bg={"gray.500"}
              icon={<ArrowRightIcon />}
              h="1.75rem"
              size="sm"
              onClick={handleResponse}
            />
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Flex>
  );
};

export default ChatPage;
