export async function getPersonalProjects() {
  const response = await fetch('https://api.example.com/personal-projects');
  const data = await response.json();
  return data;
}