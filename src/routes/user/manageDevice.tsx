import { createFileRoute } from "@tanstack/react-router";
import { Space, Table, Tag, Card } from "antd";
import type { TableProps } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { managerActivityRetrieveOptions, managerActivityUpdateMutation, managerActivityDestroyMutation, managerActivityRetrieveQueryKey } from "~/services/api/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
interface DataType {
  id: number;
  device_det: string;
  user_location: string;
  ip_address: string;
  last_login: string;
  last_active: string;
  is_active: boolean;
  is_flagged: boolean;
}




export const Route = createFileRoute("/user/manageDevice")({
  component: RouteComponent,
});

function RouteComponent() {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Device",
      dataIndex: "device_det",
      key: "device_det",
      render: (text) => (
        <span className="font-semibold text-gray-100">{text}</span>
      ),
    },
    {
      title: "Location",
      dataIndex: "user_location",
      key: "user_location",
      render: (text) => (
        <span className="text-gray-300 cursor-pointer ">
          {text}
        </span>
      ),
    },
    {
      title: "IP Address",
      dataIndex: "ip_address",
      key: "ip_address",
      render: (text) => (
        <span className="font-mono text-sm text-gray-400">{text}</span>
      ),
    },
    {
      title: "Logged In",
      dataIndex: "last_login",
      key: "last_login	",
      render: (text) => (
        <span className="text-sm text-gray-300">{text}</span>
      ),
    },
    {
      title: "Last Active",
      dataIndex: "last_active",
      key: "last_active",
      render: (text) => (
        <span className="text-sm text-gray-400">{text}</span>
      ),
    },
    {
      title: "Session",
      dataIndex: "is_active",
      key: "is_active",
      render: (text) => (
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${text == true
            ? "bg-green-900/50 text-green-300 border border-green-700"
            : "bg-red-900/50 text-red-300 border border-red-700"
            }`}
        >
          <div
            className={`w-2 h-2 rounded-full mr-2 ${text == true ? "bg-green-400" : "bg-red-400"
              }`}
          />
          {text == true ? "Active" : "Inactive"}
        </span>
      )
    },

    {
      title: "Action",
      key: "is_flagged",
      dataIndex: "is_flagged",
      render: (text, record) => (
        <div className="flex gap-4">
          <div>
            {
              text == false ? (
                <Space >
                  <button
                    className="text-blue-400 hover:text-blue-300 hover:underline font-medium text-sm transition-colors duration-200"
                    onClick={() => handleFlag(record.id)}
                  >
                    Flag
                  </button>
                </Space>
              ) : (
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-900/50 text-red-300 border border-red-700`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mr-2 bg-red-400`}
                  />
                  Flagged
                </span>
              )
            }
          </div>
          <Space >
            {
              text == false ? (
                <button
                  className="text-blue-400 hover:text-blue-300 hover:underline font-medium text-sm transition-colors duration-200"
                  onClick={() => handleLogout(record.id)}
                >
                  Logout
                </button>
              ) : ""}
          </Space>

        </div>
      ),
    },
  ];
  const queryClient = useQueryClient();
  const { data, isLoading: loading } = useQuery(managerActivityRetrieveOptions())
  const flagMutation = useMutation(managerActivityUpdateMutation())
  const logOutMutation = useMutation(managerActivityDestroyMutation())
  const handleFlag = (id: number) => {
    console.log(id)
    flagMutation.mutate(
      {
        body: {
          is_flagged: true,
          is_active: false,
          id: id
        }
      },
      {
        onSuccess: (data) => {
          toast.success("Flagged Successfully")
          queryClient.invalidateQueries({ queryKey: managerActivityRetrieveQueryKey() })

        },
        onError: (error) => {
          toast.error("Error");
        }
      }
    )
  }
  const handleLogout = (id: number) => {
    console.log(id)
    logOutMutation.mutate(
      {
        query: {
          id: id
        }
      },
      {
        onSuccess: (data) => {
          toast.success("Logout Successfully")
          queryClient.invalidateQueries({ queryKey: managerActivityRetrieveQueryKey() })

        },
        onError: (error) => {
          toast.error("Error");
        }
      }
    )
  }
  if (loading) {
    return (
      <h1 className="text-center w-full text-xl mt-5">Loading.....</h1>
    )
  }
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
            dataSource={Array.isArray(data) ? data : []}
            pagination={false}
            className="[&_.ant-table]:bg-transparent [&_.ant-table-container]:bg-transparent [&_.ant-table-thead_.ant-table-cell]:bg-gray-700/50 [&_.ant-table-thead_.ant-table-cell]:font-semibold [&_.ant-table-thead_.ant-table-cell]:text-gray-200 [&_.ant-table-thead_.ant-table-cell]:border-b-2 [&_.ant-table-thead_.ant-table-cell]:border-gray-600 [&_.ant-table-tbody_.ant-table-cell]:border-b [&_.ant-table-tbody_.ant-table-cell]:border-gray-700 [&_.ant-table-tbody_.ant-table-cell]:py-4 [&_.ant-table-tbody_.ant-table-cell]:bg-transparent [&_.ant-table-tbody_.ant-table-row]:bg-transparent [&_.ant-table-tbody_.ant-table-row:hover]:bg-transparent [&_.ant-table-tbody_.ant-table-row:hover>td]:bg-transparent"
            size="large"
          />
        </Card>
      </div>
    </div>
  );
} 