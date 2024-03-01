import ReactDOM from "react-dom/client";
import AllUsersPage from "./pages/AllUsersPage.tsx";
import UserPage from "./pages/UserPage.tsx";
import { UserAlbumPage } from "./pages/UserAlbumPage.tsx";

import { loader as UsersLoader } from "./pages/AllUsersPage.tsx";
import { loader as albumLoader } from "./pages/UserAlbumPage.tsx";
import { UserPostPage, loader as postLoader } from "./pages/UserPostPage.tsx";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import FavoritesPage from "./pages/FavoritesPage.tsx";
import Root from "./root.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
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
      {
        path: "/favorites",
        element: <FavoritesPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
