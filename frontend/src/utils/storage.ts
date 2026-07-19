export const saveDashboardData = (
  data: any
) => {
  localStorage.setItem(
    "dashboardData",
    JSON.stringify(data)
  );
};

export const getDashboardData = () => {
  const data = localStorage.getItem(
    "dashboardData"
  );

  return data ? JSON.parse(data) : null;
};