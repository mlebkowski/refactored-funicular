import { Endpoint } from "./Endpoint";

export interface TaskDto {
  timestamp: number;
  priority: number;
}

export interface TasksResponseDto {
  total_pages: number;
  data: TaskDto[];
}

export interface HttpClient {
  get(url: Endpoint): Promise<TasksResponseDto>;
}
