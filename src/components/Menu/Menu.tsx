import classNames from "classnames";
import React from "react";
import { PropsWithChildren } from "react";
import { createContext, useState } from "react";
import { MenuItemProps } from "./MenuItem";

type SelectedCallback = (selectedIndex: number) => void;
type MenuMode = "horizontal" | "vertical";
export type MenuProps = {
  defaultIndex?: number;
  mode?: MenuMode;
  style?: React.CSSProperties;
  className?: string;
  onSelect?: SelectedCallback;
};
type MenuContextProps = {
  index: number;
  onSelect?: SelectedCallback;
};

export const MenuContext = createContext<MenuContextProps>({ index: 0 });

const Menu: React.FunctionComponent<PropsWithChildren<MenuProps>> = (pros) => {
  const {
    defaultIndex = 0,
    mode = "horizontal",
    style,
    className,
    onSelect,
    children,
  } = pros;

  const [currentActive, setActive] = useState(defaultIndex);

  const classnames = classNames("menu", className, {
    "menu-vertical": mode === "vertical",
  });

  const handleSelected = (index: number) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  const passContext: MenuContextProps = {
    index: currentActive,
    onSelect: handleSelected,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;

      if (childElement.type.displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          index,
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
