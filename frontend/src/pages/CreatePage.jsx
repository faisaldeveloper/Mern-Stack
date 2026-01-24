import React from 'react'
import { useState } from 'react';
import { Box, Container, Heading, VStack, Input, Button } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"
import  {useProductStore}  from "@/store/product";


const CreatePage = () => {

  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,    
    image: ""
  });

  const {addProduct} = useProductStore();

  const handleNewProduct = async() => {
    // Logic to handle new product creation
   //console.log("New Product Created:", newProduct);
    const {success, message} = await addProduct(newProduct);
    if(success){      
      console.log("msg:", message);
    }else{
      console.log("Product Creation Failed::: ", message);
    }
    // Reset form
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      image: ""
    });
  }


  return (
    <Container maxW="container.md" py={4}>
      <VStack spacing={8} >

      <Heading as={"h1"} size={"2xl"} textAlign="center" mb={8}>Create New Product</Heading>
      <h1>Create New Product</h1>
      <Box w={"full"} p={6} borderWidth={1} bg={useColorModeValue("white", "gray.800")} borderRadius="md" boxShadow="md">

        <VStack spacing={4}>
          <Input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <Input
            type="text"
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />
          <Input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <Input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          />

          <Button colorScheme="blue" width="sm" mt={4} onClick={handleNewProduct}>Create Product</Button>

        </VStack>
      </Box>      
      </VStack>
    </Container>
  )
}

export default CreatePage