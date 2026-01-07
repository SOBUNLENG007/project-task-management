"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import {
  LayoutDashboard,
  CheckSquare,
  FolderOpen,
  Search,
  Settings,
} from "lucide-react";
import { useProjects } from "@/hooks/use-queries";
import { usePathname } from "next/navigation";

export default function SidebarPage({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { data: projects = [] } = useProjects();
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col">
        {/* Logo Section */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-gray-700 to-gray-900 flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <h1 className="text-xl font-bold">TaskFlow</h1>
          </div>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9 bg-background" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1">
          <div className="mb-4">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
              Menu
            </p>
            <Link href="/">
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 ${
                  isActive("/") ? "bg-accent" : "hover:bg-accent"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Button>
            </Link>

            <Link href="/tasks">
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 ${
                  isActive("/tasks") ? "bg-accent" : "hover:bg-accent"
                }`}
              >
                <CheckSquare className="w-4 h-4" />
                Tasks
              </Button>
            </Link>

            <Link href="/projects">
              <Button
                variant="ghost"
                className={`w-full justify-start gap-3 ${
                  isActive("/projects") ? "bg-accent" : "hover:bg-accent"
                }`}
              >
                <FolderOpen className="w-4 h-4" />
                Projects
              </Button>
            </Link>
          </div>

          {/* Projects List */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
              Projects
            </p>
            {projects.map((project) => {
              const isActive = pathname === `/projects/${project.id}`;

              return (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <Button
                    variant={isActive ? "ghost" : "ghost"} // different style when active
                    className={`w-full justify-start gap-3 ${
                      isActive ? "bg-blue-50 text-blue-700" : "hover:bg-accent"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${project.color}`} />
                    {project.name}
                  </Button>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-purple-600 text-white font-semibold">
                WB
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Wing Bank</p>
              <p className="text-xs text-muted-foreground truncate">
                wingbank@exampl.com
              </p>
            </div>
            <Button variant="ghost" size="icon" className="shrink-0">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
