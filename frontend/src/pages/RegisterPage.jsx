import { useState } from "react";
import  {useUserStore}  from "@/store/user";
import { Box, Container, Heading, VStack, Input, Button } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const registerUser = useUserStore((state) => state.registerUser);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

     const data = await registerUser(formData);

     if (!data.success) {
       setError(data.message);
       return;
     }

     localStorage.setItem("token", data.token);
     setSuccess("Registration successful!");
  };

  return (
    <Container maxW="container.sm" py={4}>
      <VStack spacing={8} w="600px" mx="auto" mb={10} >

      <Heading as={"h1"} size={"2xl"} textAlign="center" mb={8}>Register</Heading>           
            <Box w={"full"} p={6} borderWidth={1} bg={useColorModeValue("white", "gray.800")} borderRadius="md" boxShadow="md">      


      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

       <VStack spacing={2}>
        <Input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />
       
        <Input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        
        <Input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        
        <Button colorScheme="blue" width="sm" mt={4} onClick={handleSubmit}>Register</Button>
      </VStack>
     </Box>      
          </VStack>
        </Container>
  );
};

export default RegisterPage;
