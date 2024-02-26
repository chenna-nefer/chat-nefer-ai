import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Grid,
  Link,
  Switch,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Checkbox,
} from "@chakra-ui/react";
// Assets
// import signInImage from "../assets/img/signInImage.png";
// import avatar1 from "../assets/img/avatars/avatar1.png";
import binance_logo from "../assets/img/binance_logo.png";
import { APP_URL } from "../constants.js";
import useAuthToken from "../Auth/authtoken.js";
// import SidebarWithHeader from "./SideNavBar";
// import useAuthToken from "./Auth/authToken.js";

const headers = {
  "Content-Type": "application/json",
};
// import { login } from "services";
const Apikeys = () => {
  // Chakra color mode
  const profileData =
    localStorage.getItem("profile") &&
    JSON.parse(localStorage.getItem("profile"));
  const keysProvided = localStorage.getItem("keys");
  let token = useAuthToken();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const titleColor = useColorModeValue("#6938EF", "#6938EF");
  const textColor = useColorModeValue("gray.400", "white");

  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [apikey, setApikey] = useState("");
  const [secretkey, setSecretkey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [binanceData, setbinanceData] = useState("");
  const handleAPIkey = (e) => setApikey(e.target.value);
  const handleSecretkey = (e) => setSecretkey(e.target.value);

  const isError = input === "";

  const getbinanceData = () => {
    axios
      .get(APP_URL + "checkbinancestatus", {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      })
      .then((response) => {
        console.log("checkbinancestatus ==== ", response);
        let data = response.data;
        if (data.status) {
          setbinanceData(response.data.apikey);
          setIsLoading(false);
          localStorage.setItem("binancekeys", true);
          navigate("/chat");
        }
      })
      .catch((err) => console.log("err: ", err));
  };

  useEffect(() => {
    if (profileData) {
      setEmail(profileData.email);
    }

    if (keysProvided) {
      // navigate("/dashboard");
    }
    if (token && !keysProvided) {
      getbinanceData();
    }
  }, []);

  const handleInput = () => {
    // setMessage("");
    setError("");
    setIsLoading(true);

    fetch(APP_URL + "binance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({
        apikey,
        secretkey,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        // if (response.token) {
        // localStorage.setItem("token", response.token);
        setIsLoading(false);
        console.log("response: ", response);
        localStorage.setItem("binancekeys", true);
        checkbinapi();
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
  const checkbinapi = () => {
    // setRefreshing(true);
    axios
      .get(APP_URL + "checkbinapi", {
        headers: { ...headers, "x-access-token": token },
      })
      .then((response) => {
        console.log(response.data);
        // setPortfolioData(response.data);
        // calculatePortFolioValue(response.data);
        onOpen();
        setTimeout(() => {
          navigate("/chat");
        }, 2000);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  const handleSubmit = () => {
    handleInput();
  };
  const handleonCLose = () => {
    onClose();
    navigate("/chat");
  };
  return (
    // <SidebarWithHeader>
    <Grid
      gridTemplateColumns={"1fr 1fr"}
      mt={4}
      p={4}
      pt={0}
      direction="row"
      alignItems="center"
      justifyContent="space-evenly"
      bg={"#000000"}
      color={"white"}
    >
      <div
        style={{
          //   width: "max-content",
          alignSelf: "flex-start",
        }}
      >
        <div
          className="gradient-border"
          style={{
            borderRadius: "24px",
            width: "max-content",
            marginLeft: "3em",
            alignSelf: "flex-start",
          }}
        >
          <Flex
            direction="column"
            w="fit-content"
            background="transparent"
            borderRadius="24px"
            px={[4, 10]}
            py={[4, 6]}
            className="changebackground"
            bg={"#000000"}
            color={"white"}
            boxShadow="0 20px 27px 0 rgb(0 0 0 / 10%)"
          >
            <Flex
              // className="gradientText"
              fontSize={"3xl"}
              fontWeight={"700"}
              justifyContent={"center"}
              alignItems={"center"}
              width={"auto"}
              mb={5}
              color={"#F3BA2F"}
              px={16}
            >
              <Image
                src={binance_logo}
                alt=""
                ml={2}
                mr={1}
                width={"52px"}
                height={"52px"}
              />{" "}
              <Text fontSize={"3xl"} color={"#F3BA2F"}>
                Binance Connection{" "}
              </Text>
            </Flex>

            <FormControl id="api_key" isRequired>
              <FormLabel
                fontSize={"10px"}
                lineHeight={"16px"}
                fontWeight={"500"}
                color={"#808191"}
              >
                API key
              </FormLabel>
              <InputGroup>
                <Input
                  type={"password"}
                  fontSize="sm"
                  ms="4px"
                  name="api key"
                  borderRadius="8px"
                  placeholder="Your API key"
                  onChange={handleAPIkey}
                  mb="24px"
                  size="lg"
                  variant={"custom"}
                />
              </InputGroup>
            </FormControl>
            <FormControl id="secret_key" isRequired>
              <FormLabel
                fontSize={"10px"}
                lineHeight={"16px"}
                fontWeight={"500"}
                color={"#808191"}
              >
                Secret Key
              </FormLabel>
              <InputGroup>
                <Input
                  type={"password"}
                  fontSize="sm"
                  ms="4px"
                  name="secret key"
                  borderRadius="8px"
                  placeholder="Your secret key"
                  onChange={handleSecretkey}
                  mb="24px"
                  size="lg"
                  variant={"custom"}
                />
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
                    Move to Chat
                  </Text>
                </div>
              </div>
            </div>

            {error && (
              <Alert status="error" color={"brown"} variant="subtle" mb={5}>
                <AlertIcon />
                {error}
              </Alert>
            )}
          </Flex>
        </div>
        {/* <div
          className="gradient-border"
          style={{
            borderRadius: "12px",
            width: "fit-content",
            marginLeft: "3em",
            marginTop: "3em",
            alignSelf: "flex-start",
          }}
        >
          <div
            style={{
              background: "#000000",
              cursor: "pointer",
              borderRadius: "12px",
              padding: "1em",
            }}
          >
            <Text
              className="gradientText"
              fontSize={"21px"}
              fontWeight={"450"}
              lineHeight={"24px"}
            >
              We are only requesting view permissions. This does not give us
              access to your private keys nor the ability to move your funds. We
              only need this to show you your portfolio performance and
              analytics.
            </Text>
          </div>
        </div> */}
      </div>
      <Modal isOpen={isOpen} onClose={() => handleonCLose()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>API Permissions</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Checkbox defaultChecked>enableReading</Checkbox>
            {/* <Checkbox defaultChecked>enableSpotAndMarginTrading</Checkbox> */}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Grid>
    // </SidebarWithHeader>
  );
};

export default Apikeys;
