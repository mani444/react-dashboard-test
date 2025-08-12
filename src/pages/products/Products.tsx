import { GridColDef } from "@mui/x-data-grid";
import "./products.scss";
import DataTable from "../../components/dataTable/DataTable";
import { useProducts } from "../../context/productContext";

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
  const { products, deleteProduct, updateProduct } = useProducts();

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
        <h1>Products</h1>
        <button>Add New Product</button>
      </div>
      <DataTable
        slug="products"
        columns={columns}
        rows={products}
        onDelete={deleteProduct}
        onUpdate={updateProduct}
      />
    </div>
  );
};
