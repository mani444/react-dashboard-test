import { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import "./products.scss";
import { products as initialProducts } from "../../data";
import DataTable from "../../components/dataTable/DataTable";

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

export const Products = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const handleDelete = (id: number) => {
    // Show confirmation dialog
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id),
      );
      console.log(`Product with ID ${id} has been deleted!`);
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "img",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
        return <img src={params.row.img || "/noavatar.png"} alt="" />;
      },
    },
    {
      field: "title",
      type: "string",
      headerName: "Title",
      width: 250,
    },
    {
      field: "color",
      type: "string",
      headerName: "Color",
      width: 150,
    },
    {
      field: "price",
      type: "string",
      headerName: "Price",
      width: 200,
    },
    {
      field: "producer",
      headerName: "Producer",
      type: "string",
      width: 200,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      width: 200,
      type: "string",
    },
    {
      field: "inStock",
      headerName: "In Stock",
      width: 150,
      type: "boolean",
    },
  ];

  return (
    <div className="products">
      <div className="info">
        <h1>Users</h1>
        <button>Add New User</button>
      </div>
      <DataTable
        slug="products"
        columns={columns}
        rows={products}
        onDelete={handleDelete}
      />
    </div>
  );
};
