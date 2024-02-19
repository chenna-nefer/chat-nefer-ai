import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import { registerUser, setBinanceKeys } from "./app/store.js";
import { APP_URL } from "./constants.js";

const ChatRegistration = () => {
  const [steps, setSteps] = useState([
    { key: "name", question: "What is your name?", type: "text" },
    { key: "email", question: "What is your email?", type: "email" },
    { key: "password", question: "Choose a password", type: "password" },
    {
      key: "confirmPassword",
      question: "Confirm your password",
      type: "password",
    },
  ]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [userResponses, setUserResponses] = useState({});
  const [userResponse, setUserResponse] = useState("");

  const [messages, setMessages] = useState([
    { type: "question", text: steps[0].question, key: steps[0].key },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();

  const addStep = (step) => {
    setSteps((prevSteps) => [...prevSteps, step]);
  };

  const handleResponse = async (response) => {
    setIsLoading(true);
    const currentStep = steps[currentStepIndex];
    // General validation for empty response
    if (response.trim() === "") {
      toast({
        title: "Validation Error",
        description: "This field cannot be empty.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return; // Stop the function if validation fails
    }

    // Specific validations based on the step type or key
    if (currentStep.key === "name" && response.length < 2) {
      toast({
        title: "Validation Error",
        description: "Name must be at least 2 characters long.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    if (currentStep.key === "email" && !/\S+@\S+\.\S+/.test(response)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    if (
      (currentStep.key === "password" ||
        currentStep.key === "confirmPassword") &&
      response.length < 6
    ) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 6 characters long.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
      return;
    }

    setUserResponses((prevResponses) => ({
      ...prevResponses,
      [currentStep.key]: response,
    }));

    setMessages((msgs) => [
      ...msgs,
      { type: "answer", text: response, key: currentStep.key },
    ]);

    if (currentStep.key === "confirmPassword") {
      // Trigger registration API call
      try {
        const payload = {
          yourname: userResponses.name,
          password: userResponses.password,
          email: userResponses.email,
          confirmPassword: response, // Include this line if you explicitly need confirmPassword in your payload
        };

        const registrationResponse = await fetch(`${APP_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await registrationResponse.json();
        if (!registrationResponse.ok)
          throw new Error(data.message || "Registration failed");

        localStorage.setItem("token", data.token);
        dispatch(registerUser(data.user));

        toast({
          title: "Registration Successful",
          description: "Please verify your email with the OTP sent.",
          status: "success",
          isClosable: true,
        });

        // Add OTP step dynamically
        addStep({
          key: "otp",
          question: "Enter the OTP sent to your email",
          type: "otp",
        });
        // Move to the OTP step
        setCurrentStepIndex(currentStepIndex + 1);
        setMessages((msgs) => [
          ...msgs,
          {
            type: "question",
            text: "Enter the OTP sent to your email",
            key: "otp",
          },
        ]);
      } catch (error) {
        toast({
          title: "Registration Failed",
          description: error.message,
          status: "error",
          isClosable: true,
        });
        setIsLoading(false);
        return;
      }
    } else if (currentStep.key === "otp") {
      // Handle OTP verification
      const token = localStorage.getItem("token"); // Retrieve the token stored during registration
      try {
        const otpResponse = await fetch(`${APP_URL}/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify({ confirmationcode: response }), // Correctly use userResponse
        });
        const data = await otpResponse.json();
        console.log("data:", data);
        if (data.success) {
          toast({
            title: "Success",
            description: "OTP verified successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          // Dynamically add Binance API key steps
          const newSteps = [
            {
              key: "binanceApiKey",
              question: "Enter your Binance API key",
              type: "text",
            },
            {
              key: "binanceSecretKey",
              question: "Enter your Binance Secret key",
              type: "password",
            },
          ];

          setSteps((prevSteps) => [...prevSteps, ...newSteps]);
          // Move to the next step, which is binanceApiKey
          const nextStepIndex = currentStepIndex + 1;
          setCurrentStepIndex(nextStepIndex);
          setMessages((msgs) => [
            ...msgs,
            {
              type: "question",
              text: newSteps[0].question,
              key: newSteps[0].key,
            },
          ]);
        } else {
          toast({
            title: "Verification failed",
            description: data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: "An error occurred",
          description: "Unable to verify OTP.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    } else if (currentStep.key === "binanceApiKey") {
      // Just collect the API key and move to the secret key step
      // No submission to backend yet
      setCurrentStepIndex(currentStepIndex + 1); // Move to the secret key input
    } else if (currentStep.key === "binanceSecretKey") {
      // Final step: Submit Binance keys,
      // Now that both keys are presumably collected, submit them
      const { binanceApiKey, binanceSecretKey } = userResponses; // Ensure these are being correctly assigned in userResponses
      const payload = {
        apikey: userResponses.binanceApiKey,
        secretkey: response,
      };
      const token = localStorage.getItem("token"); // Use the stored token for authorization
      try {
        const binanceResponse = await fetch(`${APP_URL}/binance`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify(payload),
        });
        const data = await binanceResponse.json();
        if (data.success) {
          dispatch(setBinanceKeys({ binanceKeys: true })); // Update Redux store with Binance keys
          toast({
            title: "Binance Keys Saved",
            description:
              "Your Binance API and Secret keys have been successfully saved.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          // Proceed to the next step or finalize the registration process
        } else {
          toast({
            title: "Saving failed",
            description: data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: "An error occurred",
          description: "Unable to save Binance keys.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    }

    // Prepare for next question or completion

    if (currentStepIndex < steps.length - 1) {
      const nextStep = steps[currentStepIndex + 1];
      setMessages((msgs) => [
        ...msgs,
        { type: "question", text: nextStep.question, key: nextStep.key }, // Use nextStep.key
      ]);
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // All dynamic steps including OTP and Binance keys have been completed
      toast({
        title: "All Set!",
        description: "Your registration and setup are complete.",
        status: "success",
        isClosable: true,
      });
    }
    setIsLoading(false);
    setUserResponse(""); // Clear the input field
  };

  const handleSubmit = () => {
    const currentStep = steps[currentStepIndex];
    handleResponse(userResponse);
  };

  return (
    <Flex direction="column" h="95vh" p={2} bg="cream" borderRadius="20px">
      <VStack spacing={4} mb={2}>
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          nefer.ai
        </Text>
        <Text textAlign="center">
          Please provide your details to join the chat. Answer the questions
          below.
        </Text>
      </VStack>

      {/* Message list */}
      <VStack spacing={4} overflowY="auto" flex="1">
        {messages.map((msg, index) => {
          // Determine if the message text should be masked
          const shouldMask =
            msg.type === "answer" &&
            (msg.key === "password" ||
              msg.key === "confirmPassword" ||
              msg.key === "binanceSecretKey");
          const displayText = shouldMask ? "******" : msg.text;

          return (
            <Box
              p={2}
              bg={msg.type === "question" ? "white" : "#718096"}
              borderRadius="10px"
              key={index}
              color={msg.type === "answer" ? "white" : "black"}
              fontWeight="bold"
              alignSelf={msg.type === "question" ? "flex-start" : "flex-end"}
            >
              <Text>{displayText}</Text>
            </Box>
          );
        })}
      </VStack>

      {/* Input box always at the bottom */}
      {currentStepIndex < steps.length && (
        <InputGroup mt={4} bg="white" borderRadius="10px">
          <Input
            value={userResponse}
            onChange={(e) => setUserResponse(e.target.value)}
            placeholder={steps[currentStepIndex].question}
            onKeyDown={(e) => e.key === "Enter" && !isLoading && handleSubmit()}
            boxShadow="base"
            disabled={isLoading} // Disable input when loading
            type={
              steps[currentStepIndex].type === "password" ||
              steps[currentStepIndex].key === "binanceSecretKey"
                ? "password"
                : "text"
            }
          />
          <InputRightElement width=".5rem">
            <IconButton
              aria-label="Send message"
              icon={<ArrowRightIcon />}
              h="1.75rem"
              size="sm"
              onClick={handleSubmit}
              isLoading={isLoading} // Show loading indicator
              disabled={isLoading} // Disable button when loading
              bg="gray.500"
            />
          </InputRightElement>
        </InputGroup>
      )}
    </Flex>
  );
};

export default ChatRegistration;
