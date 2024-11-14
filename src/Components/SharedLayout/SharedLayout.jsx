import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";

import css from "./SharedLayout.module.css";
import AppBar from "../AppBar/AppBar";

const SharedLayout = () => {
  return (
    <div className={css.container}>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <Toaster
        gutter={8}
        toastOptions={{
          duration: 4000,
          position: "top-center",
          style: {
            background: "#444444",
            color: "orange",
          },
        }}
      />
    </div>
  );
};

export default SharedLayout;
