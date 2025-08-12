import React, { createContext, useContext, useState, ReactNode } from "react";
import { products as initialProducts } from "../data";

export interface Product {
  id: number;
  img: string;
  title: string;
  color: string;
  price: string;
  producer: string;
  createdAt: string;
  inStock?: boolean;
}

interface ProductContextType {
  products: Product[];
  updateProduct: (updatedProduct: Product) => void;
  deleteProduct: (id: number) => void;
  getProduct: (id: number) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const updateProduct = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      ),
    );
  };

  const deleteProduct = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id),
      );
      console.log(`Product with ID ${id} has been deleted!`);
    }
  };

  const getProduct = (id: number) => {
    return products.find((product) => product.id === id);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        updateProduct,
        deleteProduct,
        getProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
