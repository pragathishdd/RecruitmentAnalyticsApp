import { useEffect, useState } from "react";

import DashboardLayout from "../../components/layout/DashboardLayout";
import GlobalFilters from "../../components/common/GlobalFilters";

import {
  getDashboardData
}
from "../../services/api";


export default function DecisionIntelligence() {

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
] = useState("Yet To Offer");


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

  const offerAcceptedCandidates =
    filteredRecords.filter(
      (row: any) =>
        String(
          row["TA Status"] || ""
        )
          .toLowerCase()
          .trim() ===
        "offer accepted"
    );

  const yetToOfferCandidates =
    filteredRecords.filter(
      (row: any) =>
        String(
          row["TA Status"] || ""
        )
          .toLowerCase()
          .trim() ===
        "yet to offer"
    );

const getHistoricalSuccessRate = (
  field: string,
  value: string
) => {

  const matchingRecords =
    filteredRecords.filter(
      (row: any) =>
        String(
          row[field] || ""
        )
          .toLowerCase()
          .trim() ===
        String(value || "")
          .toLowerCase()
          .trim()
    );

  const joined =
    matchingRecords.filter(
      (row: any) =>
        String(
          row["TA Status"] || ""
        )
          .toLowerCase()
          .trim() ===
        "joined"
    ).length;

  const dropped =
    matchingRecords.filter(
      (row: any) =>
        String(
          row["TA Status"] || ""
        )
          .toLowerCase()
          .trim() ===
        "offer dropped"
    ).length;

  const total =
    joined + dropped;

  if (total === 0) {
    return 50;
  }

  return Number(
    (
      (joined / total) *
      100
    ).toFixed(0)
  );
};

const calculateJoinProbability =
  (candidate: any) => {

    const companyScore =
      getHistoricalSuccessRate(
        "Current Company",
        candidate["Current Company"]
      );

    const expected =
      Number(
        candidate["Expected CTC"] || 0
      );

    const offered =
      Number(
        candidate["Offered CTC LPA"] || 0
      );

    const notice =
      Number(
        candidate["Notice Period"] || 0
      );

    let score =
      companyScore;

    if (
      expected > 0 &&
      offered >= expected
    ) {
      score += 15;
    }

    if (
      String(
        candidate["One Time Bonus"] || ""
      )
        .toLowerCase()
        .includes("yes")
    ) {
      score += 10;
    }

    if (notice <= 30) {
      score += 10;
    }

    if (notice > 60) {
      score -= 10;
    }

    return Math.max(
      0,
      Math.min(score, 95)
    );
  };

const predictions =
  offerAcceptedCandidates.map(
    (candidate: any) => {

      const joinProbability =
        calculateJoinProbability(
          candidate
        );

      const positives: string[] =
        [];

      const risks: string[] =
        [];

      const expected =
        Number(
          candidate["Expected CTC"] || 0
        );

      const offered =
        Number(
          candidate["Offered CTC LPA"] || 0
        );

      const notice =
        Number(
          candidate["Notice Period"] || 0
        );

      const companyScore =
        getHistoricalSuccessRate(
          "Current Company",
          candidate["Current Company"]
        );

      if (
        offered >= expected &&
        expected > 0
      ) {
        positives.push(
          "CTC Aligned"
        );
      } else {
        risks.push(
          "CTC Gap"
        );
      }

      if (
        String(
          candidate["One Time Bonus"] || ""
        )
          .toLowerCase()
          .includes("yes")
      ) {
        positives.push(
          "Bonus Available"
        );
      } else {
        risks.push(
          "No Bonus"
        );
      }

      if (notice <= 30) {
        positives.push(
          "Low Notice"
        );
      }

      if (notice > 60) {
        risks.push(
          "High Notice"
        );
      }

      if (companyScore >= 70) {
        positives.push(
          "Strong Company Trend"
        );
      }

      if (companyScore <= 40) {
        risks.push(
          "Company Drop Trend"
        );
      }

      return {

        name:
          candidate["First Name"] ||
          candidate[
            "Candidate Name"
          ] ||
          "Unknown",

        joinProbability,

        dropProbability:
          100 -
          joinProbability,

        positives,

        risks,

      };

    }
  );

