export async function getProjects() {
  const response = await fetch('https://api.example.com/projects');
  const data = await response.json();
  return data;
}