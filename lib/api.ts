const API_BASE_URL = "http://localhost:3001"

export async function fetchProjects() {
  const response = await fetch(`${API_BASE_URL}/projects`)
  if (!response.ok) throw new Error("Failed to fetch projects")
  return response.json()
}
 
export async function fetchProject(id: string) {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`)
  if (!response.ok) throw new Error("Project not found")
  return response.json()
}

export async function fetchTasks() {
  const response = await fetch(`${API_BASE_URL}/tasks`)
  if (!response.ok) throw new Error("Failed to fetch tasks")
  return response.json()
}

export async function fetchTask(id: string) {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`)
  if (!response.ok) throw new Error("Task not found")
  return response.json()
}

export async function fetchTasksByProject(projectId: string) {
  const response = await fetch(`${API_BASE_URL}/tasks?projectId=${projectId}`)
  if (!response.ok) throw new Error("Failed to fetch tasks")
  return response.json()
}

export async function deleteTask(id: string) {
  const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error("Failed to delete task")
  return response.json()
}

export async function getProject(id: string) {
  return fetchProject(id)
}

export async function getTask(id: string) {
  return fetchTask(id)
}

export async function getTasksByProject(projectId: string) {
  return fetchTasksByProject(projectId)
}
