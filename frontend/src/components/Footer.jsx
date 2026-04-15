import { Box, Container, Grid, GridItem, Text } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

const Footer = () => {
  return (
    <Box bg={useColorModeValue("gray.200", "gray.800")} mt={10} py={6}>
      <Container maxW="container.xl">
        
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          
          {/* About Us */}
          <GridItem>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              About Us
            </Text>
            <Text fontSize="sm" color="gray.600">
              <b>PrimeCart</b> is a online product store providing high-quality items with
              great user experience. You will have a seamless shopping experience with <b>PrimeCart</b>.
            </Text>
          </GridItem>

          {/* Quick Links */}
          <GridItem>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Quick Links
            </Text>
            <Text fontSize="sm" color="gray.600">Home</Text>
            <Text fontSize="sm" color="gray.600">Login</Text>
            <Text fontSize="sm" color="gray.600">Register</Text>
          </GridItem>

          {/* Store Address */}
          <GridItem>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Store Address
            </Text>
            <Text fontSize="sm" color="gray.600">
              123 Demo Street<br />
              Islamabad, Pakistan<br />
              Phone: +92 300 1234567<br />
              Email: info@store.com
            </Text>
          </GridItem>

        </Grid>

        {/* Bottom line */}
        <Text textAlign="center" fontSize="sm" mt={6} color="gray.500">
          © 2026 <b>PrimeCart</b>. All rights reserved.
        </Text>

      </Container>
    </Box>
  );
};

export default Footer;