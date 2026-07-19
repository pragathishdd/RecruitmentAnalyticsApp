interface Props {
  fromDate: string;
  toDate: string;
  setFromDate: (value: string) => void;
  setToDate: (value: string) => void;
}

export default function DateRangeFilter({
  fromDate,
  toDate,
  setFromDate,
  setToDate,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mt-6">
      <h2 className="text-lg font-bold mb-4">
        Date Range Filter
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <div>
          <label>From Date</label>

          <input
            type="date"
            value={fromDate}
            onChange={(e) =>
              setFromDate(e.target.value)
            }
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label>To Date</label>

          <input
            type="date"
            value={toDate}
            onChange={(e) =>
              setToDate(e.target.value)
            }
            className="border rounded p-2 w-full"
          />
        </div>

      </div>
    </div>
  );
}