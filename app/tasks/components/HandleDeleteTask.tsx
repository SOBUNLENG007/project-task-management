import { useRouter } from "next/navigation";
import { useDeleteTask } from "@/hooks/use-queries";
import Swal from "sweetalert2";

export function useHandleDeleteTask() {
  const router = useRouter();
  const deleteTaskMutation = useDeleteTask();

  const handleDelete = async (id: string) => {
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
        router.push("/tasks");
      } catch (error) {
        console.error("Failed to delete task:", error);
        Swal.fire("Error", "Failed to delete task.", "error");
      }
    }
  };

  return { handleDelete, isPending: deleteTaskMutation.isPending };
}
