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

}));

