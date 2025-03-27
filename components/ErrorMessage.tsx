import React from "react";

const ErrorMessage = ({ error }: { error: any }) => {
  return <p className="text-xs text-red-500">{error}</p>;
};

export default ErrorMessage;
