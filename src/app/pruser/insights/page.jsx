import dynamic from "next/dynamic";

const InsightsPageComponent = dynamic(
  () => import("./InsightsPageComponent"),
  { ssr: false }
);

export default InsightsPageComponent;
