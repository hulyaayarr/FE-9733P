import ReactDOM from "react-dom/client";
import AllUsersPage from "./pages/AllUsersPage.tsx";
import UserPage from "./pages/UserPage.tsx";
import { UserAlbumPage } from "./pages/UserAlbumPage.tsx";

import { loader as UsersLoader } from "./pages/AllUsersPage.tsx";
import { loader as albumLoader } from "./pages/UserAlbumPage.tsx";
import { UserPostPage, loader as postLoader } from "./pages/UserPostPage.tsx";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([
  {
    path: "/",
    loader: UsersLoader,
    element: <AllUsersPage />,
  },

  {
    path: "/users/:userId",
    element: <UserPage />,
  },
  {
    path: "/users/:userId/posts/:postId",
    element: <UserPostPage />,
    loader: postLoader,
  },
  {
    path: "/users/:userId/albums/:albumId",
    loader: albumLoader,
    element: <UserAlbumPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
