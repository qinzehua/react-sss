import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import { Button, ButtonSize, ButtonType } from "./components/Button/Button";
import { Alert, AlertType } from "./components/Alert/Alert";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <div
      style={{
        padding: 25,
      }}
    >
      <h1>Button</h1>
      <hr />
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

      <h1>Alert</h1>
      <hr />
      <Alert
        message="Success Text"
        description="Detailed description and advice about successful copywriting."
        type={AlertType.Success}
      />
      <Alert message="Info Text" type={AlertType.Info} />
      <Alert message="Warning  Text" type={AlertType.Warning} />
      <Alert message="Danger  Text" type={AlertType.Danger} />
    </div>
  </React.StrictMode>
);
