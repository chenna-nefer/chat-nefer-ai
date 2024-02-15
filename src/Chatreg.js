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
  useToast,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import axios from "axios"; // Assuming axios is used for simplicity
import { useDispatch } from "react-redux";
import { registerUser, setBinanceKeys } from "./app/store";
import { APP_URL } from "./constants";

const ChatRegistration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userResponse, setUserResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    { type: "question", text: "What is your name?" },
  ]);

  const [registrationData, setRegistrationData] = useState({
    yourname: "",
    email: "",
    password: "",
    password2: "",
  });

  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    // Adjust questions based on the current step
    // This part remains unchanged
  }, [currentStep]);

  const handleResponse = async () => {
    // This function handles the input for each step
    // This part remains largely unchanged
    // The main difference is in how we handle the registration, OTP verification, and Binance keys submission
  };

  const registerUserDetails = async () => {
    setIsLoading(true);
    // Adjust the newData object to fit your API requirements
    const newData = {
      name: registrationData.yourname,
      email: registrationData.email,
      password: registrationData.password,
    };
    try {
      const response = await fetch(`${APP_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token); // Store token for later use
        dispatch(registerUser(data)); // Update Redux store with user data
        setCurrentStep(currentStep + 1); // Move to next step for OTP verification
      } else {
        toast({
          title: "Registration failed",
          description: data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Unable to complete registration.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (otp) => {
    setIsLoading(true);
    const token = localStorage.getItem("token"); // Retrieve the token stored during registration
    try {
      const response = await fetch(`${APP_URL}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({ confirmationcode: otp }),
      });
      const data = await response.json();
      if (data.success) {
        toast({
          title: "Success",
          description: "OTP verified successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setCurrentStep(currentStep + 1); // Proceed to Binance API key input
      } else {
        toast({
          title: "Verification failed",
          description: data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Unable to verify OTP.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const submitBinanceKeys = async (apiKey, secretKey) => {
    setIsLoading(true);
    const token = localStorage.getItem("token"); // Use the stored token for authorization
    try {
      const response = await fetch(`${APP_URL}/binance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({ apikey: apiKey, secretkey: secretKey }),
      });
      const data = await response.json();
      if (data.success) {
        dispatch(setBinanceKeys({ apiKey, secretKey })); // Update Redux store with Binance keys
        toast({
          title: "Binance Keys Saved",
          description:
            "Your Binance API and Secret keys have been successfully saved.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        // Proceed to the next step or finalize the registration process
      } else {
        toast({
          title: "Saving failed",
          description: data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Unable to save Binance keys.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex direction="column" h="95vh" p={2} bg="cream" borderRadius={"20px"}>
      <VStack spacing={4} mb={2}>
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          Registration
        </Text>
        <Text textAlign="center">
          Please follow the steps to complete your registration.
        </Text>
      </VStack>
      <VStack spacing={4} overflowY="auto" flex="1">
        {messages.map((msg, index) => (
          <Box
            p={2}
            bg={msg.type === "question" ? "white" : "#718096"}
            borderRadius={"10px"}
            key={index}
            color={msg.type === "answer" ? "white" : "black"}
            fontWeight={"bold"}
            alignSelf={msg.type === "question" ? "flex-start" : "flex-end"}
          >
            <Text>{msg.text}</Text>
          </Box>
        ))}
      </VStack>
      {currentStep <= 6 && (
        <InputGroup mt={4} bg={"white"} borderRadius={"10px"}>
          <Input
            value={userResponse}
            onChange={(e) => setUserResponse(e.target.value)}
            placeholder={currentStep === 4 ? "Enter OTP" : "Your answer..."}
            onKeyDown={(e) => e.key === "Enter" && handleResponse()}
            boxShadow="base"
          />
          <InputRightElement width="4.5rem">
            <IconButton
              isLoading={isLoading}
              aria-label="Send"
              icon={<ArrowRightIcon />}
              onClick={handleResponse}
            />
          </InputRightElement>
        </InputGroup>
      )}
    </Flex>
  );
};

export default ChatRegistration;
