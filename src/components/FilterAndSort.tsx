import { Filter, Sort } from "../hooks/useFilter";

type FilterProps = {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  sort: Sort;
  setSort: (sort: Sort) => void;
};

export const FilterAndSort = ({
  filter,
  setFilter,
  sort,
  setSort,
}: FilterProps) => {
  return (
    <div className="flex gap-8">
      <div>
        <span className="mr-4">Filter by:</span>
        <select
          value={filter}
          onChange={(e) => {
            console.log(e.target.value);
            setFilter(e.target.value as "all" | "completed" | "pending");
          }}
          className="p-2 mb-10 border rounded bg-[#61dafbaa] text-white font-bold"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div>
        <span className="mr-4">Sort by:</span>
        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value as "name" | "date" | "status")
          }
          className="p-2 mb-10 border rounded bg-[#61dafbaa] text-white font-bold"
        >
          <option value="date">Date</option>
          <option value="name">Name</option>
          <option value="status">Status</option>
        </select>
      </div>
    </div>
  );
};
