"use client";

import { useProject, useTasksByProject } from "@/hooks/use-queries";
import { Bell, Settings, FolderOpen, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import Link from "next/link";

interface ProjectDetailProps {
  projectId: string;
}

export default function ProjectDetail({ projectId }: ProjectDetailProps) {
  const {
    data: project,
    isLoading: projectLoading,
    error: projectError,
  } = useProject(projectId);
  const {
    data: tasks = [],
    isLoading: tasksLoading,
    error: tasksError,
  } = useTasksByProject(projectId);
  const [activeTab, setActiveTab] = useState<"all" | "active" | "completed">(
    "all",
  );

  if (projectLoading || tasksLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (projectError || tasksError) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="p-6 text-center">
          <p className="text-red-600">Error loading project</p>
          <p className="text-sm text-gray-500 mt-2">
            {projectError?.message || tasksError?.message}
          </p>
        </Card>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center h-full">
        <Card className="p-6 text-center">
          <p className="text-red-600">Project not found</p>
        </Card>
      </div>
    );
  }

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "done").length;
  const inProgressTasks = tasks.filter(
    (t) => t.status === "in-progress",
  ).length;
  const todoTasks = tasks.filter((t) => t.status === "todo").length;

  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "completed") return task.status === "done";
    if (activeTab === "active") return task.status !== "done";
    return true;
  });

  const teamMembers = [
    {
      id: "1",
      name: "John Doe",
      role: "Lead",
      initials: "JD",
      color: "bg-purple-600",
    },
    {
      id: "2",
      name: "Alice Kim",
      role: "Developer",
      initials: "AK",
      color: "bg-purple-500",
    },
    {
      id: "3",
      name: "Sam Lee",
      role: "Designer",
      initials: "SL",
      color: "bg-blue-500",
    },
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      done: (
        <Badge className="bg-green-200 text-green-700 hover:bg-green-100">
          Done
        </Badge>
      ),
      "in-progress": (
        <Badge className="bg-orange-200 text-orange-700 hover:bg-orange-100">
          In Progress
        </Badge>
      ),
      todo: (
        <Badge className="bg-gray-200 text-gray-700 hover:bg-gray-100">
          To Do
        </Badge>
      ),
    };
    return badges[status as keyof typeof badges] || badges.todo;
  };

  const getAssignee = (taskId: string) => {
    const assignees: Record<string, { initials: string; color: string }> = {
      "1": { initials: "JD", color: "bg-purple-600" },
      "2": { initials: "AK", color: "bg-purple-500" },
      "3": { initials: "SL", color: "bg-blue-500" },
      "4": { initials: "JD", color: "bg-purple-600" },
      "5": { initials: "AK", color: "bg-purple-500" },
    };
    return assignees[taskId] || assignees["1"];
  };

  return (
    <div className="h-full bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-8 py-4.5 sticky top-0 z-10">
        <div className="flex items-center">
          {/* Push all buttons to the end */}
          <div className="ml-auto flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
            <Button className="bg-gray-900 hover:bg-gray-800 gap-2">
              <span>+</span>
              <span>Add Task</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="p-8 overflow-y-auto">
        <div className="flex items-center gap-1 text-sm text-gray-600 pl-8 mb-6">
          <Link href="/projects" className="text-gray-500 hover:text-gray-900">
            Projects
          </Link>
          <span className="text-gray-400">{">"}</span>
          <span className="text-gray-900 font-medium">{project.name}</span>
        </div>

        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-start gap-4">
            <div
              className={`w-16 h-16 rounded-2xl ${project.color} flex items-center justify-center shrink-0`}
            >
              <FolderOpen className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                {project.name}
              </h1>
              <p className="text-gray-600 mt-2">{project.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <Card className="p-3 items-center bg-white">
              <div className="text-3xl font-bold text-gray-900">
                {totalTasks}
              </div>
              <div className="text-md text-gray-600 font-medium">
                Total Tasks
              </div>
            </Card>
            <Card className="p-3 items-center bg-white">
              <div className="text-3xl font-bold text-green-600">
                {completedTasks}
              </div>
              <div className="text-md text-gray-600 font-medium">Completed</div>
            </Card>
            <Card className="p-3 items-center bg-white">
              <div className="text-3xl font-bold text-orange-600">
                {inProgressTasks}
              </div>
              <div className="text-md text-gray-600 font-medium">
                In Progress
              </div>
            </Card>
            <Card className="p-3 items-center bg-white">
              <div className="text-3xl font-bold text-gray-600">
                {todoTasks}
              </div>
              <div className="text-md text-gray-600 font-medium">To Do</div>
            </Card>
          </div>

          <Card className="bg-white">
            <div className="p-3 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 p-2">
                  Tasks
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant={activeTab === "all" ? "default" : "ghost"}
                    size="lg"
                    onClick={() => setActiveTab("all")}
                  >
                    All
                  </Button>
                  <Button
                    variant={activeTab === "active" ? "default" : "ghost"}
                    size="lg"
                    onClick={() => setActiveTab("active")}
                  >
                    Active
                  </Button>
                  <Button
                    variant={activeTab === "completed" ? "default" : "ghost"}
                    size="lg"
                    onClick={() => setActiveTab("completed")}
                  >
                    Completed
                  </Button>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredTasks.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <p>No tasks found</p>
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 flex items-center gap-6 hover:bg-gray-200 transition-colors"
                  >
                    <Checkbox
                      checked={task.status === "done"}
                      className="w-5 h-5"
                    />
                    <div className="flex-1">
                      <p
                        className={`text-sm ${
                          task.status === "done"
                            ? "line-through text-gray-500"
                            : "text-gray-900"
                        }`}
                      >
                        {task.title}
                      </p>
                    </div>
                    {getStatusBadge(task.status)}
                    <Avatar className="w-8 h-8">
                      <AvatarFallback
                        className={`${
                          getAssignee(task.id).color
                        } text-white text-xs font-semibold`}
                      >
                        {getAssignee(task.id).initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                ))
              )}
            </div>
          </Card>

          <Card className="bg-white p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Team Members
            </h2>
            <p className="text-sm text-gray-600">
              {teamMembers.length} members
            </p>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback
                      className={`${member.color} text-white font-semibold`}
                    >
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {member.name}
                    </p>
                    <p className="text-xs text-gray-600">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
