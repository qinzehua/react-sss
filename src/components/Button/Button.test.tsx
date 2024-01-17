import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Button, ButtonType, ButtonSize } from "./Button";

const defaultProps = {
  onClick: jest.fn(),
};

const testProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: "klass",
};

const disabledProps = {
  disabled: true,
  onClick: jest.fn(),
};

describe("Button", () => {
  test("should render the correct default button", () => {
    render(<Button {...defaultProps}>Nice</Button>);
    const element = screen.getByText("Nice");
    expect(element).toBeInTheDocument();
    expect(element?.tagName).toEqual("BUTTON");
    expect(element).toHaveClass("btn btn-default");
    userEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  test("should render the correct component based on different props", () => {
    render(<Button {...testProps}>Nice</Button>);
    const element = screen.getByText("Nice");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("btn-primary btn-lg klass");
  });
  test("should render a link when btnType equals link and href is provided", () => {
    render(
      <Button btnType={ButtonType.Link} href="http://dummyurl">
        Link
      </Button>
    );
    const element = screen.getByText("Link");
    expect(element).toBeInTheDocument();
    expect(element?.tagName).toEqual("A");
    expect(element).toHaveClass("btn btn-link");
    expect(element).toHaveAttribute("href", "http://dummyurl");
  });
  test("should render disabled button when disabled set to true", () => {
    render(<Button {...disabledProps}>Nice</Button>);
    const element = screen.getByText("Nice") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    userEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
