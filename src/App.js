import * as React from "react";

// 1. import `ChakraProvider` component
import { extendTheme, ChakraProvider, ColorModeScript } from "@chakra-ui/react";
// import {  } from '@chakra-ui/react'
import Routes from "./Routes.js";
import "./App.css";

// 2. Extend the theme to include custom colors, fonts, etc
const configTheme = {
  initialColorMode: "dark",
  useSystemColorMode: true,
  brand: {
    900: "#000000",
    800: "#000000",
    700: "#000000",
    500: "#000000",
    400: "#000000",
    // 300: "#2a69ac",
  },
  breakpoints: {
    sm: "30em", // 480px
    md: "48em", // 768px
    lg: "62em", // 992px
    xl: "80em", // 1280px
    "2xl": "96em", // 1536px
    "3xl": "120em", // 1920px
  },
  fontSizes: {
    sm: "14px",
    md: "18px",
    lg: "21px",
    xl: "24px",
    "2xl": "28px",
    "3xl": "32px",
    "4xl": "36px",
    "5xl": "40px",
    "6xl": "44px",
    "7xl": "48px",
    "8xl": "54px",
    "9xl": "70px",
  },
};

export const theme = extendTheme({
  config: configTheme,
  colors: {
    tableColors: {
      200: "#ffffff",
      300: "#000000",
      // 900: "#1a365d",
      // 800: "#153e75",
      // 700: "#171923",
      // 500: "#6938EF",
      // 400: "#808191",
    },
  },
  components: {
    Button: {
      defaultProps: {
        bg: "#6938EF",
        color: "white",
        // _hover: {
        //   bg: "#5127B7",
        // },
      },
      baseStyle: {
        fontWeight: "500",
        // bg: "#6938EF",
      },
      variants: {
        custom: {
          bg: "#6938EF",
          color: "white",
          // _hover: {
          //   bg: "#5127B7",
          // },
        },
        outline: {
          border: "2px solid",
          borderColor:
            "linear-gradient(125.46deg, #FFFFFF -2.09%, #BB62F1 19.09%, #EE4B60 59.1%, #FBBD15 114.49%, #FFFFFF 114.87%)",
          color: "#FFFFFF",
        },
        solid: {
          // border: "2px solid",
          // borderColor: "#6938EF",
          bg: "#6938EF",
          color: "white",
        },
      },
    },
    Checkbox: {
      baseStyle: {
        control: {
          borderRadius: "full",
          borderColor: "#FFFFFF",
          _checked: {
            bg: "#6938EF",
            borderColor: "#6938EF",
            color: "white",
          },
          _focus: {
            boxShadow: "none",
          },
          _hover: {
            borderColor: "#6938EF",
          },
          _invalid: {
            borderColor: "#E53E3E",
          },
          _disabled: {
            opacity: 0.4,
          },
          _before: {
            content: '""',
            display: "inline-block",
            width: "0.7em",
            height: "0.7em",
            borderRadius: "full",
            bg: "transperant",
            transform: "translateY(-25%)",
            visibility: "visible",
            transition: "all 0.2s",
          },
          _checkedAndDisabled: {
            opacity: 0.4,
          },
          _checkedAndFocus: {
            borderColor: "#6938EF",
            boxShadow: "none",
          },
          _checkedAndHover: {
            borderColor: "#6938EF",
          },
          _checkedAndInvalid: {
            borderColor: "#E53E3E",
          },
          _checkedAndReadOnly: {
            bg: "gray.300",
            borderColor: "gray.300",
            boxShadow: "none",
          },
          _readOnly: {
            opacity: 0.4,
            userSelect: "none",
          },
          _indeterminate: {
            bg: "#6938EF",
            borderColor: "#6938EF",
            color: "white",
          },
          _indeterminateAndChecked: {
            bg: "#6938EF",
            borderColor: "#6938EF",
            color: "white",
          },
          _indeterminateAndDisabled: {
            opacity: 0.4,
          },
        },
      },
    },
    Input: {
      baseStyle: {
        fontWeight: "500",
        bg: "#191B20",
      },
      variants: {
        custom: {
          field: {
            bg: "#000000",
            border: "1px solid",
            borderColor: "#ffffff",
            color: "#FFFFFF",
            _focus: {
              borderColor: "#6938EF",
            },
          },
        },
        // custom: {
        //   bg: "#191B20",
        //   color: "white",
        // },
        outline: {
          bg: "#000000",
          border: "2px solid",
          borderColor: "#6938EF",
          color: "#FFFFFF",
        },
        solid: {
          bg: "#000000",
          border: "2px solid",
          borderColor: "#6938EF",
          color: "white",
        },
      },
      defaultProps: {
        size: "md",
        variant: "custom",
      },
    },
    Select: {
      variants: {
        custom: {
          field: {
            bg: "#000000",
            border: "1px solid",
            borderColor: "#ffffff",
            color: "#FFFFFF",
            _focus: {
              borderColor: "#6938EF",
            },
          },
        },
      },
    },
  },
  borderStyles: {
    solid: "1px",
    dotted: "2px dotted",
    dashed: "3px dashed",
    custom:
      "2px solid linear-gradient(125.46deg, #FFFFFF -2.09%, #BB62F1 19.09%, #EE4B60 59.1%, #FBBD15 114.49%, #FFFFFF 114.87%)",
  },
});

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Routes />
    </ChakraProvider>
  );
}
export default App;
