import { createRoot } from "react-dom/client";
import { Fragment } from "react";
import MainHeader from "./MainHeader";
import MainContent from "./MainContent";
import MainFooter from "./MainFooter";

createRoot(document.getElementById("root")).render(
  <>
    <RenderMain />
  </>
);

function RenderMain() {
  return (
    <Fragment>
      <MainHeader />
      <MainContent />
      <MainFooter />
    </Fragment>
  );
}


