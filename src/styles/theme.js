// src/theme/index.js
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Button: {
      // Setup default props here
      defaultProps: {
        colorScheme: "primary", // This is where you define the default color scheme for buttons
      },
    },
  },
  colors: {
    // Define your color scheme here
    primary: {
      50: "#e6fffa", // Teal 50
      100: "#b2f5ea", // Teal 100
      200: "#81e6d9", // Teal 200
      300: "#4fd1c5", // Teal 300
      400: "#38b2ac", // Teal 400
      500: "#319795", // Teal 500
      600: "#2c7a7b", // Teal 600
      700: "#285e61", // Teal 700
      800: "#234e52", // Teal 800
      900: "#1d4044", // Teal 900
    },
    // ... other colors
  },
});

export default theme;
