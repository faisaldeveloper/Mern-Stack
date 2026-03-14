import { Box, Text, Heading, Image } from '@chakra-ui/react'
import { Spacer, IconButton, HStack, VStack, Input } from '@chakra-ui/react'
import { LuPencil, LuTrash2 } from "react-icons/lu";
import React from 'react'
import { useState } from 'react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { useProductStore}  from "@/store/product";
import { Button, Dialog, Portal } from "@chakra-ui/react"
import  {useUserStore}  from "@/store/user";


const ProductCard = ({product}) => {
    //alert("product card rendered");
    const bgColor = useColorModeValue("white", "gray.800"); 

     const { user, isAuthenticated } = useUserStore();
     const [error, setError] = useState("");
     const [success, setSuccess] = useState("");

    const {updateProduct, deleteProduct} = useProductStore();
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const handleUpdatedProduct = async () => {
        const {success, message} = await updateProduct(product._id, updatedProduct);
        if(success){
            setSuccess(message);
            setError("");
            console.log("msg:", message);
        }else{
            setError(message);
            setSuccess("");
            console.log("Product Update Failed::: ", message);
        }
    }

    //const { deleteProduct} = useProductStore();
    const handleDeleteProduct = async () => {

      if (confirm("Are you sure you want to proceed?")) {        
      // Logic to handle product deletion
       const {success, message} = await deleteProduct(product._id);
         if(success){
             console.log("msg:", message);       
         }else{
             console.log("Product Deletion Failed::: ", message);
         }      
      }
    }

  return (
    <Box borderWidth="1px" spacing={7} transition="all 0.3s" overflow="hidden" borderRadius="lg" mx={2} p={4} boxShadow="md" bg={bgColor} _hover={{ transform: "transformY(-15px)", shadow: "xl" }}>
        <Image src={product.image} alt={product.name} w='full' h={48} objectFit='cover' />
            <Box p="6">
              <Box d="flex" alignItems="baseline">
                <Heading fontWeight="bold" fontSize="xl" mb={2}>{product.name}</Heading>
              </Box>
              <Text mb={2}>{product.description}</Text>          

            <HStack spacing={2} mt={4} d="flex">     
                <Text fontSize="lg" color="teal.600" fontWeight="bold">${product.price}</Text>
                <Spacer />
                <Dialog.Root size="md" motionPreset="slide-in-bottom">
  {/* The Trigger makes the button open the dialog automatically */}
  <Dialog.Trigger asChild>
{isAuthenticated && ( 
    <IconButton aria-label="Edit Product" variant="outline" colorScheme="blue" size="sm" >
                    <LuPencil />
                </IconButton> 
  )}
  </Dialog.Trigger>
  <Portal>
    <Dialog.Backdrop />
    <Dialog.Positioner>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Edit Product</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          
<Box w={"full"} p={6} borderWidth={1} bg={useColorModeValue("white", "gray.800")} borderRadius="md" boxShadow="md">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <VStack spacing={4}>
          <Input
            type="text"
            name="name"
            placeholder="Product Name"
            value={updatedProduct.name}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
          />
          <Input
            type="text"
            name="description"
            placeholder="Description"
            value={updatedProduct.description}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
          />
          <Input
            type="number"
            name="price"
            placeholder="Price"
            value={updatedProduct.price}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
          />
          <Input
            type="text"
            name="image"
            placeholder="Image URL"
            value={updatedProduct.image}
            onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
          />
          
        </VStack>
      </Box>      


        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.ActionTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </Dialog.ActionTrigger>
          <Button colorScheme="blue" mt={1} onClick={handleUpdatedProduct}>Update Product</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Positioner>
  </Portal>
</Dialog.Root>
                {isAuthenticated && (                
                <IconButton aria-label="Delete Product" variant="outline" colorScheme="red" size="sm" onClick={handleDeleteProduct}> 
                    <LuTrash2 />
                </IconButton>     
                )}
            </HStack>
            </Box>          
            
    </Box>
  )
}

export default ProductCard