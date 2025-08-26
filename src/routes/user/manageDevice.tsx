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
  },
  {
    title: "Location",
    dataIndex: "loc",
    key: "loc",
    render: (text) => <a className="text-blue-600 hover:underline">{text}</a>,
  },
  {
    title: "IP Address",
    dataIndex: "ip",
    key: "ip",
  },
  {
    title: "Logged In",
    dataIndex: "login",
    key: "login",
  },
  {
    title: "Last Active",
    dataIndex: "last",
    key: "last",
  },
  {
    title: "Session",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag === "Inactive" ? "volcano" : "green";
          return (
            <Tag color={color} key={tag} className="px-2 py-1 rounded-md text-xs font-semibold">
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <a className="text-blue-600 hover:underline font-medium">Flag</a>
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
];

export const Route = createFileRoute("/user/manageDevice")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br p-6">
      <Card className="w-full max-w-6xl shadow-lg rounded-xl">
        <h1 className="text-2xl font-bold mb-8 text-black">Manage Devices</h1>
        <Table<DataType>
          bordered
          columns={columns}
          dataSource={data}
          pagination={false}
          rowClassName="hover:bg-slate-50"
        />
      </Card>
    </div>
  );
}
