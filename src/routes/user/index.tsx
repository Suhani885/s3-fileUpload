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
  theme: 'dark',

}

function RouteComponent() {
  return (
    <div className="flex flex-col items-center gap-10  min-h-screen w-full px-4">
      <div className="w-full max-w-6xl">
        <div className="mt-10">
          <h1 className="text-3xl font-bold text-white mb-2">
            User Login Insights
          </h1>
          <p className="text-slate-300">
            View and analyze daily login activity across your account.
          </p>
        </div>
      </div>
      <div className="w-full max-w-5xl bg-gray-800/80 backdrop-blur-xl border border-gray-700 shadow-2xl rounded-2xl p-8 pt-10">
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