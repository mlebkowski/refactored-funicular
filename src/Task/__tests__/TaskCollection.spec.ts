import { TaskMother } from "./TaskMother";
import { TaskCollection } from "../TaskCollection";
import { Criteria } from "../../Filter/Criteria";

describe("TaskCollection", () => {
  it("returns all for empty criteria", () => {
    const sut = TaskCollection.fromTasks(
      TaskMother.withPriority(1),
      TaskMother.withPriority(2),
    );

    const actual = sut.filter(Criteria.empty());
    expect(actual.length).toBe(2);
  });

  it("filters by priority", () => {
    const sut = TaskCollection.fromTasks(
      TaskMother.withPriority(1),
      TaskMother.withPriority(2),
    );

    const actual = sut.filter(Criteria.ofPriority(1));
    expect(actual.length).toBe(1);
  });

  it("filters by date", () => {
    const sut = TaskCollection.fromTasks(
      TaskMother.withDate("2024-01-30"),
      TaskMother.withDate("2024-02-01"),
      TaskMother.withDate("2024-02-14"),
      TaskMother.withDate("2024-03-08"),
    );

    const actual = sut.filter(Criteria.ofDate("02-2024"));
    expect(actual.length).toBe(2);
  });

  it("filters by both date and priority", () => {
    const sut = TaskCollection.fromTasks(
      TaskMother.withDateAndPriority("2024-01-30", 1),
      TaskMother.withDateAndPriority("2024-02-01", 2),
      TaskMother.withDateAndPriority("2024-02-14", 3),
      TaskMother.withDateAndPriority("2024-03-08", 3),
    );

    const actual = sut.filter(new Criteria(2, "02-2024"));
    expect(actual.length).toBe(1);
  });
});
