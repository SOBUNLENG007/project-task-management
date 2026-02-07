export interface Project {
  id: string;
  slug: string;
  name: string;
  description: string;
  color: string;
  status: "active" | "completed" | "archived";
  tasksTotal: number;
  tasksCompleted: number;
  dueDate: string;
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  dueDate: string;
  tags: string[];
  assignee: string;
  subtasks: Subtask[];
  comments: Comment[];
}
