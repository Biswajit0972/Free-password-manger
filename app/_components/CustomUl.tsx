import React from "react";

const CustomUl = <T,>({
  data,
  render,
  className,
}: {
  data: T[];
  render: (data: T, index?:number) => React.ReactNode;
  className?: string;
}) => {
  if (!data || data.length === 0) {
    return <div className="text-center text-gray-500">No items found</div>;
  }
  return <ul className={className}>{data && data.map(render)}</ul>;
};

export default CustomUl;
