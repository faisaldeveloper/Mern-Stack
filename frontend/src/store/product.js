import {create } from "zustand"

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  addProduct: async (newProduct) =>{
    if(!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.image){
        return {success: false, message: "Please complete all Product fields"}      
    }   

    try {

    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })

    const data = await response.json();  

    if (!response.ok) {
        return { success: false, message: data.message || "Server error" };
    }
    
    set((state) => ({ products: [...state.products, data.data ] }));
    return {success: true, message: "Product created successfully"};    
   } catch (error) {
      return { success: false, message: "Network error: " + error.message };
   }

    },
  //Fetch Products
  fetchProducts: async () => {
    try {
      const response = await fetch("/api/products")
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch products")
      }
      set({ products: data.data })
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  },

  //Delete Product
  deleteProduct: async (id) => {
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) {
        return {success : false, message: data.message || "Failed to delete product"};
        // throw new Error(data.message || "Failed to delete product");
      }
      set((state) => ({ products: state.products.filter((product) => product._id !== id) }));
      return {success : true, message: data.message || "Product deleted successfully"};
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }
}));