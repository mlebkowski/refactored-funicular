import { Filter } from "./Filter";
import { Task } from "../Task/Task";

export class PriorityFilter implements Filter {
  constructor(private readonly threshold: number) {}

  matches(task: Task): boolean {
    return task.priority > this.threshold;
  }
}
