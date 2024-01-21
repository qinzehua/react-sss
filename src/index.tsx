import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import { Button, ButtonSize, ButtonType } from "./components/Button/Button";
import { Menu, MenuItem, SubMenu } from "./components/Menu";

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

      <h1>Menu</h1>
      <hr />
      <Menu defaultIndex={"1"} mode="vertical" defaultOpenSubMenus={["2"]}>
        <MenuItem>cool link</MenuItem>
        <MenuItem disabled>cool link 2</MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>dropdown 1</MenuItem>
          <MenuItem>dropdown 2</MenuItem>
        </SubMenu>
        <SubMenu title="dropdown2">
          <MenuItem>dropdown 1</MenuItem>
          <MenuItem>dropdown 2</MenuItem>
        </SubMenu>
        <MenuItem>cool link 3</MenuItem>
      </Menu>
    </div>
  </React.StrictMode>
);
