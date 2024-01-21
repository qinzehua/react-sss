import { PropsWithChildren, useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./Menu";

export type MenuItemProps = {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const MenuItem: React.FC<PropsWithChildren<MenuItemProps>> = (props) => {
  const { index, disabled, className, style, children } = props;
  const context = useContext(MenuContext);

  const classnames = classNames("menu-item", className, {
    "is-disabled": disabled,
    "is-active": context.index === index,
  });

  const handleClick = () => {
    if (context.onSelect && !disabled && index) {
      context.onSelect(index);
    }
  };

  return (
    <li key={index} style={style} className={classnames} onClick={handleClick}>
      {children}
    </li>
  );
};

MenuItem.displayName = "MenuItem";

export { MenuItem };
