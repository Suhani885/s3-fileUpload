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
  onReady: ({ chart }) => {
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
    <div className="flex flex-col justify-center items-center min-w-screen min-h-screen bg-slate gap-3">
      <div className="lg:w-2/3 bg-slate-100 p-6 rounded-xl border border-slate-200">
        <h1 className="text-black text-3xl font-bold text-center mb-5">User Login Frequency Data</h1>

        <Column {...config} />
      </div>

    </div>
  );
}
