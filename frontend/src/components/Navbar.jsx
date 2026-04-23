import { Container, Flex, Text, Link, HStack, Button } from '@chakra-ui/react'
import { Link as RouterLink, useNavigate } from "react-router-dom";
import React from 'react'
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode"
import { IoMoon } from 'react-icons/io5'
import { LuSun } from 'react-icons/lu'
import { HiPlus, HiLogin, HiUserAdd } from 'react-icons/hi'; // Heroicons version
import  {useUserStore}  from "@/store/user";


const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const { user, logout, isAuthenticated } = useUserStore();
  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  

  return (
    <Container maxW={"container.xl"} px={6} py={2} boxShadow={useColorModeValue("md", "dark-lg")} mb={8} borderRadius={"md"}>
      <Flex h={16} alignItems="center" justifyContent={'space-between'} flexDir={{base:"column", sm:"row"}}>
        
      <Text
      fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
      >
		 <Link as={RouterLink} fontSize="xl" fontWeight="bold" color="blue.500" to={"/"} _hover={{ transform: 'scale(1.05)', color: 'blue.600' }}>PrimeCart 🛒</Link>
      	 
      </Text> 

      <HStack spacing={2} alignItems={"center"}>
					{!isAuthenticated && (
						<>
					<RouterLink to={"/login"}>
						<Button transition="all 0.2s" _hover={{ transform: 'scale(1.05)', bg: 'green.500' }}>
							<HiLogin fontSize={20} color="lightgreen" />
						</Button>
					</RouterLink>
					<RouterLink to={"/register"}>
						<Button transition="all 0.2s" _hover={{ transform: 'scale(1.05)', bg: 'cyan.500' }}>
							<HiUserAdd fontSize={20} color="cyan" />
						</Button>
					</RouterLink>
					</>
					)}					

					{/* If logged in */}
					{isAuthenticated && (
						<>
						<Text size="xl" fontWeight="bold" color="blue.500">
							Hello, {user?.name}
						</Text>
						
						<RouterLink to={"/create"}>
							<Button size="sm" transition="all 0.2s" _hover={{ transform: 'scale(1.05)', bg: 'blue.400' }}>
								<HiPlus fontSize={14} color="yellow" /> Add New Product
							</Button>
						</RouterLink>					

						<RouterLink to={"/my-products"}>
							<Button size="sm" colorScheme="teal" transition="all 0.2s" _hover={{ transform: 'scale(1.05)', bg: 'blue.400' }}>
								My Products
							</Button>
						</RouterLink>

						<Button size="sm" colorScheme="red" onClick={handleLogout} transition="all 0.2s" _hover={{ transform: 'scale(1.05)', bg: 'blue.400' }}>
							Logout
						</Button>
						</>
					)}					

					<Button onClick={toggleColorMode} transition="all 0.2s" _hover={{ transform: 'scale(1.05)', bg: 'blue.400' }}>
						{colorMode === "light" ? <IoMoon /> : <LuSun size='20' />}
					</Button>
				</HStack>
      </Flex>
    </Container>
  )
}

export default Navbar