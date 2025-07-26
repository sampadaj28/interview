import { Pagination, Stack } from "@mui/material";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Table = ({
  cols,
  data,
  totalPages,
  rowsPerPage,
  page,
  handlePageChange,
  handleRowsPerPageChange,
  isTableLoading,
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    setSortConfig({ key: "default", direction: "desc" });
  }, []);

  const sortedData = () => {
    if (sortConfig.key !== null) {
      const sortedItems = [...data];
      sortedItems.sort((a, b) => {
        const valueA = a[sortConfig.key];
        const valueB = b[sortConfig.key];

        if (typeof valueA === "number" && typeof valueB === "number") {
          return sortConfig.direction === "asc" ? valueA - valueB : valueB - valueA;
        }

        const strA = String(valueA || "").toLowerCase();
        const strB = String(valueB || "").toLowerCase();
        return sortConfig.direction === "asc"
          ? strA.localeCompare(strB)
          : strB.localeCompare(strA);
      });

      return sortedItems;
    }
    return data;
  };

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };
  return (
    <div className="p-2 bg-primaryDarkCards rounded-lg border border-primaryGray-700 overflow-x-auto table-content">
      <table className="min-w-full divide-y divide-gray-200 suppportable">
        <thead>
          <tr>
            {cols.map((col, index) => (
              <th
                key={index}
                style={{ cursor: col.sortable ? "pointer" : "default" }}
                className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                onClick={() => col.sortable && requestSort(col.key)}
              >
                <div className="flex justify-center items-center gap-1">
                  {col.title}
                  {col.sortable && sortConfig.key === col.key && (
                    <ArrowUpDownIcon className="filterarrow" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-600">
          {isTableLoading ? (
            <tr>
              <td colSpan={cols.length}>
                <SkeletonTheme baseColor="#202020" highlightColor="#19191c" height={30}>
                  <Skeleton count={10} />
                </SkeletonTheme>
              </td>
            </tr>
          ) : data?.length === 0 ? (
            <tr>
              <td colSpan={cols.length} className="text-center py-6">
                <img src="/datanotfound.svg" alt="No data" style={{ width: "150px", margin: "auto" }} />
              </td>
            </tr>
          ) : (
            sortedData().map((item, rowIndex) => (
              <tr key={rowIndex}>
                {cols.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-6 py-4 text-xs font-medium text-gray-500 tracking-wider"
                    style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                  >
                    {col.render ? col.render(item, rowIndex) : item[col.dataIndex]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Stack spacing={2} direction="row" className="mt-3 flex justify-between">
     <select
  className="p-2 bg-primaryDarkCards border border-primaryGray-700 text-sm rounded"
  value={rowsPerPage}
  onChange={(e) => handleRowsPerPageChange(Number(e.target.value))}  // FIXED LINE
>
  <option value={10}>10 per page</option>
  <option value={20}>20 per page</option>
  <option value={50}>50 per page</option>
</select>


        <Pagination
          page={page}
          onChange={handlePageChange}
          count={totalPages}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </div>
  );
};

export default Table;
