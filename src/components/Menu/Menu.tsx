import classNames from "classnames";
import React from "react";
import { PropsWithChildren } from "react";
import { createContext, useState } from "react";
import { MenuItemProps } from "./MenuItem";

type SelectedCallback = (selectedIndex: string) => void;
type MenuMode = "horizontal" | "vertical";

export type MenuProps = {
  defaultIndex?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  className?: string;
  onSelect?: SelectedCallback;
  defaultOpenSubMenus?: string[];
};

type MenuContextProps = {
  index: string;
  onSelect?: SelectedCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
};

export const MenuContext = createContext<MenuContextProps>({ index: "0" });

const Menu: React.FunctionComponent<PropsWithChildren<MenuProps>> = (pros) => {
  const {
    defaultIndex = "0",
    defaultOpenSubMenus,
    mode = "horizontal",
    style,
    className,
    onSelect,
    children,
  } = pros;

  const [currentActive, setActive] = useState(defaultIndex);

  const classnames = classNames("menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });

  const handleSelected = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  const passContext: MenuContextProps = {
    index: currentActive,
    onSelect: handleSelected,
    mode,
    defaultOpenSubMenus,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        return React.cloneElement(childElement, {
          index: index.toString(),
        });
      } else {
        console.warn(
          "Warning: Menu has a child which is not a MenuItem component"
        );
      }
    });
  };

  return (
    <ul style={style} className={classnames} data-testid="test-menu">
      <MenuContext.Provider value={passContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.displayName = "Menu";

export { Menu };
