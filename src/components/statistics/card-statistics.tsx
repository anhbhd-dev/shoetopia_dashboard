import classNames from "classnames";
import { ReactNode } from "react";

type CardStatisticsProps = {
  children: ReactNode;
  className?: string;
};

export default function CardStatistics({
  children,
  className,
}: CardStatisticsProps) {
  return (
    <div className={classNames("rounded-md w-full border", className)}>
      <div className="flex items-center justify-start gap-10 ">{children}</div>
    </div>
  );
}
