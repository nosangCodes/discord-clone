import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return (
    <div>
      <h1>Auth layout</h1>
      {children}
    </div>
  );
}
