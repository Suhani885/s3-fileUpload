import { Column } from "@ant-design/plots";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/user/")({
  component: RouteComponent,
});

const data = [
  { letter: "A", frequency: 8167 },
  { letter: "B", frequency: 1492 },
  { letter: "C", frequency: 2782 },
  { letter: "D", frequency: 4253 },
  { letter: "E", frequency: 12702 },
  { letter: "F", frequency: 2288 },
  { letter: "G", frequency: 2015 },
  { letter: "H", frequency: 6094 },
  { letter: "I", frequency: 6966 },
  { letter: "J", frequency: 153 },
];

const config = {
  data,
  xField: "letter",
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
    <div className="flex justify-center items-center min-w-screen min-h-screen bg-slate gap-3">
      <div className="w-1/2 bg-slate-100 p-6 rounded-xl border border-slate-200">
        <Column {...config} />
      </div>
      <div className="w-1/2">data</div>
    </div>
  );
}
