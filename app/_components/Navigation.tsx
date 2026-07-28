import React from "react";

const Navigation = <T,>({
  data,
  render,
}: {
  data: T[];
  render: (data: T) => React.ReactNode;
}) => {
  return (
    <nav className="flex items-center gap-1 sm:gap-2">
      {data && data.map(render)}
    </nav>
  );
};

export default Navigation;
