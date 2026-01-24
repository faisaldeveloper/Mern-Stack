import { Box, Text, Heading, Image } from '@chakra-ui/react'
import React from 'react'

const ProductCard = ({product}) => {
    //alert("product card rendered");
  return (
    <Box borderWidth="1px" spacing={7} borderRadius="lg" mx={2} overflow="hidden" p={4} boxShadow="md" bg="white">
        <Image src={product.image} alt={product.name} w='full' h={48} objectFit='cover' />
            <Box p="6">
              <Box d="flex" alignItems="baseline">
                <Heading fontWeight="bold" fontSize="xl" mb={2}>{product.name}</Heading>
              </Box>
              <Text mb={2}>{product.description}</Text>
              <Text fontSize="lg" color="teal.600" fontWeight="bold">${product.price}</Text>
            </Box>
    </Box>
  )
}

export default ProductCard