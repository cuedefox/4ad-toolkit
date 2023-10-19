import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import PartyContainer from "../containers/PartyContainer";
import HomeContainer from "../containers/HomeContainer";
import TablesContainer from "../containers/TablesContainer";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <h1>Oops, parece que hubo un error</h1>,
        children: [
            {
                path: "/",
                element: <HomeContainer />
            },
            {
                path: "/party",
                element: <PartyContainer />
            },
            {
                path: "/tables",
                element: <TablesContainer />
            }
        ],
    },
]);

const Router = () => {
    return <RouterProvider router={router} />
};

export default Router;
