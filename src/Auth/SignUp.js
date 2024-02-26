import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  InputGroup,
  HStack,
  InputRightElement,
  Icon,
  Input,
  Link,
  Switch,
  Alert,
  AlertIcon,
  Text,
  useColorModeValue,
  Image,
  Grid,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

// Assets
// import BgSignUp from "assets/img/BgSignUp.png";

import neferlogo from "../assets/img/neferlogo.png";
import {
  navigateToLogin,
  navigateToRegister,
  navigateToVerifyEmail,
} from "../app/store.js";
import { APP_URL } from "../constants.js";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const titleColor = useColorModeValue("#6938EF", "#6938EF");
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("white", "gray.700");
  const bgIcons = useColorModeValue("teal.200", "rgba(255, 255, 255, 0.5)");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [yourname, setYourName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCopy, setPasswordCopy] = useState("");
  // const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const handleEmailInputChange = (e) => setEmail(e.target.value);
  const handleYourNameInputChange = (e) => setYourName(e.target.value);
  // const handleLastNameInputChange = (e) => setLastName(e.target.value);
  const handlePasswordInputChange = (e) => setPassword(e.target.value);
  // const handleUsernameInputChange = (e) => setUsername(e.target.value);
  const handlePasswordCopyInputChange = (e) => setPasswordCopy(e.target.value);

  const isError = input === "";
  const handleRegistration = () => {
    setError("");
    setIsLoading(true);
    fetch(APP_URL + "register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        password2: passwordCopy,
        yourname,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("response", response);
        if (response.token) {
          localStorage.setItem("token", response.token);
          setIsLoading(false);
          dispatch(navigateToVerifyEmail());
          // navigate("/verifyemail");
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
    // if (token) {
    //   console.log("token", token);
    //   // setLoading(false);
    // }
  };
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
  // function validateUserName(inputValue) {
  //   var regexPattern = /^[a-zA-Z0-9]+$/;
  //   return (
  //     regexPattern.test(inputValue) &&
  //     inputValue.length > 3 &&
  //     inputValue.length < 13
  //   );
  // }

  const handleSubmit = () => {
    setError("");
    if (!yourname || !email || !password || !passwordCopy) {
      setError("Please fill in all fields");
      return;
    }

    // if (!validateUserName(username)) {
    //   setError(
    //     "Username should be between 4 and 12 characters and contain only alphanumeric characters and underscores"
    //   );
    // }

    if (!validateEmail(email)) {
      setError("Invalid Email");
    }

    if (password !== passwordCopy) {
      // Validate that passwords match
      setError("Passwords do not match");
      return;
    }
    handleRegistration();
  };

  const handleMiddleWareLogin = (token) => {
    fetch(APP_URL + "middlewarelogin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setIsLoading(false);
        navigate("/providekeys");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Grid
      className="grid-component"
      mt={5}
      // p={8}
      pt={0}
      direction="column"
      alignItems="center"
      justifyItems={"center"}
      gridTemplateColumns={"auto"}
      // justifyContent="space-evenly"
      bg={"#000000"}
      color={"white"}
    >
      <Box
        className="gradient-border"
        style={{
          borderRadius: "24px",
          width: "fit-content",
        }}
        mt={2}
        ml={{
          base: "0",
          md: "0",
          lg: "0",
          xl: "0",
          "2xl": "0",
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
            textAlign={"left"}
            fontSize={"5xl"}
            fontWeight={"700"}
            lineHeight={"67.2px"}
            mb={5}
            // background={"#000000"}
            variant="outline"
          >
            Sign up
          </Text>

          <Box>
            <FormControl id="Your Name" isRequired>
              <FormLabel
                fontSize={"10px"}
                lineHeight={"16px"}
                fontWeight={"500"}
                color={"#808191"}
              >
                YOUR NAME
              </FormLabel>
              <Input
                className="initial-input-border"
                fontSize="sm"
                ms="4px"
                // bg="#191B20"
                borderRadius="8px"
                type="text"
                variant={"custom"}
                placeholder="Your Name "
                onChange={handleYourNameInputChange}
                mb="24px"
              />
            </FormControl>
          </Box>

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
                  mb="24px"
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
            <FormControl id="password2" isRequired>
              <FormLabel
                fontSize={"10px"}
                lineHeight={"16px"}
                fontWeight={"500"}
                color={"#808191"}
              >
                CONFIRM PASSWORD
              </FormLabel>
              <InputGroup>
                <Input
                  type={showPassword2 ? "text" : "password"}
                  fontSize="sm"
                  ms="4px"
                  name="password2"
                  borderRadius="8px"
                  placeholder="Confirm Your password"
                  onChange={handlePasswordCopyInputChange}
                  mb="24px"
                  size="lg"
                  variant={"custom"}
                />
                <InputRightElement h={"auto"}>
                  <Button
                    variant={"unstyled"}
                    onClick={() =>
                      setShowPassword2((showPassword2) => !showPassword2)
                    }
                  >
                    {showPassword2 ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <div
              onClick={handleSubmit}
              className="gradient-border"
              style={{
                borderRadius: "12px",
                marginTop: "0.5em",
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
                    Move to Step 2
                  </Text>
                </div>
              </div>
            </div>
          </FormControl>
          {error && (
            <Alert status="error" color={"brown"} variant="subtle" mb={5}>
              <AlertIcon />
              {error}
            </Alert>
          )}
        </Flex>
      </Box>
    </Grid>
  );
}

export default SignUp;
