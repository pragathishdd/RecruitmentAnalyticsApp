
export async function getDashboardData() {

  const response =
    await fetch(
      "http://127.0.0.1:8000/dashboard/records"
    );

  return await response.json();

}
