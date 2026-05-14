import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("formats a valid ISO date string", () => {
    expect(formatDate("2021-11-05T00:00:00.000Z")).toBe("Fri Nov 05 2021");
  });

  it("returns 'Unknown date' for null or undefined", () => {
    expect(formatDate(null)).toBe("Unknown date");
    expect(formatDate(undefined)).toBe("Unknown date");
  });
});
