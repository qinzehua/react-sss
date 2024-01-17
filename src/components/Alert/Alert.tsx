import classNames from "classnames";

export enum AlertType {
  Success = "success",
  Danger = "danger",
  Warning = "warning",
  Info = "info",
}

type AlertProps = {
  message: string;
  description?: string;
  type: AlertType;
};

const Alert = (props: AlertProps) => {
  const { message, description, type } = props;
  const alertClass = classNames("alert", {
    [`alert-${type}`]: type,
  });

  return (
    <div className={alertClass}>
      <div className="alert-content">
        <div className="alert-message">{message}</div>
        {description && <div className="alert-description">{description}</div>}
      </div>
      <button className="alert-close-btn">关闭</button>
    </div>
  );
};

export { Alert };
