import { TaskRepository } from "./TaskRepository";
import { Task } from "./Task";
import { add, compose, concat, flatMap, nthArgument } from "../functions";
import { Endpoint } from "../Http/Endpoint";
import { HttpClient, TaskDto, TasksResponseDto } from "../Http/HttpClient";
import { FetchHttpClient } from "../Http/FetchHttpClient";
import { TaskCollection } from "./TaskCollection";

const createRemainingPageNumbers = (totalPages: number) =>
  Array.from({ length: totalPages - 1 })
    .map(nthArgument(1))
    .map(add(2));

const hydrateTask = (data: TaskDto) =>
  new Task(new Date(data.timestamp), data.priority);

const hydrateResponseToTasks = (response: TasksResponseDto): Task[] =>
  response.data.map(hydrateTask);

export class HttpTaskRepository implements TaskRepository {
  constructor(
    private readonly endpoint: Endpoint,
    private readonly httpClient: HttpClient = new FetchHttpClient(),
  ) {}

  async byStatus(status: string): Promise<TaskCollection> {
    const endpoint = this.endpoint.withStatus(status);
    const firstPage = (await this.httpClient.get(endpoint)) as TasksResponseDto;

    return Promise.all(
      createRemainingPageNumbers(firstPage.total_pages).map((page) =>
        this.httpClient.get(endpoint.withPage(page)),
      ),
    ).then(
      compose(
        flatMap(hydrateResponseToTasks),
        concat(hydrateResponseToTasks(firstPage)),
        TaskCollection.from,
      ),
    );
  }
}
