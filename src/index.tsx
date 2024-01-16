import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import { Button, ButtonSize, ButtonType } from "./components/Button/Button";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <div
      style={{
        backgroundColor: "#c1f1f1",
      }}
    >
      <Button disabled>Hello</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
        Hello
      </Button>
      <Button btnType={ButtonType.Link} href="www.baidu.com" disabled>
        Baidu
      </Button>
    </div>
  </React.StrictMode>
);
