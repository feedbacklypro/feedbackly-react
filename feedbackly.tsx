import React from "react";
import { FeedbacklyWidget } from "./feedbackly-widget";

interface FeedbacklyProps {
  trigger: React.ReactNode;
}

export const Feedbackly = ({ trigger }: FeedbacklyProps) => {
  return <FeedbacklyWidget trigger={trigger} />;
};
