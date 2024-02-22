import { Task } from "./Task";
import { Criteria } from "../Filter/Criteria";

export class TaskCollection {
  static from(tasks: Task[]): TaskCollection {
    return new TaskCollection(tasks);
  }

  static fromTasks(...tasks: Task[]) {
    return new TaskCollection(tasks);
  }

  private constructor(private readonly tasks: Task[]) {}

  filter(criteria: Criteria): TaskCollection {
    return TaskCollection.from(this.tasks.filter(criteria.matcher));
  }

  get length() {
    return this.tasks.length;
  }
}
