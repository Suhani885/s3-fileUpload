import { createFileRoute } from "@tanstack/react-router";
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: string;
  loc: string;
  ip: number;
  login: string;
  last: string;
  device: string;
  tags: string[];
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Device',
    dataIndex: 'device',
    key: 'device',
  },
  {
    title: 'Location',
    dataIndex: 'loc',
    key: 'loc',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'IP Address',
    dataIndex: 'ip',
    key: 'ip',
  },
  {
    title: 'Logged In',
    dataIndex: 'login',
    key: 'login',
  },
  {
    title: 'Last Active',
    dataIndex: 'last',
    key: 'last',
  },
  {
    title: 'Session',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 6 ? 'volcano' : 'green';
          if (tag === 'Inactive') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>Flag</a>
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    loc: 'Samsung',
    ip: 32,
    login: 'New York No. 1 Lake Park',
    last: 'New York No. 1 Lake Park',
    device: 'New York No. 1 Lake Park',
    tags: ['Active'],
  },
  {
    key: '2',
    loc: 'Apple',
    ip: 42,
    login: 'New York No. 1 Lake Park',
    last: 'New York No. 1 Lake Park',
    device: 'New York No. 1 Lake Park',
    tags: ['Active'],
  },
  {
    key: '3',
    loc: 'Nokia',
    ip: 32,
    login: 'New York No. 1 Lake Park',
    last: 'New York No. 1 Lake Park',
    device: 'New York No. 1 Lake Park',
    tags: ['Inactive'],
  },
];

export const Route = createFileRoute("/devices")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex justify-center items-center min-w-screen min-h-screen bg-slate gap-3">
      <Table<DataType> columns={columns} dataSource={data} />
    </div>
  )
}
