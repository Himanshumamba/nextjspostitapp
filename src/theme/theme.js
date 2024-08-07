// src/theme/theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#e5f5f9',
      100: '#b3e0e6',
      200: '#80c9d3',
      300: '#4db2bf',
      400: '#1a9ab4',
      500: '#007f91',
      600: '#006e82',
      700: '#005d6b',
      800: '#004c54',
      900: '#003b3d',
    },
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'md',
        fontWeight: 'bold',
      },
      sizes: {
        md: {
          fontSize: 'md',
          px: 4,
          py: 2,
        },
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
          },
        },
      },
    },
    Input: {
      baseStyle: {
        borderRadius: 'md',
      },
    },
    Textarea: {
      baseStyle: {
        borderRadius: 'md',
      },
    },
  },
  fontSizes: {
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
});

export default theme;
