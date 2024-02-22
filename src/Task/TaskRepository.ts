import { TaskCollection } from "./TaskCollection";

export interface TaskRepository {
  byStatus(status: string): Promise<TaskCollection>;
}
