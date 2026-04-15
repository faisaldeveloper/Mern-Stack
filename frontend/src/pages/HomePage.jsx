import { Container, Flex, Box, Text, SimpleGrid, Button, HStack } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { Link as RouterLink } from "react-router-dom";
import  {useProductStore}  from "@/store/product";
import ProductCard from '@/components/ProductCard';

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const pageCount = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);
  const startNumber = products.length === 0 ? 0 : startIndex + 1;
  const endNumber = Math.min(startIndex + itemsPerPage, products.length);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Container maxW={Container.xl} py={0}>
      <Flex align="center" justify="space-between" px="15px">
        {/* Left: Title */}
        <Text
          fontSize="25px"
          fontWeight="bold"
          color="blue.500"
        >
          Products
        </Text>

        {/* Right: Pagination */}
        {products.length > 0 && (
          <Text fontSize="14px" fontWeight="bold" color="gray.600" mt="10px" px="15px">
            Showing {startNumber}–{endNumber} of {products.length}
          </Text>
        )}
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} mb={4}>
        {currentProducts.length > 0 && currentProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </SimpleGrid>

      {products.length === 0 && (
        <Text fontSize={15} fontWeight={"bold"} mb={4} textAlign={"center"}>
          No Products Found.
          <RouterLink to={"/create"}> <Text as="span" color="teal.500" ml={2}> Add New Product </Text></RouterLink>
        </Text>
      )}

      {products.length > itemsPerPage && (
        <HStack justify="center" spacing={2} mt={4}>
          <Button
            size="sm"
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            isDisabled={currentPage === 1}
          >
            Previous
          </Button>

          {Array.from({ length: pageCount }, (_, index) => (
            <Button
              key={index}
              size="sm"
              onClick={() => handlePageChange(index + 1)}
              colorScheme={currentPage === index + 1 ? 'blue' : 'gray'}
            >
              {index + 1}
            </Button>
          ))}

          <Button
            size="sm"
            onClick={() => handlePageChange(Math.min(pageCount, currentPage + 1))}
            isDisabled={currentPage === pageCount}
          >
            Next
          </Button>
        </HStack>
      )}
    </Container>
  )
}

export default HomePage