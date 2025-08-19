import React from "react";
import { useParams } from "react-router-dom";

export default function FeedPlus() {
  const { id } = useParams();
  return <div className="bg-red-200">{id}</div>;
}
