import React from "react";
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
  Link,
  Image,
} from "@chakra-ui/react";
import SignIn from "./Auth/SignIn.js";
import SignUp from "./Auth/SignUp.js";
import VerifyEmail from "./Auth/VerifyEmail.js";
import TypingEffect from "./TypingEffect.js";
import { useDispatch, useSelector } from "react-redux";
import neferlogo from "./assets/img/neferlogo.png";
import { navigateToLogin, navigateToRegister } from "./app/store.js";
import Apikeys from "./components/apikeys.js";
// import SignUp from "./auth/signup.js";

const LandingPage = () => {
  // This is a placeholder. You might use Redux state or another method to switch between components
  const componentToShow = useSelector(
    (state) => state.registration.currentComponent
  );
  const [showComponent, setComponentToShow] = React.useState("login");

  const dispatch = useDispatch();
  const titleColor = useColorModeValue("#6938EF", "#6938EF");
  const textColor = useColorModeValue("gray.700", "white");

  const renderComponent = () => {
    switch (componentToShow) {
      case "login":
        return <SignIn />;
      case "register":
        return <SignUp />;
      case "verifyOtp":
        return <VerifyEmail />;
      case "provideKeys":
        return <Apikeys />;
      default:
        return <SignIn />;
    }
  };

  return (
    <Flex h="100vh" bg="#000000">
      <Box w="55%" bg="#00002E" pl={3} color="#D292FF">
        <Link href={"/"} style={{ textDecoration: "none" }}>
          <Flex alignItems="center" h={16}>
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
        </Link>
        <Text p="5" m={5} fontSize={30}>
          <TypingEffect
            text="Data-Driven Insights for Your Crypto Portfolio. Delivered Directly to Your Inbox - Some Good People"
            speed={50}
          />
        </Text>
      </Box>
      <Box w="45%" bg="#000000" color="white" mt={5}>
        {renderComponent()}
        {componentToShow === "register" && (
          <Flex
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            maxW="100%"
            mt="5"
          >
            <Text color={textColor} fontWeight="medium">
              Already have an account?
            </Text>
            <Text
              onClick={() => dispatch(navigateToLogin())}
              color={titleColor}
              ms="5px"
              fontWeight="bold"
              cursor={"pointer"}
            >
              Login here
            </Text>
          </Flex>
        )}
        {componentToShow === "login" && (
          <Flex
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            maxW="100%"
            mt="5"
          >
            <Text color={textColor} fontWeight="medium">
              Don't have an account?
            </Text>
            <Text
              onClick={() => dispatch(navigateToRegister())}
              color={titleColor}
              ms="5px"
              fontWeight="bold"
              cursor={"pointer"}
            >
              Sign Up
            </Text>
          </Flex>
        )}
      </Box>
    </Flex>
  );
};

export default LandingPage;
