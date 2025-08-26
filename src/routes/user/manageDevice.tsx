import { createFileRoute } from "@tanstack/react-router";
import { Space, Table, Tag, Card } from "antd";
import type { TableProps } from "antd";

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
      <span className="font-semibold text-gray-100">{text}</span>
    ),
  },
  {
    title: "Location",
    dataIndex: "loc",
    key: "loc",
    render: (text) => (
      <span className="text-gray-300 cursor-pointer ">
        {text}
      </span>
    ),
  },
  {
    title: "IP Address",
    dataIndex: "ip",
    key: "ip",
    render: (text) => (
      <span className="font-mono text-sm text-gray-400">{text}</span>
    ),
  },
  {
    title: "Logged In",
    dataIndex: "login",
    key: "login",
    render: (text) => (
      <span className="text-sm text-gray-300">{text}</span>
    ),
  },
  {
    title: "Last Active",
    dataIndex: "last",
    key: "last",
    render: (text) => (
      <span className="text-sm text-gray-400">{text}</span>
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
                ? "bg-green-900/50 text-green-300 border border-green-700"
                : "bg-red-900/50 text-red-300 border border-red-700"
                }`}
            >
              <div
                className={`w-2 h-2 rounded-full mr-2 ${isActive ? "bg-green-400" : "bg-red-400"
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
        <button className="text-blue-400 hover:text-blue-300 hover:underline font-medium text-sm transition-colors duration-200">
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
          className="shadow-lg border border-gray-700 rounded-lg overflow-hidden bg-gray-800/80 backdrop-blur-xl"
          bodyStyle={{ padding: 0, backgroundColor: 'transparent' }}
        >
          <Table<DataType>
            columns={columns}
            dataSource={data}
            pagination={false}
            className="[&_.ant-table]:bg-transparent [&_.ant-table-container]:bg-transparent [&_.ant-table-thead_.ant-table-cell]:bg-gray-700/50 [&_.ant-table-thead_.ant-table-cell]:font-semibold [&_.ant-table-thead_.ant-table-cell]:text-gray-200 [&_.ant-table-thead_.ant-table-cell]:border-b-2 [&_.ant-table-thead_.ant-table-cell]:border-gray-600 [&_.ant-table-tbody_.ant-table-cell]:border-b [&_.ant-table-tbody_.ant-table-cell]:border-gray-700 [&_.ant-table-tbody_.ant-table-cell]:py-4 [&_.ant-table-tbody_.ant-table-cell]:bg-transparent [&_.ant-table-tbody_.ant-table-row]:bg-transparent [&_.ant-table-tbody_.ant-table-row:hover]:bg-transparent [&_.ant-table-tbody_.ant-table-row:hover>td]:bg-transparent"
            size="large"
          />
        </Card>
      </div>
    </div>
  );
} 