import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  getDashboardData
}
from "../../services/api";


import GlobalFilters from "../../components/common/GlobalFilters";
import JoiningTrendChart from "../../components/charts/JoiningTrendChart";

export default function Joined() {

  const [data, setData] =
  useState<any>({
    records: []
  });

useEffect(() => {

  getDashboardData()
    .then(setData);

}, []);

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
   ] = useState("Joined");


  const [
    fromDate,
    setFromDate,
  ] = useState("");

  const [
    toDate,
    setToDate,
  ] = useState("");

  const recruiters: string[] =
    Array.from(
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

  const verticals: string[] =
    Array.from(
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
    records.filter(
      (row: any) => {

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

      }
    );

  const joinedCandidates =
    filteredRecords.filter(
      (row: any) =>
        String(
          row["TA Status"] || ""
        )
          .toLowerCase()
          .trim() ===
        "joined"
    );

  const totalJoined =
    joinedCandidates.length;

  const offerDropped =
    filteredRecords.filter(
      (row: any) =>
        String(
          row["TA Status"] || ""
        )
          .toLowerCase()
          .trim() ===
        "offer dropped"
    ).length;

  const offerAccepted =
    filteredRecords.filter(
      (row: any) =>
        String(
          row["TA Status"] || ""
        )
          .toLowerCase()
          .trim() ===
        "offer accepted"
    ).length;

  const offersReleased =
    totalJoined +
    offerDropped +
    offerAccepted;

  const joiningRatio =
    filteredRecords.length > 0
      ? Number(
          (
            (
              totalJoined /
              filteredRecords.length
            ) * 100
          ).toFixed(2)
        )
      : 0;

  const joinConversion =
    offersReleased > 0
      ? Number(
          (
            (
              totalJoined /
              offersReleased
            ) * 100
          ).toFixed(2)
        )
      : 0;

  const joiningHealthColor =
    joiningRatio > 70
      ? "text-green-600"
      : joiningRatio >= 50
      ? "text-yellow-500"
      : "text-red-600";

  const joiningHealthLabel =
    joiningRatio > 70
      ? "Healthy"
      : joiningRatio >= 50
      ? "Moderate"
      : "Critical";

  const getJoinColor = (
    value: number
  ) => {

    if (value > 70) {
      return "text-green-600";
    }

    if (value >= 50) {
      return "text-yellow-500";
    }

    return "text-red-600";
  };

  const recruiterJoining =
    recruiters.map(
      (recruiter) => {

        const recruiterRecords =
          filteredRecords.filter(
            (row: any) =>
              (
                row["Recruiter"] ||
                row["Recruiter Name"]
              ) === recruiter
          );

        const joined =
          recruiterRecords.filter(
            (row: any) =>
              String(
                row["TA Status"] ||
                  ""
              )
                .toLowerCase()
                .trim() ===
              "joined"
          ).length;

        const joiningPercentage =
          recruiterRecords.length > 0
            ? Number(
                (
                  (
                    joined /
                    recruiterRecords.length
                  ) * 100
                ).toFixed(2)
              )
            : 0;

        return {
          recruiter,
          profiles:
            recruiterRecords.length,
          joined,
          joiningPercentage,
        };

      }
    );

  const verticalJoining =
    verticals.map(
      (vertical) => {

        const verticalRecords =
          filteredRecords.filter(
            (row: any) =>
              row["Vertical"] ===
              vertical
          );

        const joined =
          verticalRecords.filter(
            (row: any) =>
              String(
                row["TA Status"] ||
                  ""
              )
                .toLowerCase()
                .trim() ===
              "joined"
          ).length;

        const joiningPercentage =
          verticalRecords.length > 0
            ? Number(
                (
                  (
                    joined /
                    verticalRecords.length
                  ) * 100
                ).toFixed(2)
              )
            : 0;

        return {
          vertical,
          profiles:
            verticalRecords.length,
          joined,
          joiningPercentage,
        };

      }
    );

const joiningTrend = (() => {

  const trendMap: Record<
    string,
    number
  > = {};

  joinedCandidates.forEach(
    (row: any) => {

      const date =
        row["Joining Date"];

      if (!date) {
        return;
      }

      const month =
        new Date(date)
          .toISOString()
          .slice(0, 7);

      trendMap[month] =
        (trendMap[month] || 0) + 1;

    }
  );

  return Object.keys(
    trendMap
  )
    .map((month) => ({
      month,
      joined:
        trendMap[month],
    }))
    .sort(
      (a, b) =>
        a.month.localeCompare(
          b.month
        )
    );

})();

const totalJoinedCandidates =
  joinedCandidates.length;

const successDrivers: {
  driver: string;
  count: number;
  percentage: number;
  recommendation: string;
}[] = [];

const addSuccessDriver = (
  driver: string,
  count: number,
  recommendation: string
) => {

  if (
    !totalJoinedCandidates
  ) {
    return;
  }

  successDrivers.push({
    driver,
    count,
    percentage: Number(
      (
        (
          count /
          totalJoinedCandidates
        ) * 100
      ).toFixed(2)
    ),
    recommendation,
  });

};

const compensationAligned =
  joinedCandidates.filter(
    (row: any) => {

      const expected =
        Number(
          row["Expected CTC"] || 0
        );

      const offered =
        Number(
          row["Offered CTC LPA"] || 0
        );

      return (
        expected > 0 &&
        offered >= expected
      );

    }
  ).length;

addSuccessDriver(
  "Compensation Aligned",
  compensationAligned,
  "Candidates are more likely to join when compensation meets or exceeds expectations."
);

const joiningBonusCount =
  joinedCandidates.filter(
    (row: any) =>
      String(
        row["One Time Bonus"] || ""
      )
        .toLowerCase()
        .includes("yes")
  ).length;

addSuccessDriver(
  "Joining Bonus Provided",
  joiningBonusCount,
  "Joining bonuses appear to improve joining conversion."
);

const designationGrowth =
  joinedCandidates.filter(
    (row: any) =>
      String(
        row["Current Designation"] || ""
      ).trim() !==
      String(
        row["Offered Designation"] || ""
      ).trim()
  ).length;

addSuccessDriver(
  "Designation Growth",
  designationGrowth,
  "Career progression is positively influencing candidate joining decisions."
);

const locationMatch =
  joinedCandidates.filter(
    (row: any) => {

      const current =
        String(
          row["Current Location"] || ""
        )
          .toLowerCase()
          .trim();

      const preferred =
        String(
          row["Preferred Location"] || ""
        )
          .toLowerCase()
          .trim();

      return (
        current &&
        preferred &&
        current === preferred
      );

    }
  ).length;

addSuccessDriver(
  "Location Alignment",
  locationMatch,
  "Location preference alignment significantly improves joining probability."
);

const joinedVerticalMap:
  Record<string, number> = {};

joinedCandidates.forEach(
  (row: any) => {

    const vertical =
      row["Vertical"] ||
      "Unknown";

    joinedVerticalMap[
      vertical
    ] =
      (
        joinedVerticalMap[
          vertical
        ] || 0
      ) + 1;

  }
);

const bestVertical =
  Object.entries(
    joinedVerticalMap
  )
    .sort(
      (a, b) =>
        b[1] - a[1]
    )[0];

if (bestVertical) {

  addSuccessDriver(
    `Top Joining Vertical: ${bestVertical[0]}`,
    bestVertical[1],
    "This vertical demonstrates stronger joining outcomes."
  );

}

const joinedCompanyMap:
  Record<string, number> = {};

joinedCandidates.forEach(
  (row: any) => {

    const company =
      row["Current Company"] ||
      "Unknown";

    joinedCompanyMap[
      company
    ] =
      (
        joinedCompanyMap[
          company
        ] || 0
      ) + 1;

  }
);

const bestCompany =
  Object.entries(
    joinedCompanyMap
  )
    .sort(
      (a, b) =>
        b[1] - a[1]
    )[0];

if (bestCompany) {

  addSuccessDriver(
    `Top Joining Company: ${bestCompany[0]}`,
    bestCompany[1],
    "Candidates from this organization show stronger joining intent."
  );

}

const topSuccessDrivers =
  successDrivers
    .sort(
      (a, b) =>
        b.count - a.count
    )
    .slice(0, 10);



  return (
    <DashboardLayout>

      {/* KPI Cards */}

      <div className="grid grid-cols-5 gap-4">

        <div className="bg-white rounded-xl shadow p-4">
          <div>Total Joined</div>

          <div className="text-3xl font-bold text-green-600">
            {totalJoined}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <div>Joining Ratio</div>

          <div className="text-3xl font-bold">
            {joiningRatio}%
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <div>Offers Released</div>

          <div className="text-3xl font-bold">
            {offersReleased}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <div>Offer Accepted</div>

          <div className="text-3xl font-bold text-blue-600">
            {offerAccepted}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <div>Join Conversion</div>

          <div className="text-3xl font-bold">
            {joinConversion}%
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
          disableStatus={true}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          recruiters={recruiters}
          verticals={verticals}
        />

      </div>

      {/* Joining Health */}

      <div className="mt-8 bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold">
          Joining Health Score
        </h2>

        <div
          className={`text-6xl font-bold mt-6 ${joiningHealthColor}`}
        >
          {joiningRatio}%
        </div>

        <div className="mt-2 text-xl">
          {joiningHealthLabel}
        </div>

      </div>

      {/* Recruiter Analysis */}

      <div className="mt-8 bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-4">
          Recruiter-wise Joining Analysis
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
                Joined
              </th>

              <th className="p-2">
                Joining %
              </th>

            </tr>

          </thead>

          <tbody>

            {[...recruiterJoining]
              .sort(
                (a, b) =>
                  b.joiningPercentage -
                  a.joiningPercentage
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
                    {item.profiles}
                  </td>

                  <td className="text-center p-2">
                    {item.joined}
                  </td>

                  <td
                    className={`text-center p-2 font-bold ${getJoinColor(
                      item.joiningPercentage
                    )}`}
                  >
                    {
                      item.joiningPercentage
                    }
                    %
                  </td>

                </tr>

              ))}

          </tbody>

        </table>

      </div>

      {/* Vertical Analysis */}

      <div className="mt-8 bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-4">
          Vertical-wise Joining Analysis
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
                Joined
              </th>

              <th className="p-2">
                Joining %
              </th>

            </tr>

          </thead>

          <tbody>

            {[...verticalJoining]
              .sort(
                (a, b) =>
                  b.joiningPercentage -
                  a.joiningPercentage
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
                    {item.profiles}
                  </td>

                  <td className="text-center p-2">
                    {item.joined}
                  </td>

                  <td
                    className={`text-center p-2 font-bold ${getJoinColor(
                      item.joiningPercentage
                    )}`}
                  >
                    {
                      item.joiningPercentage
                    }
                    %
                  </td>

                </tr>

              ))}

          </tbody>

        </table>
      </div>

      {/* Joining Trend Chart */}

      <div className="mt-8 bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-4">
          Joining Trend
        </h2>

        <JoiningTrendChart data={joiningTrend} />

      </div>
<div className="mt-8 bg-white rounded-xl shadow p-6">

  <h2 className="text-2xl font-bold mb-6">
    Joining Success Intelligence Engine
  </h2>

  <div className="space-y-4">

    {topSuccessDrivers.map(
      (
        item,
        index
      ) => (

        <div
          key={index}
          className="border rounded-xl p-4"
        >

          <div className="flex justify-between">

            <div className="font-bold text-lg">

              {index + 1}. {item.driver}

            </div>

            <div className="font-bold text-green-600">

              {item.count}
              {" "}
              Candidates

              {" • "}

              {item.percentage}%

            </div>

          </div>

          <div className="mt-2 text-gray-600">

            {item.recommendation}

          </div>

        </div>

      )
    )}

  </div>

</div>

    </DashboardLayout>
  );
}