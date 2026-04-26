import { Box, Text, Heading, Image } from '@chakra-ui/react'
import { Spacer, IconButton, HStack, VStack, Input, Textarea } from '@chakra-ui/react'
import { LuPencil, LuTrash2, LuEye, LuX } from "react-icons/lu";
import React from 'react'
import { useState } from 'react';
import { useColorModeValue } from '@/components/ui/color-mode';
import { useProductStore}  from "@/store/product";
import { Button, Dialog, Portal } from "@chakra-ui/react"
import  {useUserStore}  from "@/store/user";
import { toaster } from "@/components/ui/toaster"


const ProductCard = ({product, showActions = false}) => {
      // State for view dialog
      const [isViewOpen, setIsViewOpen] = useState(false);
      const openViewDialog = () => setIsViewOpen(true);
      const closeViewDialog = () => setIsViewOpen(false);
    //alert("product card rendered");
    const bgColor = useColorModeValue("white", "gray.800"); 

     const { user, isAuthenticated } = useUserStore();
     const [error, setError] = useState(""); // Used for validation/error messages

    const {updateProduct, deleteProduct} = useProductStore();
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const handleUpdatedProduct = async () => {
        const {success, message} = await updateProduct(product._id, updatedProduct);

        if(success){
            toaster.create({
              title: "Success",
              description: message,
              type: "success",
            });
            setError("");
        }else{
            setError(message);
            console.log("Product Update Failed::: ", message);
        }
    }

    //const { deleteProduct} = useProductStore();
    const handleDeleteProduct = async () => {

      if (confirm("Do you want to delete this product?")) {        
      // Logic to handle product deletion
       const {success, message} = await deleteProduct(product._id);
         toaster.create({
           title: success ? "Deleted" : "Error",
           description: message,
           type: success ? "success" : "error",
         });
         if(success){
             console.log("msg:", message);       
         }else{
             console.log("Product Deletion Failed::: ", message);
         }      
      }
    }

  return (
    <Box borderWidth="1px" spacing={7} mt={15} transition="all 0.3s" overflow="hidden" borderRadius="lg" mx={2} p={4} boxShadow="md" bg={bgColor} _hover={{ transform: "translateY(-5px) scale(1.02)", shadow: "xl", borderColor: "teal.300" }}>
        <Image src={product.image} alt={product.name} w='full' h={48} objectFit='cover' />
            <Box p="6">
              <Box d="flex" alignItems="baseline">
                <Heading
                  as="button"
                  fontWeight="bold"
                  fontSize="xl"
                  mb={2}
                  cursor="pointer"
                  _hover={{ textDecoration: 'underline', color: 'blue.500' }}
                  onClick={openViewDialog}
                >
                  {product.name}
                </Heading>
              </Box>
              <Text mb={2} noOfLines={2}>{product.description?.slice(0, 40)}{product.description?.length > 40 ? '...' : ''}</Text>          

            <HStack spacing={2} mt={4} d="flex">     
                <Text fontSize="lg" color="blue.500" fontWeight="bold">${product.price}</Text>
                <Spacer />
                {/* View Product Dialog */}
                <Dialog.Root open={isViewOpen} onOpenChange={setIsViewOpen}>
                  <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                      <Dialog.Content>
                        <Dialog.Header pb="0">
                          <Dialog.Title fontSize="xl">{product.name}</Dialog.Title>
                        </Dialog.Header>
                        {/* X button to close */}
                        <IconButton
                          aria-label="Close"
                          size="sm"
                          icon={<span style={{fontWeight:'bold'}}>×</span>}
                          onClick={closeViewDialog}
                          position="absolute"
                          top="8px"
                          right="8px"
                          variant="ghost"
                        ><LuX /> </IconButton>
                        <Dialog.Body>
                          <Box w={"full"} p={4}>
                            <Image src={product.image} alt={product.name} w='full' h={48} objectFit='cover' mb={3} />
                            <Heading fontSize="xl" mb={2} fontWeight="bold" color="blue.500">Details</Heading>
                            <Text mb={2} whiteSpace="pre-wrap">{product.description}</Text>
                            <Text fontWeight="bold" color="blue.500">Price: ${product.price}</Text>
                          </Box>
                        </Dialog.Body>
                      </Dialog.Content>
                    </Dialog.Positioner>
                  </Portal>
                </Dialog.Root>

                {/* Existing Edit Dialog (unchanged) */}
                <Dialog.Root size="md" motionPreset="slide-in-bottom">
                  <Dialog.Trigger asChild>
                    {showActions && isAuthenticated && (
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
                          <Dialog.Title color="blue.500">Edit Product</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                          <Box w={"full"} p={6} borderWidth={1} bg={useColorModeValue("white", "gray.800")} borderRadius="md" boxShadow="md">
                            {error && <Text color="red.500" mb={4} fontSize="sm" fontWeight="medium">{error}</Text>}
                            <VStack spacing={4}>
                              <Input
                                type="text"
                                name="name"
                                placeholder="Product Name"
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                              />
                              <Textarea
                                name="description"
                                placeholder="Description"
                                value={updatedProduct.description}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
                                rows={4}
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
                {showActions && isAuthenticated && (                
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