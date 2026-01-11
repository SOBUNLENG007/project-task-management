import { useRouter } from "next/navigation";
import { useDeleteTask } from "@/hooks/use-queries";

export function useHandleDeleteTask() {
  const router = useRouter();
  const deleteTaskMutation = useDeleteTask();

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (confirmed) {
      try {
        await deleteTaskMutation.mutateAsync(id);
        router.push("/tasks");
      } catch (error) {
        console.error("Failed to delete task:", error);
        // You might want to show an error message here
      }
    }
  };

  return { handleDelete, isPending: deleteTaskMutation.isPending };
}
