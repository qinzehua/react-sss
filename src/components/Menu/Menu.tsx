import classNames from "classnames";
import { PropsWithChildren } from "react";
type MenuMode = "horizontal" | "vertical";

type MenuProps = {
  defaultIndex?: number;
  mode?: MenuMode;
  style?: React.CSSProperties;
  className?: string;
  onSelect?: (selectedIndex: number) => void;
};

const Menu: React.FunctionComponent<PropsWithChildren<MenuProps>> = (pros) => {
  const {
    defaultIndex = 0,
    mode = "horizontal",
    style,
    className,
    onSelect,
    children,
  } = pros;
  const classnames = classNames("menu", className, {
    "menu-vertical": mode === "vertical",
  });

  return (
    <ul style={style} className={classnames}>
      {children}
    </ul>
  );
};

export { Menu };
