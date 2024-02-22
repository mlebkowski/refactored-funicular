import { Filter } from "./Filter";
import { Task } from "../Task/Task";

export class DateFilter implements Filter {
  constructor(private readonly dateStr: string) {}
  matches(task: Task): boolean {
    const month = `${task.date.getMonth() + 1}`.padStart(2, "0");
    const year = task.date.getFullYear();
    const taskDate = `${month}-${year}`;

    return this.dateStr === taskDate;
  }
}
