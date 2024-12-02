import ProfileCV from "../src/components/Profile"
import "@testing-library/jest-dom";
import { fireEvent, render, screen, ErrorBoundary, mount } from "@testing-library/react";

describe("Calculator", () => {
    it("renders a calculator", () => {
        mount(<ErrorBoundary>
            <ProfileCV />;
        </ErrorBoundary>)
    });
});