import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ArticlePreviewCard from "./ArticlePreviewCard";
import { Profile } from "types";

const author: Profile = { username: "testuser", bio: "", image: "", following: false };

const defaultProps = {
  slug: "test-article",
  title: "Test Article Title",
  description: "A short description of the article.",
  author,
  date: "2021-11-05T00:00:00.000Z",
  favorited: false,
  favoritesCount: 42,
};

describe("ArticlePreviewCard", () => {
  it("renders title, description and formatted date", () => {
    render(<ArticlePreviewCard {...defaultProps} />);
    expect(screen.getByText("Test Article Title")).toBeInTheDocument();
    expect(screen.getByText("A short description of the article.")).toBeInTheDocument();
    expect(screen.getByText("Fri Nov 05 2021")).toBeInTheDocument();
  });

  it("applies btn-primary when favorited, btn-outline-primary when not", () => {
    const { rerender } = render(<ArticlePreviewCard {...defaultProps} favorited={false} />);
    expect(screen.getByRole("button")).toHaveClass("btn-outline-primary");

    rerender(<ArticlePreviewCard {...defaultProps} favorited={true} />);
    expect(screen.getByRole("button")).toHaveClass("btn-primary");
  });

  it("calls onFavorite when the button is clicked", () => {
    const onFavorite = jest.fn();
    render(<ArticlePreviewCard {...defaultProps} onFavorite={onFavorite} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onFavorite).toHaveBeenCalledTimes(1);
  });
});
