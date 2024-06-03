import { useMemo, ReactNode, MouseEvent } from "react";
import classnames from "classnames";
import UnCheck from "@/app/assets/icons/un-check.svg";
import CheckIcon from "@/app/assets/icons/check.svg";

type CheckboxProp = {
  children?: ReactNode;
  className?: string;
  variant?: "light";
  size?: "normal";
  name: string;
  value?: boolean;
  onChange?: (name: string, value: boolean) => void;
};

const Checkbox = ({
  children,
  name,
  value,
  className,
  variant,
  size,
  onChange,
}: CheckboxProp) => {
  const variantClass = useMemo(() => {
    switch (variant) {
      default:
        return !value
          ? `border-pp-gray-300`
          : `border-pp-primary-600 bg-pp-gray-50 text-pp-primary-600`;
    }
  }, [variant, value]);

  const variantSize = useMemo(() => {
    switch (size) {
      default:
        return `w-5 h-5`;
    }
  }, [size]);

  const toggle = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onChange) onChange(name, !value);
  };

  return (
    <div
      className={classnames("flex items-center gap-[10px]", className)}
      onClick={toggle}
    >
      <div
        className={classnames(
          "flex justify-center items-center cursor-pointer",
          variantSize,
          variantClass
        )}
      >
        {value ? <CheckIcon /> : <UnCheck />}
      </div>
      {children}
    </div>
  );
};

export default Checkbox;
