import { useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { getDashboardData } from "../../utils/storage";

import GlobalFilters from "../../components/common/GlobalFilters";

export default function TAT() {
  const data = getDashboardData();

const tat =
  data?.tat_metrics;

const records =
  data?.records || [];

const [
  recruiterFilter,
  setRecruiterFilter,
] = useState("");

const [
  verticalFilter,
  setVerticalFilter,
] = useState("");

const [
  taStatusFilter,
  setTaStatusFilter,
] = useState("");

const [
  fromDate,
  setFromDate,
] = useState("");

const [
  toDate,
  setToDate,
] = useState("");

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

const filteredRecords =
  records.filter((row: any) => {

    const recruiterMatch =
      !recruiterFilter ||
      (
        row["Recruiter"] ||
        row["Recruiter Name"]
      ) === recruiterFilter;

    const verticalMatch =
      !verticalFilter ||
      row["Vertical"] ===
        verticalFilter;

    const statusMatch =
      !taStatusFilter ||
      row["TA Status"] ===
        taStatusFilter;

    return (
      recruiterMatch &&
      verticalMatch &&
      statusMatch
    );
  });

  const calculateAverageTat = (
  startColumn: string,
  endColumn: string
) => {

  const values =
    filteredRecords
      .map((row: any) => {

        if (
          !row[startColumn] ||
          !row[endColumn]
        ) {
          return null;
        }

        const start =
          new Date(
            row[startColumn]
          );

        const end =
          new Date(
            row[endColumn]
          );

        return (
          end.getTime() -
          start.getTime()
        ) /
          (1000 * 60 * 60 * 24);

      })
      .filter(
        (x: any) =>
          x !== null
      );

  return values.length
    ? Number(
        (
          values.reduce(
            (
              a: number,
              b: number
            ) => a + b,
            0
          ) / values.length
        ).toFixed(2)
      )
    : 0;
};

const filteredTat = {

  screening_tat:
    calculateAverageTat(
      "Sourced Date",
      "Screening Date"
    ),

  technical_tat:
    calculateAverageTat(
      "Screening Date",
      "Technical Interview Date"
    ),

  tool_tat:
    calculateAverageTat(
      "Technical Interview Date",
      "Tool Test Date"
    ),

  cultural_fitment_tat:
    calculateAverageTat(
      "Tool Test Date",
      "CF Date"
    ),

  offer_tat:
    calculateAverageTat(
      "CF Date",
      "Final Select Date"
    ),

  joining_tat:
    calculateAverageTat(
      "Final Select Date",
      "Joining Date"
    ),

  total_tat:
    calculateAverageTat(
      "Sourced Date",
      "Joining Date"
    ),
};

const getTatColor = (
  value: number
) => {

  if (value <= 30) {
    return "text-green-600";
  }

  if (value <= 45) {
    return "text-yellow-500";
  }

  return "text-red-600";
};

const getStageColor = (
  value: number
) => {

  if (value <= 5) {
    return "text-green-600";
  }

  if (value <= 10) {
    return "text-yellow-500";
  }

  return "text-red-600";
};

const healthLabel =
  tat.total_tat <= 30
    ? "Healthy"
    : tat.total_tat <= 45
    ? "Moderate"
    : "Critical";

const cards = [
  {
    title: "Screening TAT",
    value: filteredTat.screening_tat,
  },
  {
    title: "Technical TAT",
    value: filteredTat.technical_tat,
  },
  {
    title: "Tool TAT",
    value: filteredTat.tool_tat,
  },
  {
    title: "Cultural Fitment TAT",
    value:
      filteredTat.cultural_fitment_tat,
  },
  {
    title: "Offer TAT",
    value: filteredTat.offer_tat,
  },
  {
    title: "Joining TAT",
    value: filteredTat.joining_tat,
  },
  {
    title: "Total TAT",
    value: filteredTat.total_tat,
  },
];

const recruiterTat =
  recruiters.map((recruiter) => {

    const recruiterRecords =
      filteredRecords.filter(
        (row: any) =>
          (
            row["Recruiter"] ||
            row["Recruiter Name"]
          ) === recruiter
      );

    const tatValues =
      recruiterRecords
        .map((row: any) => {

          if (
            !row["Sourced Date"] ||
            !row["Joining Date"]
          ) {
            return null;
          }

          const sourced =
            new Date(
              row["Sourced Date"]
            );

          const joining =
            new Date(
              row["Joining Date"]
            );

          return (
            joining.getTime() -
            sourced.getTime()
          ) /
            (1000 * 60 * 60 * 24);

        })
        .filter(
          (x: any) =>
            x !== null
        ) as number[];

    const avgTat =
      tatValues.length > 0
        ? Number(
            (
              tatValues.reduce(
                (a, b) =>
                  a + b,
                0
              ) /
              tatValues.length
            ).toFixed(2)
          )
        : 0;

    return {
      recruiter,
      profiles:
        recruiterRecords.length,
      tat: avgTat,
    };

  });

const verticalTat =
  verticals.map((vertical) => {

    const verticalRecords =
      filteredRecords.filter(
        (row: any) =>
          row["Vertical"] ===
          vertical
      );

    const tatValues =
      verticalRecords
        .map((row: any) => {

          if (
            !row["Sourced Date"] ||
            !row["Joining Date"]
          ) {
            return null;
          }

          const sourced =
            new Date(
              row["Sourced Date"]
            );

          const joining =
            new Date(
              row["Joining Date"]
            );

          return (
            joining.getTime() -
            sourced.getTime()
          ) /
            (1000 * 60 * 60 * 24);

        })
        .filter(
          (x: any) =>
            x !== null
        ) as number[];

    const avgTat =
      tatValues.length > 0
        ? Number(
            (
              tatValues.reduce(
                (a, b) =>
                  a + b,
                0
              ) /
              tatValues.length
            ).toFixed(2)
          )
        : 0;

    return {
      vertical,
      profiles:
        verticalRecords.length,
      tat: avgTat,
    };

  });

  return (
    <DashboardLayout>

      {/* KPI Cards */}

      <div className="grid grid-cols-4 gap-4">

        {cards.map((card) => (

          <div
            key={card.title}
            className="bg-white rounded-xl shadow p-4"
          >

            <div className="text-gray-600">
              {card.title}
            </div>

            <div className="text-3xl font-bold">
              {card.value}
            </div>

            <div className="text-sm text-gray-500">
              Days
            </div>

          </div>

        ))}

      </div>

      {/* Filters */}

      <div className="mt-6">

        <GlobalFilters
          recruiter={recruiterFilter}
          setRecruiter={
            setRecruiterFilter
          }
          vertical={verticalFilter}
          setVertical={
            setVerticalFilter
          }
          taStatus={taStatusFilter}
          setTaStatus={
            setTaStatusFilter
          }
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          recruiters={recruiters}
          verticals={verticals}
        />

      </div>

      {/* Health Score */}

      <div className="mt-8 bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold">
          TAT Health Score
        </h2>

        <div
          className={`text-6xl font-bold mt-6 ${getTatColor(
            filteredTat.total_tat
          )}`}
        >
          {filteredTat.total_tat}
        </div>

        <div className="mt-2 text-xl">
          {healthLabel}
        </div>

      </div>

      {/* Stage Wise */}

      <div className="mt-8 bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-4">
          Stage-wise TAT Analysis
        </h2>

        <div className="grid grid-cols-3 gap-4">

          {cards.map((item) => (

            <div
              key={item.title}
              className="border rounded-lg p-4"
            >

              <div>
                {item.title}
              </div>

              <div
                className={`text-3xl font-bold mt-2 ${getStageColor(
                  Number(item.value)
                )}`}
              >
                {item.value}
              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Recruiter Wise */}

      <div className="mt-8 bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-4">
          Recruiter-wise TAT Analysis
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left p-2">
                Recruiter
              </th>

              <th className="p-2">
                Profiles
              </th>

              <th className="p-2">
                Avg TAT
              </th>

            </tr>

          </thead>

          <tbody>

            {recruiterTat.map(
              (item) => (

                <tr
                  key={
                    item.recruiter
                  }
                  className="border-b"
                >

                  <td className="p-2">
                    {
                      item.recruiter
                    }
                  </td>

                  <td className="text-center p-2">
                    {
                      item.profiles
                    }
                  </td>

                  <td
                    className={`text-center p-2 font-bold ${getTatColor(
                      item.tat
                    )}`}
                  >
                    {item.tat}
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

      {/* Vertical Wise */}

      <div className="mt-8 bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-4">
          Vertical-wise TAT Analysis
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left p-2">
                Vertical
              </th>

              <th className="p-2">
                Profiles
              </th>

              <th className="p-2">
                Avg TAT
              </th>

            </tr>

          </thead>

          <tbody>

            {verticalTat.map(
              (item) => (

                <tr
                  key={
                    item.vertical
                  }
                  className="border-b"
                >

                  <td className="p-2">
                    {
                      item.vertical
                    }
                  </td>

                  <td className="text-center p-2">
                    {
                      item.profiles
                    }
                  </td>

                  <td
                    className={`text-center p-2 font-bold ${getTatColor(
                      item.tat
                    )}`}
                  >
                    {item.tat}
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}