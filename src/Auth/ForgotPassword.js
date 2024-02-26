import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  Image,
  Center,
} from "@chakra-ui/react";
// Assets
import signInImage from "../assets/img/signInImage.png";
import avatar1 from "../assets/img/avatars/avatar1.png";
import neferlogo from "../assets/img/neferlogo.png";
import { APP_URL } from "../constants";
import useAuthToken from "../authToken";

// import { login } from "services";
function ForgotPassword() {
  // Chakra color mode
  const navigate = useNavigate();
  let token = useAuthToken();
  const titleColor = useColorModeValue("#6938EF", "#6938EF");
  const textColor = useColorModeValue("gray.400", "white");

  const [input, setInput] = useState("");
  const [confirmationcode, setConfirmationcode] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleConfirmationCode = (e) => setConfirmationcode(e.target.value);
  const isError = input === "";

  const handleVerifyEmail = () => {
    // setMessage("");
    if (confirmationcode) {
      setError("");
      setIsLoading(true);
      console.log("confirmationcode:", confirmationcode);
      // return;
      fetch(APP_URL + "verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify({
          confirmationcode,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.isAuth) {
            console.log("response: ", response);
            setIsLoading(false);
            setSuccessMessage(
              response.message + ", please wait... we are moving you to the app"
            );
            setTimeout(() => {
              navigate("/providekeys");
            }, 1500);
          } else {
            console.log("No response: ");
            setIsLoading(false);
            setError(response.message);
          }
          // return response;
        })
        .catch((err) => {
          console.log("err: ", err);
          setIsLoading(false);
          setError("something went wrong! please try later");
        });
    } else {
      setError("Please enter confirmation code ");
    }
  };

  return (
    <Flex
      direction="column"
      alignSelf="center"
      justifySelf="center"
      // overflow="hidden"
      bg={"#000000"}
      // className="changebackground"
      // bg={useColorModeValue("#1F2128", "#1F2128")}
      color={"white"}
    >
      <Flex alignItems="center" mx="8" justifyContent="space-between">
        <Link
          href={"https://goals.nefer.app"}
          target="_blank"
          style={{ textDecoration: "none" }}
        >
          <Flex alignItems="center" justifyContent="space-between" h={16}>
            <Image src={neferlogo} w={"40px"} />
            <Text fontSize="3xl" fontWeight="900">
              Nefer
            </Text>
          </Flex>
        </Link>
        {/* <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} /> */}
      </Flex>
      <Flex
        flexDirection={"column"}
        alignItems="center"
        justifyContent="center"
        // mb="60px"
        mt="20px"
        // bg={"#242731"}
        // className="changebackground"
        // bg={useColorModeValue("#1F2128", "#1F2128")}
        color={"white"}
      >
        <Box width={"50%"} mb="14px">
          <Heading textAlign="center" color={"#ffffff"} fontSize="30px">
            Enter New Password
            {/* Back */}
          </Heading>
        </Box>
        <Flex
          direction="column"
          w="445px"
          background="transparent"
          borderRadius="15px"
          p={[6, 10]}
          // mx={{ base: "100px" }}
          // bg={bgColor}
          className="changebackground"
          bg={useColorModeValue("#000000", "#000000")}
          color={"white"}
          boxShadow="0 20px 27px 0 rgb(0 0 0 / 10%)"
        >
          <FormControl id="firstname" isRequired>
            <FormLabel
              fontSize={"10px"}
              lineHeight={"16px"}
              fontWeight={"500"}
              color={"#808191"}
            >
              Confirm Password
            </FormLabel>
            <Input
              className="initial-input-border"
              fontSize="sm"
              borderRadius="8px"
              type="text"
              variant={"custom"}
              placeholder="Confirm Password"
              onChange={handleConfirmationCode}
              mb="24px"
            />
          </FormControl>
          <div
            onClick={handleVerifyEmail}
            className="gradient-border"
            style={{
              borderRadius: "12px",
              marginTop: "0.5em",
              marginBottom: "1em",
            }}
          >
            <div
              style={{
                background: "#000000",
                cursor: "pointer",
                borderRadius: "12px",
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(125.46deg, rgba(255, 255, 255, 0.2) -2.09%, rgba(187, 98, 241, 0.2) 19.09%, rgba(238, 75, 96, 0.2) 59.1%, rgba(251, 189, 21, 0.2) 114.49%, rgba(255, 255, 255, 0.2) 114.87%)",
                  padding: "10px",
                  borderRadius: "12px",
                  textAlign: "center",
                }}
              >
                <Text
                  // className="gradientText"
                  fontSize={"14px"}
                  color={"white"}
                  textAlign={"center"}
                  lineHeight={"24px"}
                  fontWeight={"500"}
                >
                  Confirm Password
                </Text>
              </div>
            </div>
          </div>

          {error && (
            <Center>
              <Alert status="error" variant="subtle" mb={5}>
                <AlertIcon />
                {error}
              </Alert>
            </Center>
          )}
        </Flex>

        {successMessage && (
          <Center>
            <Alert status="success" variant="subtle" mb={5} px={10}>
              <AlertIcon />
              {successMessage}
            </Alert>
          </Center>
        )}
      </Flex>
    </Flex>
  );
}

export default ForgotPassword;
