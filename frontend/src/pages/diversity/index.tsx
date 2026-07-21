import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  getDashboardData
} from "../../services/api";


import GlobalFilters from "../../components/common/GlobalFilters";
import DiversityGenderChart from "../../components/charts/DiversityGenderChart";

import DiversityTrendChart
from "../../components/charts/DiversityTrendChart";


export default function Diversity() {
  
  const [data, setData] =
  useState<any>({
    records: []
  });

useEffect(() => {

  getDashboardData()
    .then(setData);

}, []);

  const [recruiterFilter, setRecruiterFilter] =
    useState("");

  const [verticalFilter, setVerticalFilter] =
    useState("");

  const [taStatusFilter, setTaStatusFilter] =
    useState("");

  const [fromDate, setFromDate] =
    useState("");

  const [toDate, setToDate] =
    useState("");

  const records = data?.records || [];

  if (!records.length) {
    return (
      <DashboardLayout>
        <h2>No Diversity Data Available</h2>
      </DashboardLayout>
    );
  }

  const filteredRecords = records.filter(
    (row: any) => {
      const recruiterValue =
        row["Recruiter"] ||
        row["Recruiter Name"] ||
        "";

      const verticalValue =
        row["Vertical"] || "";

      const recruiterMatch =
        !recruiterFilter ||
        recruiterValue === recruiterFilter;

      const verticalMatch =
        !verticalFilter ||
        verticalValue === verticalFilter;

      const statusMatch =
        !taStatusFilter ||
        row["TA Status"] ===
          taStatusFilter;

      return (
        recruiterMatch &&
        verticalMatch &&
        statusMatch
      );
    }
  );

  const males =
    filteredRecords.filter(
      (row: any) =>
        String(
          row["Gender"] || ""
        )
          .trim()
          .toLowerCase() === "male"
    ).length;

  const females =
    filteredRecords.filter(
      (row: any) =>
        String(
          row["Gender"] || ""
        )
          .trim()
          .toLowerCase() === "female"
    ).length;

  const total = males + females;

  const femalePercentage =
    total > 0
      ? (
          (females / total) *
          100
        ).toFixed(2)
      : "0";

  const diversityRatio =
    males > 0
      ? (
          females / males
        ).toFixed(2)
      : "0";

  const recruiters: string[] = Array.from(
  new Set(
    records
      .map(
        (row: any) =>
          row["Recruiter"] ||
          row["Recruiter Name"] ||
          ""
      )
      .filter(Boolean)
  )
).map(String);

  
const verticals: string[] = Array.from(
  new Set(
    records
      .map(
        (row: any) =>
          row["Vertical"] || ""
      )
      .filter(Boolean)
  )
).map(String);


  const recruiterDiversity =
    recruiters.map((recruiter) => {
      const recruiterRecords =
        filteredRecords.filter(
          (row: any) =>
            (
              row["Recruiter"] ||
              row["Recruiter Name"]
            ) === recruiter
        );

      const male =
        recruiterRecords.filter(
          (row: any) =>
            String(
              row["Gender"] || ""
            )
              .trim()
              .toLowerCase() === "male"
        ).length;

      const female =
        recruiterRecords.filter(
          (row: any) =>
            String(
              row["Gender"] || ""
            )
              .trim()
              .toLowerCase() === "female"
        ).length;

      const total = male + female;

      return {
        recruiter,
        male,
        female,
        total,
        femalePercentage:
          total > 0
            ? Number(
                (
                  (female / total) *
                  100
                ).toFixed(2)
              )
            : 0,
      };
    });

  const verticalDiversity =
    verticals.map((vertical) => {
      const verticalRecords =
        filteredRecords.filter(
          (row: any) =>
            row["Vertical"] === vertical
        );

      const male =
        verticalRecords.filter(
          (row: any) =>
            String(
              row["Gender"] || ""
            )
              .trim()
              .toLowerCase() === "male"
        ).length;

      const female =
        verticalRecords.filter(
          (row: any) =>
            String(
              row["Gender"] || ""
            )
              .trim()
              .toLowerCase() === "female"
        ).length;

      const total = male + female;

      return {
        vertical,
        male,
        female,
        total,
        femalePercentage:
          total > 0
            ? Number(
                (
                  (female / total) *
                  100
                ).toFixed(2)
              )
            : 0,
      };
    });

  const healthColor =
    Number(femalePercentage) >= 40
      ? "text-green-600"
      : Number(femalePercentage) >= 30
      ? "text-yellow-500"
      : "text-red-600";

  const healthLabel =
    Number(femalePercentage) >= 40
      ? "Excellent"
      : Number(femalePercentage) >= 30
      ? "Moderate"
      : "Attention Required";

const trendMap: Record<
  string,
  {
    male: number;
    female: number;
  }
> = {};

filteredRecords.forEach((row: any) => {

  const date =
    row["Final Select Date"];

  if (!date) {
    return;
  }

  const period =
    new Date(date)
      .toISOString()
      .slice(0, 7);

  if (!trendMap[period]) {
    trendMap[period] = {
      male: 0,
      female: 0,
    };
  }

  const gender =
    String(
      row["Gender"] || ""
    )
      .trim()
      .toLowerCase();

  if (gender === "male") {
    trendMap[period].male++;
  }

  if (gender === "female") {
    trendMap[period].female++;
  }

});

const diversityTrend = Object.keys(
  trendMap
)
  .map((period) => {

    const values =
      trendMap[period];

    const total =
      values.male +
      values.female;

    return {
      period,

      malePercentage:
        total > 0
          ? Number(
              (
                (values.male /
                  total) *
                100
              ).toFixed(2)
            )
          : 0,

      femalePercentage:
        total > 0
          ? Number(
              (
                (values.female /
                  total) *
                100
              ).toFixed(2)
            )
          : 0,
    };

  })
  .sort(
    (a, b) =>
      a.period.localeCompare(
        b.period
      )
  );

  return (
    <DashboardLayout>

      {/* KPI Cards */}

      <div className="grid grid-cols-5 gap-4">

        <div className="bg-white rounded-xl shadow p-4">
          <div>Total Profiles</div>
          <div className="text-3xl font-bold">
            {total}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <div>Male</div>
          <div className="text-3xl font-bold text-blue-600">
            {males}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <div>Female</div>
          <div className="text-3xl font-bold text-pink-600">
            {females}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <div>Female %</div>
          <div className="text-3xl font-bold">
            {femalePercentage}%
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <div>Diversity Ratio</div>
          <div className="text-3xl font-bold">
            {diversityRatio}
          </div>
        </div>

      </div>

      {/* Filters */}

      <div className="mt-6">
        <GlobalFilters
          recruiter={recruiterFilter}
          setRecruiter={setRecruiterFilter}
          vertical={verticalFilter}
          setVertical={setVerticalFilter}
          taStatus={taStatusFilter}
          setTaStatus={setTaStatusFilter}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          recruiters={recruiters}
          verticals={verticals}
        />
      </div>

      {/* Gender Distribution + Health */}

      <div className="grid grid-cols-2 gap-6 mt-8">

        <DiversityGenderChart
          male={males}
          female={females}
        />

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold">
            Diversity Health
          </h2>

          <div
            className={`text-6xl font-bold mt-6 ${healthColor}`}
          >
            {femalePercentage}%
          </div>

          <div className="mt-3 text-xl">
            {healthLabel}
          </div>

        </div>

      </div>

      <div className="mt-8">

  <DiversityTrendChart
    data={diversityTrend}
  />

</div>


      {/* Recruiter-wise Diversity */}

      <div className="mt-8 bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-4">
          Recruiter-wise Diversity
        </h2>

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="text-left p-2">
                Recruiter
              </th>
              <th className="p-2">
                Male
              </th>
              <th className="p-2">
                Female
              </th>
              <th className="p-2">
                Total
              </th>
              <th className="p-2">
                Female %
              </th>
            </tr>
          </thead>

          <tbody>
            {[...recruiterDiversity]
              .sort(
                (a, b) =>
                  b.femalePercentage -
                  a.femalePercentage
              )
              .map((item) => (
                <tr
                  key={item.recruiter}
                  className="border-b"
                >
                  <td className="p-2">
                    {item.recruiter}
                  </td>
                  <td className="text-center p-2">
                    {item.male}
                  </td>
                  <td className="text-center p-2">
                    {item.female}
                  </td>
                  <td className="text-center p-2">
                    {item.total}
                  </td>
                            
<td
  className={`text-center p-2 font-bold ${
    item.femalePercentage >= 40
      ? "text-green-600"
      : item.femalePercentage >= 30
      ? "text-yellow-500"
      : "text-red-600"
  }`}
>
  {item.femalePercentage}%
</td>
                </tr>
              ))}
          </tbody>

        </table>

      </div>

      {/* Vertical-wise Diversity */}

      <div className="mt-8 bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-4">
          Vertical-wise Diversity
        </h2>

        <table className="w-full">

          <thead>
            <tr className="border-b">
              <th className="text-left p-2">
                Vertical
              </th>
              <th className="p-2">
                Male
              </th>
              <th className="p-2">
                Female
              </th>
              <th className="p-2">
                Total
              </th>
              <th className="p-2">
                Female %
              </th>
            </tr>
          </thead>

          <tbody>
            {[...verticalDiversity]
              .sort(
                (a, b) =>
                  b.femalePercentage -
                  a.femalePercentage
              )
              .map((item) => (
                <tr
                  key={item.vertical}
                  className="border-b"
                >
                  <td className="p-2">
                    {item.vertical}
                  </td>
                  <td className="text-center p-2">
                    {item.male}
                  </td>
                  <td className="text-center p-2">
                    {item.female}
                  </td>
                  <td className="text-center p-2">
                    {item.total}
                  </td>
                    <td
                      className={`text-center p-2 font-bold ${
                       item.femalePercentage >= 40
                       ? "text-green-600"
                       : item.femalePercentage >= 30
                       ? "text-yellow-500"
                        : "text-red-600"
                        }`}
                        >
                        {item.femalePercentage}%
                    </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}