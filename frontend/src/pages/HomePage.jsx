import { Container, Box, Text, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from "react-router-dom";
import  {useProductStore}  from "@/store/product";
import { useEffect } from 'react';
import ProductCard from '@/components/ProductCard';


const HomePage = () => {
  const { fetchProducts, products} = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  //console.log("products", products);


  return (
    <Container maxW={Container.xl} py={4}>
      <Box textAlign="center" spacing={6}>
        <Text fontSize={25} fontWeight={"bold"} mb={4} textAlign={"center"} color={"blue.500"}  >
          Product List</Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={1} mb={2}>
        {/* Product cards would go here */}
        {products.length > 0 && products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </SimpleGrid>
      
      <Text fontSize={15} fontWeight={"bold"} mb={4} textAlign={"center"}>
        No Products Found. 
        <RouterLink to={"/create"}> <Text color="teal.500" ml={2}> Add New Product </Text></RouterLink>
      </Text>
    </Container>
  )
}

export default HomePage