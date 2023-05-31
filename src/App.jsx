import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
//PageLayout
import HomePageLayout from "./pages/HomePageLayout/HomePageLayout";
//Pages
import GamePage from "./pages/GamePage/GamePage";
import InfoPage from "./pages/InfoPage/InfoPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePageLayout />,
    children: [
      { path: "/", element: <InfoPage /> },
      {
        path: "/game",
        element: <GamePage />,
      },
    ],
  },
]);
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
