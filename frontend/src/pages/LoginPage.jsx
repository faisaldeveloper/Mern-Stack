import { useState } from "react";
import  {useUserStore}  from "@/store/user";
import { Box, Container, Heading, VStack, Input, Button } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const loginUser = useUserStore((state) => state.loginUser);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const handleLoginFormSubmit = async (e) => {
     e.preventDefault();
     setError("");

     const data = await loginUser(formData);

     if (!data.success) {
       setError(data.message);
       return;
     }

     //localStorage.setItem("token", data.token);
     //alert("Login successful!");
     loginUser(data.user, data.token);
     navigate("/");
  };

  return (
    <Container maxW="container.sm" py={4}>
      <VStack spacing={8} >

      <Heading as={"h1"} size={"2xl"} textAlign="center" mb={8}>User Login</Heading>           
            <Box w={"full"} p={6} borderWidth={1} bg={useColorModeValue("white", "gray.800")} borderRadius="md" boxShadow="md">      

      {error && <p style={{ color: "red" }}>{error}</p>}

        <VStack spacing={2}>
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />       

        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
     
         <Button colorScheme="blue" width="sm" mt={4} onClick={handleLoginFormSubmit}>Login</Button>    
      </VStack>
    </Box>      
          </VStack>
        </Container>
  );
};

export default LoginPage;