const recommendations =
  yetToOfferCandidates.map(
    (candidate: any) => {

      const current =
        Number(
          candidate["Current CTC"] || 0
        );

      const expected =
        Number(
          candidate["Expected CTC"] || 0
        );

      const companyScore =
        getHistoricalSuccessRate(
          "Current Company",
          candidate["Current Company"]
        );

      const positives: string[] = [];
      const risks: string[] = [];

      const recommendedCtc =
        expected > 0
          ? (
              expected * 1.05
            ).toFixed(2)
          : current.toFixed(2);

      const recommendBonus =
        current > 0 &&
        (
          (
            expected -
            current
          ) / current
        ) > 0.20;

      let predictedJoin =
        companyScore;

      if (recommendBonus) {
        predictedJoin += 10;

        positives.push(
          "Bonus Recommended"
        );
      }

      if (expected > current) {
        positives.push(
          "Expectation Identified"
        );
      }

      if (companyScore >= 70) {
        positives.push(
          "Strong Company Trend"
        );
      }

      if (companyScore <= 40) {
        risks.push(
          "Company Drop Trend"
        );
      }

      const notice =
        Number(
          candidate["Notice Period"] || 0
        );

      if (notice > 60) {
        risks.push(
          "High Notice"
        );
      } else {
        positives.push(
          "Manageable Notice"
        );
      }

      if (
        candidate[
          "Current Designation"
        ] ===
        candidate[
          "Offered Designation"
        ]
      ) {
        risks.push(
          "No Career Growth"
        );
      } else {
        positives.push(
          "Designation Growth"
        );
      }

      predictedJoin =
        Math.min(
          95,
          Math.max(
            40,
            predictedJoin
          )
        );

      let hiringSuggestion =
        "Proceed with Offer";

      if (
        recommendBonus &&
        notice > 60
      ) {
        hiringSuggestion =
          "Offer Bonus + Notice Buyout";
      } else if (
        recommendBonus
      ) {
        hiringSuggestion =
          "Offer Bonus";
      } else if (
        notice > 60
      ) {
        hiringSuggestion =
          "Notice Buyout Discussion";
      }

      return {

        name:
          candidate["First Name"] ||
          candidate["Candidate Name"] ||
          "Unknown",

        expected,

        recommendedCtc,

        recommendBonus,

        predictedJoin,

        positives,

        risks,

        hiringSuggestion,

      };

    }
  );

  return (
    <DashboardLayout>

      <div className="grid grid-cols-5 gap-4">

        <div className="bg-white rounded-xl shadow p-4">
          <div>Offer Accepted</div>
          <div className="text-3xl font-bold">
            {offerAcceptedCandidates.length}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <div>Likely Join</div>
          <div className="text-3xl font-bold text-green-600">
              {
              predictions.filter(
              (x: any) =>
              x.joinProbability >= 75
               ).length
           }
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <div>High Risk</div>
          <div className="text-3xl font-bold text-red-600">
             {
               predictions.filter(
               (x: any) =>
               x.joinProbability < 50
                ).length
          }
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <div>Yet To Offer</div>
          <div className="text-3xl font-bold text-orange-600">
            {yetToOfferCandidates.length}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <div>Predicted Join %</div>
          <div className="text-3xl font-bold text-blue-600">
            
{
  predictions.length > 0
    ? Number(
        (
          predictions.reduce(
            (
              a: number,
              b: any
            ) =>
              a +
              b.joinProbability,
            0
          ) /
          predictions.length
        ).toFixed(0)
      )
    : 0
}%

          </div>
        </div>

      </div>

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

      <div className="mt-8 bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-4">
  Offer Acceptance Prediction
</h2>

<table className="w-full">

  <thead>

    <tr className="border-b">

      <th className="text-left p-2">
        Candidate
      </th>

      <th className="p-2">
        Join %
      </th>

      <th className="p-2">
        Drop %
      </th>

      <th className="p-2">
        Intelligence
      </th>

    </tr>

  </thead>

  <tbody>

    {predictions.map(
      (
        item: any,
        index: number
      ) => (

        <tr
          key={index}
          className="border-b"
        >

          <td className="p-2">
            {item.name}
          </td>

          <td className="text-center p-2 font-bold text-green-600">
            {item.joinProbability}%
          </td>

          <td className="text-center p-2 font-bold text-red-600">
            {item.dropProbability}%
          </td>

          <td className="p-2">

            <div className="flex flex-wrap gap-2">

              {item.positives.map(
                (
                  tag: string,
                  idx: number
                ) => (

                  <span
                    key={`p-${idx}`}
                    className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>

                )
              )}

              {item.risks.map(
                (
                  tag: string,
                  idx: number
                ) => (

                  <span
                    key={`r-${idx}`}
                    className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs"
                  >
                    {tag}
                  </span>

                )
              )}

            </div>

          </td>

        </tr>

      )
    )}

  </tbody>

</table>

      </div>

      <div className="mt-8 bg-white rounded-xl shadow p-6">

       <tr className="border-b">

  <th className="text-left p-2">
    Candidate
  </th>

  <th className="p-2">
    Expected CTC
  </th>

  <th className="p-2">
    Recommended CTC
  </th>

  <th className="p-2">
    Bonus
  </th>

  <th className="p-2">
    Predicted Join %
  </th>

  <th className="p-2">
    Intelligence
  </th>

  <th className="p-2">
    Hiring Suggestion
  </th>

</tr>

<tbody>

  {recommendations.map(
    (
      item: any,
      index: number
    ) => (

      <tr
        key={index}
        className="border-b"
      >

        <td className="p-2">
          {item.name}
        </td>

        <td className="text-center p-2">
          {item.expected}
        </td>

        <td className="text-center p-2 font-bold text-green-600">
          {item.recommendedCtc}
        </td>

        <td className="text-center p-2">
          {item.recommendBonus
            ? "Recommended"
            : "Optional"}
        </td>

        <td className="text-center p-2 font-bold text-blue-600">
          {item.predictedJoin}%
        </td>

        <td className="p-2">

          <div className="flex flex-wrap gap-2">

            {item.positives.map(
              (
                tag: string,
                idx: number
              ) => (

                <span
                  key={`p-${idx}`}
                  className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs"
                >
                  {tag}
                </span>

              )
            )}

            {item.risks.map(
              (
                tag: string,
                idx: number
              ) => (

                <span
                  key={`r-${idx}`}
                  className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs"
                >
                  {tag}
                </span>

              )
            )}

          </div>

        </td>

        <td className="p-2 font-medium text-indigo-600">
          {item.hiringSuggestion}
        </td>

      </tr>

    )
  )}

</tbody>
      </div>

    </DashboardLayout>
  );
}