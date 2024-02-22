import { DateFilter } from "./DateFilter";
import { PriorityFilter } from "./PriorityFilter";
import { Task } from "../Task/Task";
import { Filter } from "./Filter";

interface Request {
  query: Record<string, string>;
}

export class Criteria {
  static ofPriority(priority: number) {
    return new Criteria(priority, null);
  }

  static ofDate(dateStr: string) {
    return new Criteria(null, dateStr);
  }

  static empty() {
    return new Criteria(null, null);
  }

  static fromRequest(req: Request): Criteria {
    const { priority, dateStr } = req.query;
    return new Criteria(parseInt(priority), dateStr);
  }

  constructor(
    public readonly priority: number,
    public readonly dateStr: string,
  ) {
    if (null !== dateStr && false === /^\d{2}-\d{4}$/.test(dateStr)) {
      throw new Error(`Invalid dateStr format: ${dateStr}`);
    }
  }

  get matcher() {
    const filters = [
      ...(this.dateStr ? [new DateFilter(this.dateStr)] : []),
      ...(this.priority ? [new PriorityFilter(this.priority)] : []),
    ];

    return (task: Task) =>
      filters.every((filter: Filter) => filter.matches(task));
  }
}
