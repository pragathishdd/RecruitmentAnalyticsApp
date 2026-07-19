interface Props {
  recruiter: string;
  setRecruiter: (value: string) => void;

  vertical: string;
  setVertical: (value: string) => void;

  taStatus: string;
  setTaStatus: (value: string) => void;

  fromDate: string;
  setFromDate: (value: string) => void;

  toDate: string;
  setToDate: (value: string) => void;

  recruiters: string[];
  verticals: string[];
}

export default function GlobalFilters({
  recruiter,
  setRecruiter,
  vertical,
  setVertical,
  taStatus,
  setTaStatus,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  recruiters,
  verticals,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-4">

      <h2 className="text-lg font-bold mb-4">
        Filters
      </h2>

      <div className="grid grid-cols-5 gap-4">

        <select
          value={recruiter}
          onChange={(e) =>
            setRecruiter(e.target.value)
          }
          className="border p-2 rounded"
        >
          <option value="">
            All Recruiters
          </option>

          {recruiters.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

        <select
          value={vertical}
          onChange={(e) =>
            setVertical(e.target.value)
          }
          className="border p-2 rounded"
        >
          <option value="">
            All Verticals
          </option>

          {verticals.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

        <select
          value={taStatus}
          onChange={(e) =>
            setTaStatus(e.target.value)
          }
          className="border p-2 rounded"
        >
          <option value="">
            All Status
          </option>

          <option value="Joined">
            Joined
          </option>

          <option value="Offer Accepted">
            Offer Accepted
          </option>

          <option value="Offer Dropped">
            Offer Dropped
          </option>

          <option value="Yet To Offer">
            Yet To Offer
          </option>

        </select>

        <input
          type="date"
          value={fromDate}
          onChange={(e) =>
            setFromDate(e.target.value)
          }
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) =>
            setToDate(e.target.value)
          }
          className="border p-2 rounded"
        />

      </div>
    </div>
  );
}