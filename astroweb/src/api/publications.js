export async function getPublications() {
  const response = await fetch('https://api.example.com/publications');
  const data = await response.json();
  return data;
}