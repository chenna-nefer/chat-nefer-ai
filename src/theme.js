// import { extendTheme } from "@chakra-ui/react";
// export const theme = extendTheme({
//   colors: {
//     black: "#000", // Pure black
//     darkGray: "#121212", // Slightly lighter than pure black for surfaces
//   },
//   styles: {
//     global: {
//       body: {
//         // bg: "darkGray",
//         bgGradient: "linear(to-r, gray.300, yellow.400, pink.200)",
//         color: "white",
//       },
//     },
//   },
//   components: {
//     Button: {
//       baseStyle: {
//         _hover: { bg: "black" },
//       },
//     },
//     // You can continue to customize other components in a similar manner
//   },
// });

import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  // Custom color palette
  colors: {
    primary: "#007bff", // Example primary color
    secondary: "#6c757d", // Example secondary color
    success: "#28a745", // Success color
    danger: "#dc3545", // Danger color
    warning: "#ffc107", // Warning color
    info: "#17a2b8", // Info color
    light: "#f8f9fa", // Light color
    dark: "#343a40", // Dark color
    cream: "#f5f5dc", // cream
    // Add more custom colors as needed
  },

  // Global style overrides
  styles: {
    global: {
      "html, body": {
        bg: "light", // Using the light color for background
        bgGradient:
          "['linear(to-tr, teal.300, yellow.400)','linear(to-t, blue.200, teal.500)', 'linear(to-b, orange.100, purple.300)',]",
        color: "gray.500", // Using the dark color for text
        lineHeight: "tall",
      },
    },
  },

  // Component style overrides
  components: {
    Button: {
      // Base style for buttons
      baseStyle: {
        fontWeight: "bold", // Making the button text bold
        _hover: {
          bg: "primary", // Change to primary color on hover
          boxShadow: "md", // Add shadow on hover for better visibility
        },
      },
      // Variants for different button styles
      variants: {
        outline: {
          border: "2px solid",
          borderColor: "primary",
          color: "primary",
        },
        solid: {
          bg: "primary",
          color: "white",
        },
        // Add more button variants as needed
      },
      // Sizes for buttons, can define custom sizes here
      sizes: {
        sm: {
          fontSize: "sm",
          px: 4, // Padding left and right
          py: 3, // Padding top and bottom
        },
        md: {
          fontSize: "md",
          px: 6,
          py: 4,
        },
        // Add more sizes as needed
      },
      // Default props for Button component
      defaultProps: {
        size: "md", // Default size
        variant: "solid", // Default variant
      },
    },
    Input: {
      // Base styles for the input
      baseStyle: {
        field: {
          bg: "cream", // Use the cream color for the input background
          color: "dark", // Text color for the input
          _placeholder: {
            color: "gray.500", // Placeholder text color
          },
          _hover: {
            bg: "cream", // Maintain cream color on hover
            borderColor: "white",
          },
          _focus: {
            bg: "cream", // Maintain cream color on focus
            borderColor: "white", // Change border color to primary on focus
          },
        },
      },
    },
    // Continue to customize other components in a similar manner
  },
});
