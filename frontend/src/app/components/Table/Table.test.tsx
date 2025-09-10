// src/components/Button.test.tsx
import { render, screen } from "@testing-library/react";
import Table from "./Table";

describe("Table Component renders correctly", () => {
  it("renders the button with the correct label", () => {
    render(<Table headers={["Statement summary"]} data={[["Invalid transaction reference"]]} />);
    expect(screen.getByText("Statement summary")).toBeInTheDocument();
    expect(screen.getByText("Invalid transaction reference")).toBeInTheDocument();
  });
});
