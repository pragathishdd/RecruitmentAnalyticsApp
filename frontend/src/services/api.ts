
export async function getDashboardData() {

  const response =
    await fetch(
      "https://recruitmentanalyticsapp.onrender.com/dashboard/records"
    );

  return await response.json();

}
