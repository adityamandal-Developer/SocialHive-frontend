import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/Users/Login";
import PublicNavbar from "./components/Navbar/NavbarPublic";
import PrivateNavbar from "./components/Navbar/NavbarPrivate";
import ProtectedRoute from "./components/AuthRoute/ProtectedRoute";
import PublicPosts from "./components/Posts/PublicPosts";
import AddPost from "./components/Posts/AddPost";
import PostDetails from "./components/Posts/PostDetails";
import PostLists from "./components/Posts/PostLists";
import UpdatePost from "./components/Posts/UpdatePost";
import PublicUserProfile from "./components/Users/PublicUserProfile";
import PrivateUserProfile from "./components/Users/PrivateUserProfile";
import UploadProfilePicture from "./components/Users/UploadProfilePicture";
import UploadCoverPicture from "./components/Users/UploadCoverPicture";
import AccountVerification from "./components/Users/AccountVerification";

export default function App() {
  const { userAuth } = useSelector((state) => state?.users);
  const isLogin = userAuth?.userInfo?.token;
  return (
    <BrowserRouter>
      {isLogin ? <PrivateNavbar /> : <PublicNavbar />}
      <Routes>
        <Route path="" element={<Homepage />}>
          {" "}
        </Route>

        <Route path="/login" element={<Login />}>
          {" "}
        </Route>

        <Route path="/public-posts" element={<PublicPosts />}>
          {" "}
        </Route>

        <Route
          path="/user-public-profile/:userId"
          element={
            <ProtectedRoute>
              <PublicUserProfile />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/add-post"
          element={
            <ProtectedRoute>
              <AddPost />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/posts/:postId"
          element={
            <ProtectedRoute>
              <PostDetails />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <PostLists />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/posts/:postId/update"
          element={
            <ProtectedRoute>
              <UpdatePost />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <PrivateUserProfile />
            </ProtectedRoute>
          }
        ></Route>

        {/* upload profile picture */}
        <Route
          path="upload-profile-image"
          element={
            <ProtectedRoute>
              <UploadProfilePicture />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="upload-cover-picture"
          element={
            <ProtectedRoute>
              <UploadCoverPicture />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="account-verification/:token"
          element={
            <ProtectedRoute>
              <AccountVerification />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
