import React, { PropsWithChildren, useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";

type SubMenuProps = {
  index?: number;
  title: string;
  className?: string;
};

const SubMenu: React.FC<PropsWithChildren<SubMenuProps>> = (props) => {
  const { index, title, className, children } = props;
  const context = useContext(MenuContext);

  const classnames = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
  });

  const renderChildren = () => {
    const childrenComponent = React.Children.map(
      children,
      (child, childIndex) => {
        const childElement =
          child as React.FunctionComponentElement<SubMenuProps>;
        const { displayName } = childElement.type;
        if (displayName === "MenuItem") {
          return React.cloneElement(childElement, {
            index: childIndex,
          });
        } else {
          console.error(
            "Warning: SubMenu has a child which is not a MenuItem component"
          );
        }
      }
    );
    return <ul className="menu-submenu">{childrenComponent}</ul>;
  };

  return (
    <li key={index} className={classnames}>
      <div className="submenu-title">{title}</div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";

export { SubMenu };
