"use client";

import { useProjects } from "@/hooks/use-queries";
import { Bell, Loader2, Calendar, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export default function ProjectsList() {
  const { data: projects = [], isLoading, error } = useProjects();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-6 text-center">
          <p className="text-red-600">Failed to load projects</p>
          <p className="text-sm text-gray-500 mt-2">{error.message}</p>
        </Card>
      </div>
    );
  }

  const calculateProgress = (completed: number, total: number) => {
    return (completed / total) * 100;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getTeamMembers = (projectId: string) => {
    const teams = {
      "1": [
        { initials: "JD", color: "bg-purple-600" },
        { initials: "AK", color: "bg-purple-500" },
        { initials: "SL", color: "bg-blue-500" },
      ],
      "2": [
        { initials: "JD", color: "bg-purple-600" },
        { initials: "MK", color: "bg-pink-500" },
        { initials: "AL", color: "bg-indigo-500" },
        { initials: "SE", color: "bg-blue-400" },
      ],
      "3": [
        { initials: "JD", color: "bg-purple-600" },
        { initials: "KP", color: "bg-indigo-600" },
      ],
    };
    return teams[projectId as keyof typeof teams] || [];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-8 py-2 fixed top-0 left-64 right-0 z-50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
            <p className="text-sm text-gray-500 mt-1">
              {projects.length} active projects
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <Link
              href={"/projects/new"}
              className="py-2 px-4  cursor-pointer flex items-center gap-1 hover:bg-opacity-80 hover:text-gray-300 rounded bg-black text-white"
            >
              <Plus className="inline mr-2" />
              New Project
            </Link>
          </div>
        </div>
      </header>

      <main className="p-8 pt-24">
        <div className="max-w-8xl mx-auto space-y-4">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="mb-5 block"
            >
              <Card className="p-5 hover:shadow-lg transition-shadow cursor-pointer bg-white">
                {/* Project Info */}
                <div className="flex items-start gap-3">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${project.color} mt-1.5`}
                  />
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900">
                      {project.name}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-600">Progress</span>
                  <span className="text-xs font-medium text-gray-900">
                    {project.tasksCompleted}/{project.tasksTotal} tasks
                  </span>
                </div>
                <Progress
                  value={calculateProgress(
                    project.tasksCompleted,
                    project.tasksTotal
                  )}
                  className="h-1.5 mt-1"
                />

                {/* Team & Due Date */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex -space-x-2">
                    {getTeamMembers(project.id).map((member, index) => (
                      <Avatar
                        key={index}
                        className="w-7 h-7 border-2 border-white"
                      >
                        <AvatarFallback
                          className={`${member.color} text-white text-xs font-semibold`}
                        >
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatDate(project.dueDate)}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
