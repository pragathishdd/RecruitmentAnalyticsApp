const API_URL =
  import.meta.env.VITE_API_URL;

export async function getDashboardData() {

  const response =
    await fetch(
      `${API_URL}/dashboard/records`
    );

  return await response.json();

}