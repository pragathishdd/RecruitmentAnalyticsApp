import { useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import { getDashboardData } from "../../utils/storage";

import GlobalFilters from "../../components/common/GlobalFilters";

import OfferDropTrendChart from "../../components/charts/OfferDropTrendChart";

import OfferOutcomeChart from "../../components/charts/OfferOutcomeChart";


export default function OfferDropped() {

  const data =
    getDashboardData();

  const records =
    data?.records || [];

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

  const joined =
    filteredRecords.filter(
      (row: any) =>
        String(
          row["TA Status"] || ""
        )
          .toLowerCase()
          .trim() ===
        "joined"
    ).length;

  const offersReleased =
    offerDropped +
    offerAccepted +
    joined;

  const dropPercentage =
    offersReleased > 0
      ? Number(
          (
            (
              offerDropped /
              offersReleased
            ) *
            100
          ).toFixed(2)
        )
      : 0;

  const acceptancePercentage =
    offersReleased > 0
      ? Number(
          (
            (
              (
                offerAccepted +
                joined
              ) /
              offersReleased
            ) *
            100
          ).toFixed(2)
        )
      : 0;

  const joinConversionPercentage =
    offersReleased > 0
      ? Number(
          (
            (
              joined /
              offersReleased
            ) *
            100
          ).toFixed(2)
        )
      : 0;

  const healthColor =
    dropPercentage < 20
      ? "text-green-600"
      : dropPercentage <= 40
      ? "text-yellow-500"
      : "text-red-600";

  const healthLabel =
    dropPercentage < 20
      ? "Healthy"
      : dropPercentage <= 40
      ? "Moderate"
      : "Critical";
const recruiterOfferDrop =
  recruiters.map((recruiter) => {

    const recruiterRecords =
      filteredRecords.filter(
        (row: any) =>
          (
            row["Recruiter"] ||
            row["Recruiter Name"]
          ) === recruiter
      );

    const dropped =
      recruiterRecords.filter(
        (row: any) =>
          String(
            row["TA Status"] || ""
          )
            .toLowerCase()
            .trim() ===
          "offer dropped"
      ).length;

    const accepted =
      recruiterRecords.filter(
        (row: any) =>
          String(
            row["TA Status"] || ""
          )
            .toLowerCase()
            .trim() ===
          "offer accepted"
      ).length;

    const joined =
      recruiterRecords.filter(
        (row: any) =>
          String(
            row["TA Status"] || ""
          )
            .toLowerCase()
            .trim() ===
          "joined"
      ).length;

    const released =
      dropped +
      accepted +
      joined;

    const dropPercentage =
      released > 0
        ? Number(
            (
              (
                dropped /
                released
              ) *
              100
            ).toFixed(2)
          )
        : 0;

    return {
      recruiter,
      profiles:
        recruiterRecords.length,
      dropped,
      accepted,
      dropPercentage,
    };
  });

const verticalOfferDrop =
  verticals.map((vertical) => {

    const verticalRecords =
      filteredRecords.filter(
        (row: any) =>
          row["Vertical"] ===
          vertical
      );

    const dropped =
      verticalRecords.filter(
        (row: any) =>
          String(
            row["TA Status"] || ""
          )
            .toLowerCase()
            .trim() ===
          "offer dropped"
      ).length;

    const accepted =
      verticalRecords.filter(
        (row: any) =>
          String(
            row["TA Status"] || ""
          )
            .toLowerCase()
            .trim() ===
          "offer accepted"
      ).length;

    const joined =
      verticalRecords.filter(
        (row: any) =>
          String(
            row["TA Status"] || ""
          )
            .toLowerCase()
            .trim() ===
          "joined"
      ).length;

    const released =
      dropped +
      accepted +
      joined;

    const dropPercentage =
      released > 0
        ? Number(
            (
              (
                dropped /
                released
              ) *
              100
            ).toFixed(2)
          )
        : 0;

    return {
      vertical,
      profiles:
        verticalRecords.length,
      dropped,
      accepted,
      dropPercentage,
    };
  });

  const getDropColor = (
  value: number
) => {

  if (value < 20) {
    return "text-green-600";
  }

  if (value <= 40) {
    return "text-yellow-500";
  }

  return "text-red-600";
};

const offerDropTrend = (() => {

  const trendMap: Record<
    string,
    number
  > = {};

  filteredRecords.forEach(
    (row: any) => {

      const status =
        String(
          row["TA Status"] || ""
        )
          .toLowerCase()
          .trim();

      if (
        status !==
        "offer dropped"
      ) {
        return;
      }

      const date =
        row["Final Select Date"];

      if (!date) {
        return;
      }

      const period =
        new Date(date)
          .toISOString()
          .slice(0, 7);

      trendMap[period] =
        (trendMap[period] || 0) + 1;

    }
  );

  return Object.keys(
    trendMap
  )
    .map((period) => ({
      period,
      offerDropped:
        trendMap[period],
    }))
    .sort(
      (a, b) =>
        a.period.localeCompare(
          b.period
        )
    );

})();


const offerDropCandidates =
  filteredRecords.filter(
    (row: any) =>
      String(
        row["TA Status"] || ""
      )
        .toLowerCase()
        .trim() ===
      "offer dropped"
  );

  const hikeAnalysis = [
  {
    bucket: "0-10%",
    count: 0,
  },
  {
    bucket: "10-20%",
    count: 0,
  },
  {
    bucket: "20-30%",
    count: 0,
  },
  {
    bucket: "30-40%",
    count: 0,
  },
  {
    bucket: "40%+",
    count: 0,
  },
];

offerDropCandidates.forEach(
  (row: any) => {

    const current =
      Number(
        row["Current CTC"] || 0
      );

    const offered =
      Number(
        row["Offered CTC LPA"] ||
        0
      );

    if (
      !current ||
      !offered
    ) {
      return;
    }

    const hike =
      (
        (offered - current) /
        current
      ) *
      100;

    if (hike < 10) {
      hikeAnalysis[0].count++;
    } else if (hike < 20) {
      hikeAnalysis[1].count++;
    } else if (hike < 30) {
      hikeAnalysis[2].count++;
    } else if (hike < 40) {
      hikeAnalysis[3].count++;
    } else {
      hikeAnalysis[4].count++;
    }

  }
);

const offerDropPatterns: Record<
  string,
  number
> = {};

offerDropCandidates.forEach(
  (row: any) => {

    const currentCtc =
      Number(row["Current CTC"] || 0);

    const offeredCtc =
      Number(
        row["Offered CTC LPA"] || 0
      );

    const noticePeriod =
      Number(
        row["Notice Period"] || 0
      );

    const vertical =
      row["Vertical"] || "Unknown";

    const bonus =
      String(
        row["One Time Bonus"] || ""
      )
        .toLowerCase()
        .includes("yes")
        ? "Bonus Yes"
        : "Bonus No";

    let hikeBand =
      "Unknown";

    if (
      currentCtc > 0 &&
      offeredCtc > 0
    ) {

      const hike =
        (
          (
            offeredCtc -
            currentCtc
          ) /
          currentCtc
        ) *
        100;

      if (hike < 20) {
        hikeBand = "<20%";
      } else if (hike < 50) {
        hikeBand = "20-50%";
      } else {
        hikeBand = "50%+";
      }

    }

    let noticeBand =
      "0-30 Days";

    if (noticePeriod > 60) {
      noticeBand =
        "60+ Days";
    } else if (
      noticePeriod > 30
    ) {
      noticeBand =
        "30-60 Days";
    }

    const pattern =
      [
        vertical,
        hikeBand,
        noticeBand,
        bonus,
      ].join("|");

    offerDropPatterns[
      pattern
    ] =
      (
        offerDropPatterns[
          pattern
        ] || 0
      ) + 1;

  }
);

const profilePatterns: Record<
  string,
  number
> = {};

offerDropCandidates.forEach(
  (row: any) => {

    const currentCtc =
      Number(
        row["Current CTC"] || 0
      );

    const offeredCtc =
      Number(
        row["Offered CTC LPA"] || 0
      );

    let hikeBand = "Unknown";

    if (
      currentCtc > 0 &&
      offeredCtc > 0
    ) {

      const hike =
        (
          (
            offeredCtc -
            currentCtc
          ) /
          currentCtc
        ) * 100;

      if (hike < 20) {
        hikeBand = "<20%";
      } else if (hike < 50) {
        hikeBand = "20-50%";
      } else {
        hikeBand = "50%+";
      }
    }

    const notice =
      Number(
        row["Notice Period"] || 0
      );

    let noticeBand =
      "0-30 Days";

    if (notice > 60) {
      noticeBand =
        "60+ Days";
    } else if (notice > 30) {
      noticeBand =
        "30-60 Days";
    }

    const vertical =
      row["Vertical"] ||
      "Unknown";

    const company =
      row["Current Company"] ||
      "Unknown";

    const designation =
      row[
        "Current Designation"
      ] || "Unknown";

    const offeredDesignation =
      row[
        "Offered Designation"
      ] || "Unknown";

    const bonus =
      String(
        row["One Time Bonus"] || ""
      )
        .toLowerCase()
        .includes("yes")
        ? "Bonus Yes"
        : "Bonus No";

    const location =
      row["Current Location"] ||
      "Unknown";

    const pattern =
      [
        vertical,
        company,
        designation,
        offeredDesignation,
        hikeBand,
        noticeBand,
        bonus,
        location,
      ].join("|");

    profilePatterns[
      pattern
    ] =
      (
        profilePatterns[
          pattern
        ] || 0
      ) + 1;

  }
);

const topProfiles =
  Object.entries(
    profilePatterns
  )
    .map(
      ([pattern, count]) => {

        const [
          vertical,
          company,
          designation,
          offeredDesignation,
          hikeBand,
          noticeBand,
          bonus,
          location,
        ] =
          pattern.split("|");

        return {
          vertical,
          company,
          designation,
          offeredDesignation,
          hikeBand,
          noticeBand,
          bonus,
          location,
          count,

          percentage:
            Number(
              (
                (
                  count /
                  offerDropCandidates.length
                ) *
                100
              ).toFixed(2)
            ),
        };

      }
    )
    .sort(
      (a, b) =>
        b.count - a.count
    )
    .slice(0, 5);

  const generateRecommendation =
  (item: any) => {

    const recommendations = [];

    if (
      item.noticeBand ===
      "60+ Days"
    ) {
      recommendations.push(
        "Provide buyout or notice-period reduction support."
      );
    }

    if (
      item.hikeBand ===
      "<20%"
    ) {
      recommendations.push(
        "Review compensation benchmark and target higher hikes."
      );
    }

    if (
      item.bonus ===
      "Bonus No"
    ) {
      recommendations.push(
        "Consider introducing a joining bonus."
      );
    }

    if (
      item.designation ===
      item.offeredDesignation
    ) {
      recommendations.push(
        "Offer stronger career progression or title elevation."
      );
    }

    if (
      recommendations.length === 0
    ) {
      recommendations.push(
        "Strengthen candidate engagement and pre-joining communication."
      );
    }

    return recommendations.join(
      " "
    );
  };

  return (
    <DashboardLayout>

      {/* KPI Cards */}

      <div className="grid grid-cols-5 gap-4">

        <div className="bg-white rounded-xl shadow p-4">
          <div>Total Offer Dropped</div>

          <div className="text-3xl font-bold text-red-600">
            {offerDropped}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <div>Offer Drop %</div>

          <div className="text-3xl font-bold text-orange-600">
            {dropPercentage}%
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <div>Offers Released</div>

          <div className="text-3xl font-bold">
            {offersReleased}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <div>Acceptance %</div>

          <div className="text-3xl font-bold text-green-600">
            {acceptancePercentage}%
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <div>Join Conversion %</div>

          <div className="text-3xl font-bold text-blue-600">
            {joinConversionPercentage}%
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

      {/* Health Score */}

      <div className="mt-8 bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold">
          Offer Drop Health
        </h2>

        <div
          className={`text-6xl font-bold mt-6 ${healthColor}`}
        >
          {dropPercentage}%
        </div>

        <div className="mt-2 text-xl">
          {healthLabel}
        </div>

      </div>

      <div className="mt-8 bg-white rounded-xl shadow p-6">

  <h2 className="text-xl font-bold mb-4">
    Recruiter-wise Offer Drop Analysis
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
          Dropped
        </th>

        <th className="p-2">
          Accepted
        </th>

        <th className="p-2">
          Drop %
        </th>

      </tr>

    </thead>

    <tbody>

      {[...recruiterOfferDrop]
        .sort(
          (a, b) =>
            b.dropPercentage -
            a.dropPercentage
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
              {item.dropped}
            </td>

            <td className="text-center p-2">
              {item.accepted}
            </td>

            <td
              className={`text-center p-2 font-bold ${getDropColor(
                item.dropPercentage
              )}`}
            >
              {item.dropPercentage}%
            </td>

          </tr>

        ))}

    </tbody>

  </table>

</div>

<div className="mt-8 bg-white rounded-xl shadow p-6">

  <h2 className="text-xl font-bold mb-4">
    Vertical-wise Offer Drop Analysis
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
          Dropped
        </th>

        <th className="p-2">
          Accepted
        </th>

        <th className="p-2">
          Drop %
        </th>

      </tr>

    </thead>

    <tbody>

      {[...verticalOfferDrop]
        .sort(
          (a, b) =>
            b.dropPercentage -
            a.dropPercentage
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
              {item.dropped}
            </td>

            <td className="text-center p-2">
              {item.accepted}
            </td>

            <td
              className={`text-center p-2 font-bold ${getDropColor(
                item.dropPercentage
              )}`}
            >
              {item.dropPercentage}%
            </td>

          </tr>

        ))}

    </tbody>

  </table>

</div>

<div className="mt-8">

  <OfferDropTrendChart
    data={offerDropTrend}
  />

</div>


<div className="mt-8">

  <OfferOutcomeChart
    dropped={offerDropped}
    accepted={offerAccepted}
    joined={joined}
  />

</div>

<div className="mt-8 bg-white rounded-xl shadow p-6">

  <h2 className="text-2xl font-bold mb-6">

    Offer Drop Intelligence Engine

  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {topProfiles.map(
      (
        item,
        index
      ) => (

        <div
          key={index}
          className="border rounded-xl p-5"
        >

          <div className="text-xl font-bold mb-3 text-red-600">

            Driver #{index + 1}

          </div>

          <div>

            <strong>
              Vertical:
            </strong>{" "}

            {item.vertical}

          </div>

          <div>

            <strong>
              Current Company:
            </strong>{" "}

            {item.company}

          </div>

          <div>

            <strong>
              Current Designation:
            </strong>{" "}

            {item.designation}

          </div>

          <div>

            <strong>
              Offered Designation:
            </strong>{" "}

            {item.offeredDesignation}

          </div>

          <div>

            <strong>
              Current Location:
            </strong>{" "}

            {item.location}

          </div>

          <div>

            <strong>
              Hike:
            </strong>{" "}

            {item.hikeBand}

          </div>

          <div>

            <strong>
              Notice:
            </strong>{" "}

            {item.noticeBand}

          </div>

          <div>

            <strong>
              Bonus:
            </strong>{" "}

            {item.bonus}

          </div>

          <div className="mt-3 font-bold text-red-600">

            {item.count}
            {" "}
            Candidates

            {" • "}

            {item.percentage}%

            {" "}
            of all Offer Drops

          </div>

          <div className="mt-4 bg-gray-50 rounded-lg p-3 text-sm">

            <strong>
              Recommendation:
            </strong>

            <br />

            {
              generateRecommendation(
                item
              )
            }

          </div>

        </div>

      )
    )}

  </div>

</div>

    </DashboardLayout>
  );
}