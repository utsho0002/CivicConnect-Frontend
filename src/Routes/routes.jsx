import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "../Rootlayout/RootLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashBoardLAyout from "../DashBoardLayout/DashBoardLAyout";
import MainDashBoard from "../Components/DashBoard/DashboardHome";


import AddRequest from "../Components/DashBoard/AddRequest";
import AllUsers from "../Components/AllUsers/AllUsers";
import PrivateRoute from "../Provider/PrivateRoute";
import MyRequest from "../Components/DashBoard/MyRequest";
import Donate from "../Pages/Donate";
import PaymentSuccess from "../Pages/PaymentSuccess";
import Search from "../Pages/Search";
import EditRequest from "../Components/DashBoard/EditRequest";
import ViewDetails from "../Components/DashBoard/ViewDetails";
import AllRequests from "../Components/DashBoard/AllRequests";
import AllPendingRequest from "../Pages/AllPendingRequest";
import HealthTips from "../Pages/HealthTips";
import TermsOfService from "../Pages/TermsOfService";
import PrivacyPolicy from "../Pages/PrivacyPolicy";



const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children:[
        {
            path:"/",
            Component: Home
        },
        {
            path:'/login',
            Component: Login
        },
        {
            path:'/auth/register',
            Component: Register
        },
        {
            path:'/donate',
            element: <PrivateRoute>
              <Donate></Donate>
            </PrivateRoute>
        },
        {
            path:'/payment-success',
            Component: PaymentSuccess
        },
        {
            path:'/search',
            Component: Search
        },
        {
          path:'/all-request',
          Component: AllPendingRequest
        },
        {
          path:'/tips',
          Component: HealthTips
        },
        {
          path:'/terms',
          Component: TermsOfService
        },
        {
          path:'/privacy',
          Component: PrivacyPolicy
        }
        
    ]
  },
  {
    path:'dashboard',
    element: <PrivateRoute>
      <DashBoardLAyout></DashBoardLAyout>
    </PrivateRoute>,
    children:[
      {
        index:true,
        element: <MainDashBoard></MainDashBoard>
      },
      {
        path:'add-request',
        element: <AddRequest>
        </AddRequest>
      },
      {
        path:'my-request',
        element: <MyRequest></MyRequest>
      },
      {
        path:'all-request',
        element: <AllRequests></AllRequests>
      },
      {
        path:'all-users',
        element: <AllUsers></AllUsers>
      },
      {
        path:'edit-request/:id',
        element: <EditRequest></EditRequest>
      },
      {
        path:'view-details/:id',
        element: <ViewDetails></ViewDetails>
      }
      
    ]
  }
]);

export default router;
