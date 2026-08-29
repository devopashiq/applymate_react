import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Sidebar from "../../components/Sidebar";
import { MemoryRouter } from "react-router";

describe("Sidebar component", () => {
  test("should render sidebar", () => {
    render(
      <MemoryRouter>
        <Sidebar
          mobileOpen={false}
          desktopCollapsed={false}
          onCloseMobile={() => {}}
        />
      </MemoryRouter>,
    );

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
  });
});
