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
import AddGeoLocation from "containers/Admin/AddGeoLocation";
import AddMenuItems from "containers/Admin/AddMenuItems";
import CreateUser from "containers/Authentication/CreateUser";

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
      { path: "invoice", element: <Billings /> },
      { path: "create-dish", element: <CreateDish /> },
      { path: "create-restaurant", element: <CreateRestaurant /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "restaurant/:restaurant_id", element: <RestaurantDetails /> },
      { path: "order-details", element: <OrderDetails /> },
      { path: "order", element: <Orders /> },
      {
        path: "restaurant/:restaurant_id/add-geo-location",
        element: <AddGeoLocation />,
      },
      {
        path: "restaurant/:restaurant_id/add-menu-item",
        element: <AddMenuItems />,
      },
      { path: "restaurant", element: <Restaurants /> },
      { path: "restaurant-setting", element: <RestaurantSetting /> },
      { path: "update-dish", element: <UpdateDish /> },
      {
        path: "restaurant/:restaurant_id/update-restaurant",
        element: <UpdateRestaurant />,
      },
      { path: "create-user", element: <CreateUser /> },
    ],
  },
]);

export default router;
