import { DateFilter } from "../DateFilter";
import { TaskMother } from "../../Task/__tests__/TaskMother";

describe("Date Filter", () => {
  it.each`
    date            | expected
    ${"2024-01-31"} | ${false}
    ${"2024-02-01"} | ${true}
    ${"2024-02-29"} | ${true}
    ${"2024-03-01"} | ${false}
  `("matches dates", ({ date, expected }) => {
    const sut = new DateFilter("02-2024");
    expect(sut.matches(TaskMother.withDate(date))).toBe(expected);
    expect(sut.matches(TaskMother.withDate(date))).toBe(expected);
    expect(sut.matches(TaskMother.withDate(date))).toBe(expected);
    expect(sut.matches(TaskMother.withDate(date))).toBe(expected);
  });
});
