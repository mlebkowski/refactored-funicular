import { Task } from "../Task/Task";

export interface Filter {
  matches(task: Task): boolean;
}
