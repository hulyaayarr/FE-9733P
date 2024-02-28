import ReactDOM from "react-dom/client";
import HomePage from "./pages/HomePage.tsx";
import Users from "./pages/Users.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { loader as UsersLoader } from "./pages/Users.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import UserIdPage from "./pages/UserIdPage.tsx";
import { UserPostPage } from "./pages/UserPostPage.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },

  {
    path: "/users",
    loader: UsersLoader,
    element: <Users />,
  },
  {
    path: "/users/:userId",
    element: <UserIdPage />,
  },
  {
    path: "/users/:userId/posts/:postId",
    element: <UserPostPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
