import { createFileRoute } from "@tanstack/react-router";
import { Space, Table, Tag, Card } from "antd";
import type { TableProps } from "antd";
import { useQueryClient } from "@tanstack/react-query";

interface DataType {
  key: string;
  loc: string;
  ip: number;
  login: string;
  last: string;
  device: string;
  tags: string[];
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Device",
    dataIndex: "device",
    key: "device",
    render: (text) => (
      <span className="font-semibold text-gray-900">{text}</span>
    ),
  },
  {
    title: "Location",
    dataIndex: "loc",
    key: "loc",
    render: (text) => (
      <span className="text-gray-700 hover:text-blue-600 hover:underline cursor-pointer transition-colors duration-200">
        {text}
      </span>
    ),
  },
  {
    title: "IP Address",
    dataIndex: "ip",
    key: "ip",
    render: (text) => (
      <span className="font-mono text-sm text-gray-600">{text}</span>
    ),
  },
  {
    title: "Logged In",
    dataIndex: "login",
    key: "login",
    render: (text) => (
      <span className="text-sm text-gray-700">{text}</span>
    ),
  },
  {
    title: "Last Active",
    dataIndex: "last",
    key: "last",
    render: (text) => (
      <span className="text-sm text-gray-600">{text}</span>
    ),
  },
  {
    title: "Session",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <div className="flex gap-2">
        {tags.map((tag) => {
          const isActive = tag === "Active";
          return (
            <span
              key={tag}
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${isActive
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
                }`}
            >
              <div
                className={`w-2 h-2 rounded-full mr-2 ${isActive ? "bg-green-500" : "bg-red-500"
                  }`}
              />
              {tag}
            </span>
          );
        })}
      </div>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <button className="text-blue-600 hover:text-blue-800 hover:underline font-medium text-sm transition-colors duration-200">
          Flag
        </button>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    loc: "India",
    ip: 90,
    login: "10 JAN, 2025 (10:30 AM)",
    last: "Today, 10:30 AM",
    device: "Galaxy S21",
    tags: ["Active"],
  },
  {
    key: "2",
    loc: "America",
    ip: 42,
    login: "17 JAN, 2025 (10:30 AM)",
    last: "Yesterday, 5:12 PM",
    device: "MacBook Pro",
    tags: ["Active"],
  },
  {
    key: "3",
    loc: "Ireland",
    ip: 32,
    login: "30 JAN, 2025 (10:30 AM)",
    last: "2 days ago",
    device: "Nokia A1",
    tags: ["Inactive"],
  },
  {
    key: "4",
    loc: "Ireland",
    ip: 32,
    login: "30 JAN, 2025 (10:30 AM)",
    last: "2 days ago",
    device: "Nokia A1",
    tags: ["Inactive"],
  },
  {
    key: "5",
    loc: "Ireland",
    ip: 32,
    login: "30 JAN, 2025 (10:30 AM)",
    last: "2 days ago",
    device: "Nokia A1",
    tags: ["Inactive"],
  },
];

export const Route = createFileRoute("/user/manageDevice")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();

  return (
    <div className="flex justify-center min-h-screen flex-1 pt-10">
      <div className="w-full max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Manage Devices
          </h1>
          <p className="text-slate-300">
            Monitor and manage all connected devices across your organization
          </p>
        </div>

        <Card
          className="shadow-sm border border-gray-200 rounded-lg overflow-hidden"
          bodyStyle={{ padding: 0 }}
        >
          <Table<DataType>
            columns={columns}
            dataSource={data}
            pagination={{
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} devices`,
              className: "py-4 bg-gray-50 border-t border-gray-200",
            }}
            rowClassName="hover:bg-blue-50 transition-colors duration-150"
            className="[&_.ant-table-thead_.ant-table-cell]:bg-gray-100 [&_.ant-table-thead_.ant-table-cell]:font-semibold [&_.ant-table-thead_.ant-table-cell]:text-gray-800 [&_.ant-table-thead_.ant-table-cell]:border-b-2 [&_.ant-table-thead_.ant-table-cell]:border-gray-200 [&_.ant-table-tbody_.ant-table-cell]:border-b [&_.ant-table-tbody_.ant-table-cell]:border-gray-100 [&_.ant-table-tbody_.ant-table-cell]:py-4"
            size="large"
          />
        </Card>
      </div>
    </div>
  );
}
