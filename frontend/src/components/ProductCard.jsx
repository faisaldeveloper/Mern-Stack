import { Box, Text, Heading, Image } from '@chakra-ui/react'
import { Spacer, IconButton, HStack } from '@chakra-ui/react'
import { LuPencil, LuTrash2 } from "react-icons/lu";
import React from 'react'
import { useColorModeValue } from '@/components/ui/color-mode';
import  {useProductStore}  from "@/store/product";

const ProductCard = ({product}) => {
    //alert("product card rendered");
    const bgColor = useColorModeValue("white", "gray.800");

    const { deleteProduct} = useProductStore();
    const handleDeleteProduct = async () => {
        
      // Logic to handle product deletion
       const {success, message} = await deleteProduct(product._id);
         if(success){
             console.log("msg:", message);       
         }else{
             console.log("Product Deletion Failed::: ", message);
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
                <IconButton aria-label="Edit Product" variant="outline" colorScheme="blue" size="sm">
                    <LuPencil />
                </IconButton>                
                <IconButton aria-label="Delete Product" variant="outline" colorScheme="red" size="sm" onClick={handleDeleteProduct}> 
                    <LuTrash2 />
                </IconButton>     
            </HStack>
            </Box>
    </Box>
  )
}

export default ProductCard