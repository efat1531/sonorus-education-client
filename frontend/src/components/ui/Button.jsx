import { twMerge } from "tailwind-merge";
import Loader from "./Loader";
const Button = ({ title, className, disabled, loading, ...rest }) => {
  return (
    <button
      className={twMerge(
        `h-12 bg-Primary-100  group-hover:duration-[250ms] ${
          disabled
            ? "bg-gray-700 hover:bg-gray-700"
            : "group-hover:bg-Primary-500 cursor-pointer"
        }`,
        className
      )}
      {...rest}
      disabled={disabled}
    >
      <div
        className={`capitalize text-base font-semibold text-orange-500 px-6 leading-[48px]  group-hover:duration-[250ms] ${
          disabled ? "text-slate-400" : "group-hover:text-white"
        }`}
      >
        {!disabled ? (
          title
        ) : loading ? (
          <span className="flex gap-2 items-center justify-center">
            {title} <Loader />{" "}
          </span>
        ) : (
          title
        )}
      </div>
    </button>
  );
};

export default Button;
