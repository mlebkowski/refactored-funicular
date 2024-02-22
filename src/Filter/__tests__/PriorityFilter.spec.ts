import { PriorityFilter } from "../PriorityFilter";
import { TaskMother } from "../../Task/__tests__/TaskMother";

describe("Priority Filter", () => {
  it("matches", () => {
    const sut = new PriorityFilter(10);

    expect(sut.matches(TaskMother.withPriority(9))).toBe(false);
    expect(sut.matches(TaskMother.withPriority(10))).toBe(false);
    expect(sut.matches(TaskMother.withPriority(11))).toBe(true);
  });
});
