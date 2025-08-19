import React from "react";
import { useParams } from "react-router-dom";

export default function FeedPlus() {
  const { pos } = useParams();
  return <div className="lg:w-xl w-full space-y-1">{pos}</div>;
}
