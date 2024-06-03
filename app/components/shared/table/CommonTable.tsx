import classNames from "classnames";

interface Column {
  header: string;
  accessor: keyof any;
  render?: any;
}

interface TableProps {
  columns: Column[];
  data: any[] | null;
  onSelect?: (id: string) => void;
}

const CommonTable = ({ columns, data, onSelect }: TableProps) => {
  return (
    <table className="min-w-full divide-y divide-gray-200 table-fixed">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500"
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data?.length ? (
          data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onSelect && onSelect(row.id)}
              className="cursor-pointer hover:bg-purple-100"
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4 text-sm">
                  {column.render ? column.render(row) : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td className="px-6 py-4 text-sm" colSpan={4}>
              No records
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CommonTable;
