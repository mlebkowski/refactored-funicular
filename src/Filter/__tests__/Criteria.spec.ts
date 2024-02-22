import { Criteria } from "../Criteria";

describe("Criteria", () => {
  it("validates dateStr format", () => {
    expect(() => new Criteria(0, "invalid")).toThrowError();
  });

  it("can be created from request", () => {
    const sut = Criteria.fromRequest({
      query: { priority: "1", dateStr: "02-2024" },
    });
    expect(sut.priority).toBe(1);
    expect(sut.dateStr).toBe("02-2024");
  });
});
