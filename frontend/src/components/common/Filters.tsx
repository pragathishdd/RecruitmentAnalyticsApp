interface Props {
  recruiter: string;
  setRecruiter: (value: string) => void;
}

export default function Filters({
  recruiter,
  setRecruiter,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-6">
      <label className="block mb-2 font-semibold">
        Recruiter Filter
      </label>

      <input
        value={recruiter}
        onChange={(e) =>
          setRecruiter(e.target.value)
        }
        placeholder="Enter recruiter name"
        className="border rounded p-2 w-full"
      />
    </div>
  );
}