import { Task } from "../Task";

export class TaskMother {
  static withPriority(priority: number): Task {
    return new Task(new Date(), priority);
  }

  static withDate(date: string) {
    return new Task(new Date(Date.parse(date)), 1);
  }

  static withDateAndPriority(date: string, priority: number) {
    return new Task(new Date(Date.parse(date)), priority);
  }
}
