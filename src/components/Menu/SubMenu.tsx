import React, { PropsWithChildren, useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";

type SubMenuProps = {
  index?: string;
  title: string;
  className?: string;
};

const SubMenu: React.FC<PropsWithChildren<SubMenuProps>> = (props) => {
  const { index, title, className, children } = props;
  const context = useContext(MenuContext);
  const isOpen =
    context.defaultOpenSubMenus?.includes(index as string) &&
    context.mode === "vertical";
  const [menuOpen, setOpen] = React.useState(isOpen);

  const classnames = classNames("menu-item submenu-item", className, {
    "is-active": context.index.split("-")[0] === index,
  });

  const renderChildren = () => {
    const subMenuClasses = classNames("menu-submenu", {
      "menu-opened": menuOpen,
    });

    const childrenComponent = React.Children.map(
      children,
      (child, childIndex) => {
        const childElement =
          child as React.FunctionComponentElement<SubMenuProps>;
        const { displayName } = childElement.type;
        if (displayName === "MenuItem") {
          return React.cloneElement(childElement, {
            index: `${index}-${childIndex}`,
          });
        } else {
          console.error(
            "Warning: SubMenu has a child which is not a MenuItem component"
          );
        }
      }
    );
    return <ul className={subMenuClasses}>{childrenComponent}</ul>;
  };

  const clickHandlers =
    context.mode === "vertical"
      ? {
          onClick: () => setOpen(!menuOpen),
        }
      : {};

  let timer: any;
  const mouseHandler = (e: React.MouseEvent, toggle: boolean) => {
    e.preventDefault();
    clearTimeout(timer);
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };

  const hoverHandlers =
    context.mode !== "vertical"
      ? {
          onMouseEnter: (e: React.MouseEvent) => mouseHandler(e, true),
          onMouseLeave: (e: React.MouseEvent) => mouseHandler(e, false),
        }
      : {};

  return (
    <li key={index} className={classnames} {...hoverHandlers}>
      <div className="submenu-title" {...clickHandlers}>
        {title}
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";

export { SubMenu };
