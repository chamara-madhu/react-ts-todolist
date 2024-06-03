import classNames from "classnames";
import { STATUS } from "../../../constant/general";

const StatusIndicators = ({ status }) => {
  const getStatus = () => {
    switch (status) {
      case STATUS.DONE:
        return "bg-purple-200 text-purple-900";
      default:
        return "bg-red-200 text-pink-900";
    }
  };

  return (
    <span
      className={classNames(
        "flex items-center w-fit bg-gray-300 text-sm font-medium h-6 px-4 rounded-full whitespace-nowrap",
        getStatus()
      )}
    >
      {status}
    </span>
  );
};

export default StatusIndicators;
