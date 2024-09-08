import React from "react";

const Card = ({ title, description }) => (
  <div className="w-full rounded-md border bg-blue-50 px-4 py-4">
    <h2 className="border-b font-semibold">{title}</h2>
    <h3 className="mt-4 truncate">{description}</h3>
  </div>
);

export default Card;
