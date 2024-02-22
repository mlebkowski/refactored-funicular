import { HttpClient, TasksResponseDto } from "../HttpClient";
import { Endpoint } from "../Endpoint";

export class HttpClientSpy implements HttpClient {
  private readonly requests = [];
  constructor(private readonly numPages: number) {}

  get(url: Endpoint): Promise<TasksResponseDto> {
    this.requests.push(url.toString());

    return Promise.resolve({
      total_pages: this.numPages,
      data: [
        {
          timestamp: new Date().getTime(),
          priority: 1,
        },
      ],
    });
  }

  get requestedUrls() {
    return this.requests;
  }
}
