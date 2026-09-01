import {create } from "zustand"

const API_URL = import.meta.env.MODE === "development" 
  ? "/api/products" 
  : "https://mern-stack-zjtm.onrender.com/api/products";

export const useProductStore = create((set) => ({
  products: [],
  userProducts: [],
  setProducts: (products) => set({ products }),
  setUserProducts: (userProducts) => set({ userProducts }),

  //Fetch Products
  fetchProducts: async () => {
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch products")
      }
      set({ products: data.data })
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  },

  //Fetch User Products
  fetchUserProducts: async () => {
    try {
      const response = await fetch("/api/products/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch user products")
      }
      set({ userProducts: data.data })
    } catch (error) {
      console.error("Error fetching user products:", error)
    }
  },

  //Add New Product
  addProduct: async (newProduct) =>{
    try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newProduct),
    })

    const data = await response.json();  

    if (!response.ok) {
        return { success: false, message: data.message || "Server error" };
    }
    
    set((state) => ({ 
      products: [...state.products, data.data],
      userProducts: [...state.userProducts, data.data]
    }));
    return {success: true, message: "Product created successfully"};    
   } catch (error) {
      return { success: false, message: "Network error: " + error.message };
   }

  },  

  //Update Product
  updateProduct: async (id, updatedProduct) => {
    try {      
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,

        },
        body: JSON.stringify(updatedProduct),
      }); 
      
      const data = await response.json();

      if (!response.ok) {
        return {success : false, message: data.message || "Failed to update product"};
      } 

      set((state) => ({
        products: state.products.map((product) =>
          product._id === id ? data.data : product
        ),
        userProducts: state.userProducts.map((product) =>
          product._id === id ? data.data : product
        ),
      }));
      return {success : true, message: data.message || "Product updated successfully"};
    } catch (error) {
      console.error("Error updating product:", error);
    }
  },

  //Delete Product
  deleteProduct: async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,

        },
      });
      const data = await response.json();
      if (!response.ok) {
        return {success : false, message: data.message || "Failed to delete product"};
        // throw new Error(data.message || "Failed to delete product");
      }
      set((state) => ({ 
        products: state.products.filter((product) => product._id !== id),
        userProducts: state.userProducts.filter((product) => product._id !== id)
      }));
      return {success : true, message: data.message || "Product deleted successfully"};
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }
}));
