import { HttpClient, TasksResponseDto } from "./HttpClient";
import { Endpoint } from "./Endpoint";

export class FetchHttpClient implements HttpClient {
  get(url: Endpoint): Promise<TasksResponseDto> {
    return fetch(url.toString()).then((data) => data.json());
  }
}
