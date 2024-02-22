import { HttpTaskRepository } from "../HttpTaskRepository";
import { Endpoint } from "../../Http/Endpoint";
import { HttpClientSpy } from "../../Http/__tests__/HttpClientSpy";

describe("HttpTaskRepository", () => {
  it("calls fetch for each page and returns contents", async () => {
    const httpClient = new HttpClientSpy(5);
    const sut = new HttpTaskRepository(
      new Endpoint("https://example.com/"),
      httpClient,
    );
    const actual = await sut.byStatus("ACTIVE");
    expect(httpClient.requestedUrls).toEqual([
      "https://example.com/?status=ACTIVE",
      "https://example.com/?status=ACTIVE&page=2",
      "https://example.com/?status=ACTIVE&page=3",
      "https://example.com/?status=ACTIVE&page=4",
      "https://example.com/?status=ACTIVE&page=5",
    ]);
    expect(actual).toHaveLength(5);
  });

  it("it works if there are no further pages", async () => {
    const httpClient = new HttpClientSpy(1);
    const sut = new HttpTaskRepository(
      new Endpoint("https://example.com/"),
      httpClient,
    );
    const actual = await sut.byStatus("ACTIVE");
    expect(httpClient.requestedUrls).toEqual([
      "https://example.com/?status=ACTIVE",
    ]);
    expect(actual).toHaveLength(1);
  });
});
