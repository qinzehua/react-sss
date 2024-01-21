import { PropsWithChildren } from "react";
import classNames from "classnames";

type MenuItemProps = {
  index?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

const MenuItem: React.FC<PropsWithChildren<MenuItemProps>> = (props) => {
  const { index, disabled, className, style, children } = props;

  const classnames = classNames("menu-item", className, {
    "is-disabled": disabled,
  });

  return (
    <li style={style} className={classnames}>
      {children}
    </li>
  );
};

export { MenuItem };
