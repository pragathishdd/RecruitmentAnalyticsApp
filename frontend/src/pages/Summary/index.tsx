import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  getDashboardData
}
from "../../services/api";


import GlobalFilters from "../../components/common/GlobalFilters";

import RecruiterPerformanceChart from "../../components/charts/RecruiterPerformanceChart";
import StatusDistributionChart from "../../components/charts/StatusDistributionChart";
import HiringTrendChart from "../../components/charts/HiringTrendChart";
import HiringFunnel from "../../components/charts/HiringFunnel";

export default function Summary() {
  const [data, setData] =
  useState<any>({
    records: []
  });

useEffect(() => {

  getDashboardData()
    .then((result) => {

      console.log(
        "Dashboard API Response",
        result
      );

      setData(result);

    });

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


  if (!data) {
    return (
      <DashboardLayout>
        <div className="text-xl font-semibold">
          No recruitment data uploaded.
        </div>
      </DashboardLayout>
    );
  }

  const records = data.records || [];

  const recruiterData: any[] = [];
  
  const filteredRecruiterData =
    recruiterData.filter(
    (item: any) =>
      !recruiterFilter ||
      item.recruiter ===
        recruiterFilter
  );
  
  const verticalData: any[] = [];

  
  
const hiringTrend = {
  monthly: [],
  quarterly: [],
  yearly: [],
};


  const recruiters = [
    ...new Set(
      recruiterData
        .map((item: any) => item.recruiter)
        .filter(Boolean)
    ),
  ] as string[];

  const verticals = [
    ...new Set(
      verticalData
        .map((item: any) => item.vertical)
        .filter(Boolean)
    ),
  ] as string[];

  const filteredRecords =
    records.filter((row: any) => {

      
  const recruiterValue =
    row["Recruiter"] ||
    row["Recruiter Name"] ||
    row["Recruiter_Name"] ||
  "";

  const recruiterMatch =
    !recruiterFilter ||
    recruiterValue === recruiterFilter;


      const verticalMatch =
        !verticalFilter ||
        row.Vertical === verticalFilter;

      const statusMatch =
        !taStatusFilter ||
        row["TA Status"] ===
          taStatusFilter;

      let dateMatch = true;

      if (fromDate || toDate) {
        const finalSelectDate =
          row["Final Select Date"];

        if (finalSelectDate) {
          const rowDate =
            new Date(finalSelectDate);

          if (fromDate) {
            dateMatch =
              dateMatch &&
              rowDate >=
                new Date(fromDate);
          }

          if (toDate) {
            dateMatch =
              dateMatch &&
              rowDate <=
                new Date(toDate);
          }
        }
      }
      return (
        recruiterMatch &&
        verticalMatch &&
        statusMatch &&
        dateMatch
      );
    });
    
  const totalRecords =
    filteredRecords.length;

  const totalJoins =
    filteredRecords.filter(
      (row: any) =>
        String(
          row["TA Status"] || ""
        )
          .trim()
          .toLowerCase() ===
        "joined"
    ).length;

  const offerAccepted =
    filteredRecords.filter(
      (row: any) =>
        String(
          row["TA Status"] || ""
        )
          .trim()
          .toLowerCase() ===
        "offer accepted"
    ).length;

  const offerDropped =
    filteredRecords.filter(
      (row: any) =>
        String(
          row["TA Status"] || ""
        )
          .trim()
          .toLowerCase() ===
        "offer dropped"
    ).length;

  const yetToOffer =
    filteredRecords.filter(
      (row: any) => {
        const status = String(
          row["TA Status"] || ""
        )
          .trim()
          .toLowerCase();

        return (
          status === "" ||
          status === "yet to offer" ||
          status === "pending" ||
          status === "open"
        );
      }
    ).length;

  const conversionPercentage =
    totalRecords > 0
      ? (
          ((offerAccepted +
            totalJoins) /
            totalRecords) *
          100
        ).toFixed(2)
      : "0";

  const joinRatio =
    totalRecords > 0
      ? (
          (totalJoins /
            totalRecords) *
          100
        ).toFixed(2)
      : "0";

  const dashboardHealthScore =
    totalRecords > 0
      ? (
          (totalJoins /
            totalRecords) *
          100
        ).toFixed(1)
      : "0";

  const cards = [
    {
      title: "Total Profiles",
      value: totalRecords,
    },
    {
      title: "Joined",
      value: totalJoins,
    },
    {
      title: "Offer Accepted",
      value: offerAccepted,
    },
    {
      title: "Offer Dropped",
      value: offerDropped,
    },
    {
      title: "Yet To Offer",
      value: yetToOffer,
    },
    {
      
      title: "Data Quality %",
      value: "100%",

    },
    {
      title: "Conversion %",
      value: `${conversionPercentage}%`,
    },
    {
      title: "Join Ratio %",
      value: `${joinRatio}%`,
    },
  ];

  return (
    <DashboardLayout>

      {/* KPI CARDS */}

      <div className="grid grid-cols-4 gap-4">

        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow p-4"
          >
            <div className="text-gray-500">
              {card.title}
            </div>

            <div className="text-3xl font-bold text-[#0B1F41]">
              {card.value}
            </div>
          </div>
        ))}

      </div>

      {/* FILTERS */}

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

      {/* HEALTH SCORE + FUNNEL */}

      <div className="grid grid-cols-2 gap-6 mt-8">

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="text-xl font-bold">
            Recruitment Health Score
          </h2>

          <div className="text-6xl font-bold text-green-600 mt-4">
            {dashboardHealthScore}%
          </div>

        </div>

        <HiringFunnel
          total={totalRecords}
          accepted={offerAccepted}
          joined={totalJoins}
        />

      </div>

      {/* CHARTS */}

      <div className="grid grid-cols-2 gap-6 mt-8">

        <RecruiterPerformanceChart
          data={filteredRecruiterData}
        />

        <RecruiterPerformanceChart
          data={filteredRecruiterData}
        />

        <StatusDistributionChart
          joined={totalJoins}
          offerAccepted={offerAccepted}
          offerDropped={offerDropped}
          yetToOffer={yetToOffer}
        /> 

      </div>

      <div className="mt-8">

        <HiringTrendChart
          data={hiringTrend}
        />

      </div>

    </DashboardLayout>
  );
}