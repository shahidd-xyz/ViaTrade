import React from "React";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Hero from "../src/landing_page/home/Hero";

describe("Hero Component", ()=>{
    test("renders hero image", () => {
        render(<Hero/>);
        const heroImage = screen.getByAltText("Home Hero Image");
        expect(heroImage).toBeInTheDocument();
        expect(heroImage).toHaveAttribute("src", "media/images/homeHero.png");
    });
});


//Disclaimer: This test file is just for learning purpose and nothing to do with the application.