import { render, screen, within } from "@testing-library/react";
import AboutSection from "./AboutSection";

describe("AboutSection", () => {
  test("renders the about section with its heading", () => {
    const { container } = render(<AboutSection />);

    expect(container.querySelector("#about")).toBeInTheDocument();
    expect(
      within(container.querySelector("#about")).getByRole("heading", {
        level: 2,
        name: "ABOUT ME",
      }),
    ).toBeInTheDocument();
  });

  test("renders the section introduction", () => {
    render(<AboutSection />);

    expect(screen.getByText("03 / About me")).toBeInTheDocument();
    expect(
      screen.getByText("A little context behind the work."),
    ).toBeInTheDocument();
  });

  test("renders all biography paragraphs", () => {
    render(<AboutSection />);

    expect(
      screen.getByText(/front-end developer based in India/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/passion for over 5 years/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/unit and integration tests for React components/i),
    ).toBeInTheDocument();
    expect(screen.getByText("I also write blogs on Medium.")).toBeInTheDocument();
  });
});
