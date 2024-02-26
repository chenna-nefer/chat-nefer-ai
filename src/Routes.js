import React, { useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  redirect,
  useLocation,
} from "react-router-dom";
import {
  Skeleton,
  Stack,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import LandingPage from "./LandingPage.js";
import ChatPage from "./Chat.js";
import Apikeys from "./components/apikeys.js";
// import Loader from "shareComponent/Loader";
// import ProtectedRoutes from "routes/ProtectedRoutes"; //Authenticated routes
// import PublicRoute from "routes/PublicRoute";
// import PrivateRoute from "routes/PrivateRoute";
// import LoginPage from "./Auth/SignIn.js";
// import VerifyEmail from "./Auth/VerifyEmail";
// import UserProfileEdit from "./profile";
// import Apikeys from "./components/Apikeys";
// import Landing from "./components/Landing";
// import ForgotPassword from "./Auth/ForgotPassword";
// import PrivacyPolicy from "./components/PrivacyPolicy";

// const SidebarWithHeader = lazy(() => import("./components/SideNavBar"));
const LoginPage = lazy(() => import("./Auth/SignIn.js"));
const Register = lazy(() => import("./Auth/SignUp.js"));
// const ForgotPassword = lazy(() => import("components/ForgotPassword"));
// const NoFoundComponent = lazy(() => import("components/NoFoundComponent"));
export const isLogin = () => {
  if (localStorage.getItem("TOKEN_KEY")) {
    return true;
  }

  return false;
};
const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("token") !== null;
  const isApiKeysProvided = localStorage.getItem("keys") !== null;

  if (isAuthenticated && isApiKeysProvided) {
    return children;
  } else if (
    isAuthenticated &&
    !isApiKeysProvided &&
    location.pathname !== "/providekeys"
  ) {
    return <Navigate to="/providekeys" replace />;
  } else if (
    isAuthenticated &&
    !isApiKeysProvided &&
    location.pathname == "/providekeys"
  ) {
    // return <Apikeys />;
  } else if (!isAuthenticated && location.pathname !== "/signin") {
    return <Navigate to="/signin" replace />;
  }
};

// const PublicRoute = ({ component: Element, restricted, ...rest }) => {
const PublicRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("token") !== null;
  const isApiKeysProvided = localStorage.getItem("keys") !== null;
  console.log("PublicRoute: ", location.pathname);
  if (isAuthenticated && isApiKeysProvided) {
    return <Navigate to="/dashboard" replace />;
  } else if (
    isAuthenticated &&
    !isApiKeysProvided &&
    location.pathname !== "/providekeys"
  ) {
    return <Navigate to="/providekeys" replace />;
  } else {
    return children;
  }
};

let token = localStorage.getItem("token");

const App = () => {
  useEffect(() => {
    console.log("Routes App");
    // return () => {};
  }, []);

  // const isAuthenticated = true;

  return (
    <Router>
      <Suspense
        fallback={
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        }
      >
        <Routes>
          <Route
            path="/signin"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />

          <Route
            path="/providekeys"
            element={
              <PublicRoute>
                <Apikeys />
              </PublicRoute>
            }
          />

          <Route
            path="/chat"
            element={
              <PublicRoute>
                <ChatPage />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            }
          />
          {/* <Route
            path="/profile"
            element={
              <PrivateRoute>
                <UserProfileEdit />
              </PrivateRoute>
            }
          /> */}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
