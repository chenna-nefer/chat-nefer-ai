import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  HStack,
  InputRightElement,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  Image,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
// Assets
import signInImage from "../assets/img/signInImage.png";
import avatar1 from "../assets/img/avatars/avatar1.png";

import neferlogo from "../assets/img/neferlogo.png";
import { APP_URL } from "../constants.js";
import axios from "axios";
import { useDispatch } from "react-redux";
import { navigateToProvideKeys } from "../app/store.js";
// import SideNavOnlyWithIcons from "../components/SideNavOnlyWithIcons";

// import { login } from "services";
function SignIn() {
  // Chakra color mode
  const navigate = useNavigate();
  const titleColor = useColorModeValue("#6938EF", "#6938EF");
  const textColor = useColorModeValue("gray.400", "white");
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const handleEmailInputChange = (e) => setEmail(e.target.value);
  const handlePasswordInputChange = (e) => setPassword(e.target.value);

  const isError = input === "";
  useEffect(() => {
    localStorage.clear();
    return () => {};
  }, []);

  const handleLogin = () => {
    // setMessage("");
    setError("");
    setIsLoading(true);
    fetch(APP_URL + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.token) {
          localStorage.setItem("token", response.token);
          handleNavigation(response.token);
        } else {
          console.log("No Token: ", response);
          setIsLoading(false);
          setError(response.message);
        }
        // return response;
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setError("something went wrong! please try later");
      });
    // if (token) {
    //   console.log("token", token);
    //   // setLoading(false);
    // }
  };

  const handleNavigation = (token) => {
    axios
      .get(APP_URL + "checkbinancestatus", {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
      .then((response) => {
        let data = response.data;
        if (data.status) {
          localStorage.setItem("binancekeys", true);
          setIsLoading(false);
          navigate("/chat");
        } else {
          // navigate("/providekeys");
          dispatch(navigateToProvideKeys());
        }
      })
      .catch((err) => console.log("err: ", err));
  };

  const handleSubmit = () => {
    handleLogin();
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      // overflow="hidden"
      bg={"#000000"}
      mt={50}
      // className="changebackground"
      // bg={useColorModeValue("#1F2128", "#1F2128")}
      color={"white"}
    >
      {/* <Flex alignItems="center" mx="8" justifyContent="space-between">
          <Link
            href={"https://nefer.app"}
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
          // <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} /> 
        </Flex> */}
      <Flex
        alignItems="center"
        justifyContent="center"
        mt={50}
        // mb="60px"
        // bg={"#242731"}
        // className="changebackground"
        // bg={useColorModeValue("#1F2128", "#1F2128")}
        color={"white"}
      >
        <div
          className="gradient-border"
          style={{
            borderRadius: "24px",
            width: "fit-content",
            // marginLeft: "3em",
          }}
        >
          <Flex
            direction="column"
            // w="445px"
            maxWidth={"445px"}
            minWidth={"360px"}
            width={"auto"}
            background="transparent"
            borderRadius="24px"
            px={[4, 10]}
            py={[4, 6]}
            className="changebackground"
            bg={useColorModeValue("#000000", "#000000")}
            color={"white"}
            boxShadow="0 20px 27px 0 rgb(0 0 0 / 10%)"
          >
            <Text
              className="gradientText"
              // color={"white"}
              border={"unset"}
              width={"auto"}
              textAlign={"center"}
              fontSize={"3xl"}
              fontWeight={"700"}
              lineHeight={"67.2px"}
              mb={5}
              // background={"#000000"}
              variant="outline"
            >
              Login here
            </Text>
            <FormControl id="email" isRequired>
              <FormLabel
                fontSize={"10px"}
                lineHeight={"16px"}
                fontWeight={"500"}
                color={"#808191"}
                ms="4px"
              >
                EMAIL
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="8px"
                type="email"
                placeholder="Your email address"
                onChange={handleEmailInputChange}
                mb="24px"
                variant={"custom"}
                size="lg"
              />

              {/* <FormControl display="flex" alignItems="center">
                <Switch id="remember-login" colorScheme="teal" me="10px" />
                <FormLabel
                  htmlFor="remember-login"
                  mb="0"
                  ms="1"
                  fontWeight="normal"
                >
                  Remember me
                </FormLabel>
              </FormControl> */}
              <FormControl id="password" isRequired>
                <FormLabel
                  fontSize={"10px"}
                  lineHeight={"16px"}
                  fontWeight={"500"}
                  color={"#808191"}
                >
                  PASSWORD
                </FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    fontSize="sm"
                    ms="4px"
                    name="password"
                    borderRadius="8px"
                    placeholder="Your password"
                    onChange={handlePasswordInputChange}
                    mb="6px"
                    size="lg"
                    variant={"custom"}
                  />
                  <InputRightElement h={"auto"}>
                    <Button
                      variant={"unstyled"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <div
                onClick={handleSubmit}
                className="gradient-border"
                style={{
                  borderRadius: "12px",
                  marginTop: "2em",
                  marginBottom: "1em",
                  marginLeft: "4px",
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
                      Sign In
                    </Text>
                  </div>
                </div>
              </div>
            </FormControl>
            {/* <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
            >
              <Text color={textColor} fontWeight="medium">
                Don't have an account?
                <Link
                  color={titleColor}
                  href="/signup"
                  // as="span"
                  ms="5px"
                  fontWeight="bold"
                >
                  Sign Up
                </Link>
              </Text>
            </Flex> */}
            {error && (
              <Alert status="error" variant="subtle" mb={5}>
                <AlertIcon />
                {error}
              </Alert>
            )}
          </Flex>
        </div>
      </Flex>
    </Flex>
  );
}

export default SignIn;
