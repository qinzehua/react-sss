import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import { Button, ButtonSize, ButtonType } from "./components/Button/Button";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <div>
      <Button>Hello</Button>
      <Button disabled>Disabled Button</Button>
      <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
        Large Primary
      </Button>
      <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
        Small Danger
      </Button>
      <Button btnType={ButtonType.Link} href="www">
        Baidu Link
      </Button>
      <Button btnType={ButtonType.Link} href="www" disabled>
        Disabled Link
      </Button>
    </div>
  </React.StrictMode>
);
