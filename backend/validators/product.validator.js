import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Product Name must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters").max(200, "Description must be at most 200 characters"),
  price: z.coerce.number().positive("Price must be a positive number"),
  image: z.string().url("Please provide a valid image URL").min(8, "Image is required"),
  //stock: z.number().min(0, "Stock must be a non-negative number"),
});
