import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

//PageLayout
import HomePageLayout from "./pages/HomePageLayout/HomePageLayout";
//Pages
import GamePage from "./pages/GamePage/GamePage";
import InfoPage from "./pages/InfoPage/InfoPage";
import InstructivePage from "./pages/InstructivePage/InstructivePage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageLayout />,
    children: [
      { path: "/", element: <InfoPage /> },
      { path: "/info", element: <InstructivePage /> },
      {
        path: "/game",
        element: <GamePage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
