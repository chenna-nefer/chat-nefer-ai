import React from "react";
import { Box } from "@chakra-ui/react";
import "./App.css";
import ChatPage from "./Chat.js";
// import ChatRegistration from "./Chatreg.js";
import ChatRegistration from "./Registration.js";
import { useSelector } from "react-redux";

function App() {
  const isRegistered = useSelector((state) => state.registration.isRegistered);

  return (
    <Box
      p={5}
      w="100%"
      h="100vh"
      bg="cream"
      display="flex" // Make the Box a flex containe r
      justifyContent="center" // Horizontally center the content
      alignItems="center" // Vertically center the content (if the Box has a specific height)
      // If you uncomment the height, the alignItems property will vertically center the content within that height
      // h="200px"
      // bgGradient={[
      //   "linear(to-tr, teal.300, yellow.400)",
      //   "linear(to-t, blue.200, teal.500)",
      //   "linear(to-b, orange.100, purple.300)",
      // ]}
      // bgGradient="linear(to-r, gray.300, yellow.400, pink.200)"
    >
      <Box width="60%" textAlign="center">
        {/* Adjust this Box to control the width and centering of the content */}
        {!isRegistered && <ChatRegistration />}
        {isRegistered && <ChatPage />}
      </Box>
    </Box>
  );
}

export default App;
