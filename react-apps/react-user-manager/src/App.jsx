import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import AppContext from "./context/AppContext";
import AuthContextProvider from "./context/AuthContext";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/home/HomePage";
import HomeDashboard from "./pages/home/HomeDashboard";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProductsPage from "./pages/products/ProductsPage";
import CreateUserPage from "./pages/users/CreateUserPage";
import UserDirectory from "./pages/users/UserDirectory";
import UserFormPage from "./pages/users/UserFormPage";
import UserProfile from "./pages/users/UserProfile";
import ProtectedPage from "./ProtectedPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        element:<ProtectedPage/>,
        children:[
          {
            path:"/",
            element: <HomePage />,
            children: [
              { index: true, element: <HomeDashboard /> },
              { path: "create", element: <UserFormPage /> },
              { path: "users", element: <UserDirectory /> },
              { path: "users/new", element: <UserFormPage /> },
              { path: "users/:userId", element: <UserProfile /> },
              { path: "users/:userId/edit", element: <UserFormPage /> },
              { path: "products", element: <ProductsPage /> },
            ],
          },
        ]
      },
    ],
  },
]);

function App() {
  return (
    <AppContext>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </AppContext>
  );
}

export default App;
