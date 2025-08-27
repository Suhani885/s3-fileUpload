import { Line } from "@ant-design/plots";
import { createFileRoute } from "@tanstack/react-router";
import { managerReportListOptions } from "~/services/api/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";
export const Route = createFileRoute("/user/")({
  component: RouteComponent,
});


function RouteComponent() {
  const { data, isLoading: loading } = useQuery(managerReportListOptions())
  console.log("data", data)
  if (loading) {
    return <h1 className="text-center w-full text-xl mt-5">Loading.....</h1>
  }

  const config = {
    data,
    xField: "date",
    yField: "count",
    theme: "dark",
  };
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
      <div className="w-full max-w-6xl bg-gray-800/80 backdrop-blur-xl border border-gray-700 shadow-2xl rounded-2xl p-8 pt-10">
        <div className="h-[450px]">
          <Line {...config} />
        </div>
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-gray-300 text-sm gap-3">
          <p className="italic">Login activity of your account</p>
        </div>
      </div>
    </div>
  );
}

export default RouteComponent;
