import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  getDashboardData
}
from "../../services/api";


import GlobalFilters from "../../components/common/GlobalFilters";

import OfferDropTrendChart from "../../components/charts/OfferDropTrendChart";

import OfferOutcomeChart from "../../components/charts/OfferOutcomeChart";


export default function OfferDropped() {

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

  const [recruiterFilter, setRecruiterFilter] =
    useState("");

  const [verticalFilter, setVerticalFilter] =
    useState("");

  
const [
  taStatusFilter,
  setTaStatusFilter,
] = useState("Offer Dropped");


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


const totalDrops =
  offerDropCandidates.length;

const riskDrivers: {
  driver: string;
  count: number;
  percentage: number;
  recommendation: string;
}[] = [];

const addDriver = (
  driver: string,
  count: number,
  recommendation: string
) => {

  if (!totalDrops) return;

  riskDrivers.push({
    driver,
    count,
    percentage: Number(
      (
        (count /
          totalDrops) *
        100
      ).toFixed(2)
    ),
    recommendation,
  });

};

const expectedGapCount =
  offerDropCandidates.filter(
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
        offered > 0 &&
        offered < expected
      );

    }
  ).length;

addDriver(
  "Expected Compensation Gap",
  expectedGapCount,
  "Offered compensation is below candidate expectations. Review compensation competitiveness."
);

const longNoticeCount =
  offerDropCandidates.filter(
    (row: any) =>
      Number(
        row["Notice Period"] || 0
      ) > 60
  ).length;

addDriver(
  "Notice Period Above 60 Days",
  longNoticeCount,
  "Long notice periods increase counter-offer risk. Introduce buyout and engagement plans."
);

const noBonusCount =
  offerDropCandidates.filter(
    (row: any) =>
      !String(
        row["One Time Bonus"] || ""
      )
        .toLowerCase()
        .includes("yes")
  ).length;

addDriver(
  "No Joining Bonus",
  noBonusCount,
  "Consider joining bonuses for hard-to-hire talent."
);

const lowHikeCount =
  offerDropCandidates.filter(
    (row: any) => {

      const current =
        Number(
          row["Current CTC"] || 0
        );

      const offered =
        Number(
          row["Offered CTC LPA"] || 0
        );

      if (
        !current ||
        !offered
      ) {
        return false;
      }

      const hike =
        (
          (
            offered -
            current
          ) /
          current
        ) * 100;

      return hike < 20;

    }
  ).length;

addDriver(
  "Low Hike (<20%)",
  lowHikeCount,
  "Candidates receiving limited hikes show higher drop probability."
);

const noGrowthCount =
  offerDropCandidates.filter(
    (row: any) =>
      String(
        row["Current Designation"] || ""
      ).trim() ===
      String(
        row["Offered Designation"] || ""
      ).trim()
  ).length;

addDriver(
  "No Designation Progression",
  noGrowthCount,
  "Career progression expectations may not be satisfied."
);

const locationMismatchCount =
  offerDropCandidates.filter(
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
        current !== preferred
      );

    }
  ).length;

addDriver(
  "Location Preference Mismatch",
  locationMismatchCount,
  "Location alignment should be discussed earlier in the process."
);

const verticalMap: Record<
  string,
  number
> = {};

offerDropCandidates.forEach(
  (row: any) => {

    const vertical =
      row["Vertical"] ||
      "Unknown";

    verticalMap[
      vertical
    ] =
      (
        verticalMap[
          vertical
        ] || 0
      ) + 1;

  }
);

const topVertical =
  Object.entries(verticalMap)
    .sort(
      (a, b) =>
        b[1] - a[1]
    )[0];

if (topVertical) {

  addDriver(
    `High Risk Vertical: ${topVertical[0]}`,
    topVertical[1],
    "Focus retention strategy for this vertical."
  );

}

const companyMap: Record<
  string,
  number
> = {};

offerDropCandidates.forEach(
  (row: any) => {

    const company =
      row["Current Company"] ||
      "Unknown";

    companyMap[
      company
    ] =
      (
        companyMap[
          company
        ] || 0
      ) + 1;

  }
);

const topCompany =
  Object.entries(companyMap)
    .sort(
      (a, b) =>
        b[1] - a[1]
    )[0];

if (topCompany) {

  addDriver(
    `Company Risk: ${topCompany[0]}`,
    topCompany[1],
    "Candidates from this company show elevated offer-drop risk."
  );

}

const topDrivers =
  riskDrivers
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
          disableStatus={true}
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
    Offer Drop Root Cause Analysis
  </h2>

  <div className="space-y-4">

    {topDrivers.map(
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

            <div className="font-bold text-red-600">

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