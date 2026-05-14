import React from "react";
import { render, screen } from "@testing-library/react";
import Banner from "./Banner";

describe("Banner", () => {
  it("matches snapshot", () => {
    const { container } = render(<Banner title="conduit" subtitle="A place to share knowledge" />);
    expect(container).toMatchSnapshot();
  });

  it("does not render subtitle when omitted", () => {
    render(<Banner title="conduit" />);
    expect(screen.queryByText("A place to share knowledge")).toBeNull();
  });
});
