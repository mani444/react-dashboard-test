import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  FormControlLabel,
  Switch,
  Grid,
  Alert,
  Snackbar,
} from "@mui/material";
import { useProducts, Product } from "../../context/productContext";
import "./editProduct.scss";

export const EditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProduct, updateProduct } = useProducts();
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [product, setProduct] = useState<Product>({
    id: 0,
    img: "",
    title: "",
    color: "",
    price: "",
    producer: "",
    createdAt: "",
    inStock: false,
  });

  useEffect(() => {
    // Get product data from context
    const foundProduct = getProduct(parseInt(id || "0"));
    if (foundProduct) {
      setProduct(foundProduct);
    }
    setLoading(false);
  }, [id, getProduct]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Update the product using context
    updateProduct(product);

    // Show success message
    setShowSuccess(true);
    console.log("Product updated:", product);

    // Navigate back to products page after showing success message
    setTimeout(() => {
      navigate("/products");
    }, 1500);
  };

  const handleCancel = () => {
    navigate("/products");
  };

  if (loading) {
    return (
      <div className="edit-product">
        <Typography>Loading...</Typography>
      </div>
    );
  }

  if (!product.id) {
    return (
      <div className="edit-product">
        <Alert severity="error">Product not found!</Alert>
        <Button onClick={handleCancel} sx={{ mt: 2 }}>
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="edit-product">
      <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Product
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Product Title"
                name="title"
                value={product.title}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Producer"
                name="producer"
                value={product.producer}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Color"
                name="color"
                value={product.color}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                value={product.price}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL"
                name="img"
                value={product.img}
                onChange={handleInputChange}
                variant="outlined"
                helperText="Enter a valid image URL"
              />
            </Grid>

            {product.img && (
              <Grid item xs={12}>
                <Box sx={{ textAlign: "center", mb: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Image Preview:
                  </Typography>
                  <img
                    src={product.img}
                    alt="Product preview"
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                      objectFit: "contain",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/noavatar.png";
                    }}
                  />
                </Box>
              </Grid>
            )}

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={product.inStock}
                    onChange={handleInputChange}
                    name="inStock"
                    color="primary"
                  />
                }
                label="In Stock"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Created At"
                name="createdAt"
                value={product.createdAt}
                onChange={handleInputChange}
                variant="outlined"
                disabled
                helperText="Creation date cannot be modified"
              />
            </Grid>
          </Grid>

          <Box
            sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "flex-end" }}
          >
            <Button
              type="button"
              variant="outlined"
              onClick={handleCancel}
              size="large"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Update Product
            </Button>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={showSuccess}
        autoHideDuration={1500}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Product updated successfully!
        </Alert>
      </Snackbar>
    </div>
  );
};
