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
  return <ul className={className}>{data && data.map(render)}</ul>;
};

export default CustomUl;
