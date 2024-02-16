import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  VStack,
  Text,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useDispatch } from "react-redux";
import { registerUser } from "./app/store.js";
import { APP_URL } from "./constants.js";
const questions = [
  "What is your name?",
  "What is your email?",
  "Choose a password",
  "Confirm your password",
];

const ChatRegistration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userResponse, setUserResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([
    { type: "question", text: questions[0] },
  ]);
  const dispatch = useDispatch();

  const [registrationData, setRegistrationData] = useState({
    yourname: "",
    email: "",
    password: "",
    password2: "",
  });

  const toast = useToast();

  useEffect(() => {
    if (currentStep > 0) {
      setMessages((msgs) => [
        ...msgs,
        { type: "question", text: questions[currentStep] },
      ]);
    }
  }, [currentStep]);

  const handleResponse = async () => {
    // Basic validation before proceeding
    if (userResponse.trim() === "") {
      toast({
        title: "Validation Error",
        description: "This field cannot be empty.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return; // Stop the function if validation fails
    }

    if (currentStep === 0 && userResponse.length < 2) {
      // Name validation
      toast({
        title: "Validation Error",
        description: "Name must be at least 2 characters long.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    if (currentStep === 1 && !/\S+@\S+\.\S+/.test(userResponse)) {
      // Email validation
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    if (currentStep === 2 && userResponse.length < 6) {
      // Password validation
      toast({
        title: "Validation Error",
        description: "Password must be at least 6 characters long.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    // Assuming the confirmPassword step is immediately after the password step
    // No need for a separate check here as it's handled below with the password mismatch check

    setMessages((msgs) => [...msgs, { type: "answer", text: userResponse }]);

    // Update registration data based on the step
    const newData = { ...registrationData };
    if (currentStep === 0) newData.yourname = userResponse;
    if (currentStep === 1) newData.email = userResponse;
    if (currentStep === 2) newData.password = userResponse;
    if (currentStep === 3) newData.password2 = userResponse;
    setRegistrationData(newData);

    if (currentStep === questions.length - 1) {
      if (newData.password !== newData.password2) {
        toast({
          title: "Password mismatch",
          description: "Your passwords do not match. Please try again.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setCurrentStep(2); // Go back to password step
        setMessages((msgs) => msgs.slice(0, -2)); // Remove last question and answer
        return;
      }

      try {
        fetch(APP_URL + "register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newData),
        })
          .then((res) => res.json())
          .then((response) => {
            console.log("response", response);
            if (response.token) {
              localStorage.setItem("token", response.token);
              setIsLoading(false);
              toast({
                title: "Registration successful",
                description: "You are now registered and can continue to chat.",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
              setTimeout(() => {
                dispatch(registerUser());
              }, 1000);
              // handleMiddleWareLogin(response.token);
            } else {
              setError(response.message);
              setIsLoading(false);
            }
          })
          .catch((e) => {
            console.log(e);
            setError("something went wrong! please try later");
            setIsLoading(false);
          });

        // Clear registration data or redirect user
      } catch (error) {
        toast({
          title: "Registration failed",
          description: "Something went wrong.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } else {
      setCurrentStep(currentStep + 1);
    }
    setUserResponse(""); // Clear response input
  };

  return (
    <Flex direction="column" h="95vh" p={2} bg="cream" borderRadius={"20px"}>
      {/* Heading and context */}
      <VStack spacing={4} mb={2}>
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          nefer.ai
        </Text>
        <Text textAlign="center">
          Please provide your details to join the chat. Answer the questions
          below.
        </Text>
      </VStack>

      {/* Spacer to push everything else to the bottom */}
      {/* <Spacer /> */}

      {/* Message list */}
      <VStack spacing={4} overflowY="auto" flex="1">
        {messages.map((msg, index) => (
          <Box
            p={2}
            bg={msg.type === "question" ? "white" : "#718096"}
            borderRadius={"10px"}
            key={index}
            color={msg.type === "answer" && "white"}
            fontWeight={"bold"}
            alignSelf={msg.type === "question" ? "flex-start" : "flex-end"}
          >
            <Text>{msg.text}</Text>
          </Box>
        ))}
      </VStack>

      {/* Input box always at the bottom */}
      {currentStep < questions.length && (
        <InputGroup mt={4} bg={"white"} borderRadius={"10px"} mr={0}>
          <Input
            value={userResponse}
            onChange={(e) => setUserResponse(e.target.value)}
            placeholder="Your answer..."
            onKeyDown={(e) => e.key === "Enter" && handleResponse()}
            boxShadow="base" // Apply a shadow effect to the input
          />
          <InputRightElement width=".5rem">
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
      )}
    </Flex>
  );
};

export default ChatRegistration;
