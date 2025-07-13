import React from "react";

const Navigation = <T,>({
  data,
  render,
}: {
  data: T[];
  render: (data: T) => React.ReactNode;
}) => {
  return (
    <nav className="h-full hidden md:flex items-center gap-5">
      {data && data.map(render)}
    </nav>
  );
};

export default Navigation;
