import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { useDeleteTask } from "@/hooks/use-queries";
import Swal from "sweetalert2";

interface childProps {
  id: string;
}

export function ActionBtnRedirect({ id }: childProps) {
  const deleteTaskMutation = useDeleteTask();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="cursor-pointer shadow-none outline-0 ring-0"
          aria-label="Open menu"
        >
          <MoreHorizontalIcon size={18} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>About task</DropdownMenuLabel>
        <DropdownMenuGroup>
          <Link href={`/tasks/${id}`}>
            <DropdownMenuItem>
              View
              <DropdownMenuShortcut>⇧⌘V</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href={`/tasks/edit/${id}`}>
            <DropdownMenuItem>
              Edit
              <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 focus:text-red-600 hover:text-red-600"
          disabled={deleteTaskMutation.isPending}
          onClick={async () => {
            const result = await Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#d33",
              cancelButtonColor: "#3085d6",
              confirmButtonText: "Yes, delete it!",
              cancelButtonText: "Cancel",
            });

            if (result.isConfirmed) {
              try {
                await deleteTaskMutation.mutateAsync(id);
                Swal.fire("Deleted!", "Your task has been deleted.", "success");
              } catch (error) {
                console.error("Failed to delete task:", error);
                Swal.fire("Error", "Failed to delete task.", "error");
              }
            }
          }}
        >
          Delete
          <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
