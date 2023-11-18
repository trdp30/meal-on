import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import MenuList from "./Restaurant";
import AdminLayout from "./components/AdminLayout";
import Billings from "./containers/Admin/Billings";
import CreateDish from "./containers/Admin/CreateDish";
import CreateRestaurant from "./containers/Admin/CreateRestaurant";
import Dashboard from "./containers/Admin/Dashboard";
import OrderDetails from "./containers/Admin/OrderDetails";
import Orders from "./containers/Admin/Orders";
import RestaurantDetails from "./containers/Admin/RestaurantDetails";
import Restaurants from "./containers/Admin/Restaurants";
import RestaurantSetting from "./containers/Admin/RestaurantSetting";
import UpdateDish from "./containers/Admin/UpdateDish";
import UpdateRestaurant from "./containers/Admin/UpdateRestaurant";
import Login from "./containers/Login";
import Register from "./containers/Register";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Logout from "./containers/Authentication/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: (
      <AuthenticatedRoute>
        <Logout />
      </AuthenticatedRoute>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/restaurant",
    element: <MenuList />,
  },
  {
    path: "/admin",
    element: (
      <AuthenticatedRoute>
        <AdminLayout />
      </AuthenticatedRoute>
    ),
    children: [
      { path: "billings", element: <Billings /> },
      { path: "create-dish", element: <CreateDish /> },
      { path: "create-restaurant", element: <CreateRestaurant /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "order-details", element: <OrderDetails /> },
      { path: "orders", element: <Orders /> },
      { path: "restaurant/:restaurant_id", element: <RestaurantDetails /> },
      { path: "restaurants", element: <Restaurants /> },
      { path: "restaurant-setting", element: <RestaurantSetting /> },
      { path: "update-dish", element: <UpdateDish /> },
      { path: "update-restaurant", element: <UpdateRestaurant /> },
    ],
  },
]);

export default router;
