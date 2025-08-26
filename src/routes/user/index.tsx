import { Column } from "@ant-design/plots";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/user/")({
  component: RouteComponent,
});

const data = [
  { date: "01/05/2025", frequency: 10 },
  { date: "02/05/2025", frequency: 16 },
  { date: "03/05/2025", frequency: 7 },
  { date: "04/05/2025", frequency: 12 },
  { date: "05/05/2025", frequency: 9 },
  { date: "06/05/2025", frequency: 12 },
  { date: "07/05/2025", frequency: 9 },
];

const config = {
  data,
  xField: "date",
  yField: "frequency",
  color: "#60a5fa",
  columnStyle: {
    radius: [6, 6, 0, 0],
  },
  label: {
    position: "top",
    style: {
      fill: "#f3f4f6",
      fontSize: 13,
      fontWeight: 500,
    },
  },
  xAxis: {
    label: {
      style: { fill: "#d1d5db", fontSize: 12 },
    },
    line: {
      style: { stroke: "#4b5563" },
    },
  },
  yAxis: {
    label: {
      style: { fill: "#d1d5db", fontSize: 12 },
    },
    grid: {
      line: {
        style: { stroke: "#374151", lineWidth: 1, lineDash: [4, 4] },
      },
    },
  },
  tooltip: {
    showTitle: false,
    domStyles: {
      "g2-tooltip": {
        backgroundColor: "#1f2937",
        color: "#f9fafb",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
      },
    },
  },
  onReady: ({ chart }: { chart: any }) => {
    try {
      const { height } = chart._container.getBoundingClientRect();
      const tooltipItem = data[Math.floor(Math.random() * data.length)];
      chart.on(
        "afterrender",
        () => {
          chart.emit("tooltip:show", {
            data: {
              data: tooltipItem,
            },
            offsetY: height / 2 - 60,
          });
        },
        true
      );
    } catch (e) {
      console.error(e);
    }
  },
};

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full  px-4">
      <div className="w-full max-w-5xl bg-gray-800/80 backdrop-blur-xl border border-gray-700 shadow-2xl rounded-2xl p-8">
        <h1 className="text-gray-100 text-3xl lg:text-4xl font-bold text-center mb-8">
          📊 User Login Frequency
        </h1>
        <div className="h-[450px]">
          <Column {...config} />
        </div>
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-gray-300 text-sm gap-3">
          <p className="italic">Login activity for May 2025</p>
          <p className="font-medium">
            Total logins:{" "}
            <span className="text-blue-400 font-semibold">
              {data.reduce((sum, d) => sum + d.frequency, 0)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RouteComponent;
