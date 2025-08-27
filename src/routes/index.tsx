import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Form, FormProps, Input } from "antd";
import { ArrowRight, BarChart3, Building2, Shield, Users2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoginRequest, managerLoginRetrieve } from "~/services/api";
import { managerLoginCreateMutation } from "~/services/api/@tanstack/react-query.gen";
import { useAuth } from "~/utils/Context/Auth";

export const Route = createFileRoute("/")({
  component: LoginComponent,
  loader: async ({ context }) => {
    // console.log(context.isAuthenticated);
  },
});

type Login = {
  email: string;
  password: string;
};

function LoginComponent() {
  const [loc, setLoc] = useState<LoginRequest>({
    latitude: 0,
    longitude: 0,
  });
  const navigate = useNavigate();

  navigator.geolocation.getCurrentPosition((pos) => {
    setLoc((prv) => ({
      ...prv,
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
    }));
  });

  const auth = useAuth();
  const loginmutation = useMutation(managerLoginCreateMutation());

  const authFn = async () => {
    const user = await managerLoginRetrieve();
    if (user.status == 200) {
      navigate({ to: "/user" });
    }
  };

  useEffect(() => {
    authFn();
  }, []);

  const onFinish: FormProps<Login>["onFinish"] = (values) => {
    const token: string = btoa(values.email + ":" + values.password);
    console.log(token);
    loginmutation.mutate(
      {
        body: loc,
        headers: {
          Authorization: `Basic ${token}`,
        },
      },
      {
        onSuccess: (data) => {
          console.log(data);
          navigate({ to: "/user" });
        },
        onError: (data) => {
          toast.error(data.message);
        },
      }
    );
  };

  const onFinishFailed: FormProps<Login>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  // const auth = useAuth();
  // if (auth?.isAuthenticated) return <Navigate to="/user" />;
  return (
    <div className="h-screen w-full bg-white flex flex-row items-center justify-center  overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-indigo-50/30"></div>
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full -translate-x-16 -translate-y-16"></div>
      <div className="w-full md:w-1/3  flex flex-col p-10 gap-4 ">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-blue-700 from-blue-600 to-blue-800  rounded-lg flex items-center justify-center shadow-lg">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-medium text-gray-800 tracking-wide uppercase">
              Enterprise Resource Planning
            </h1>
          </div>
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-1">Welcome back</h3>
        <p className="text-gray-600">
          Sign in to your account to continue
        </p>{" "}
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="flex flex-col w-full justify-center text-md gap-1"
        >
          <div className="">
            <span className="font-medium gap-1 py-2">
              Email
              <span className="text-red-700">*</span>
            </span>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  pattern: /^[a-zA-Z]+[a-zA-Z0-9]+[@][a-z]+[\.][a-z]{2,}$/,
                  message: "input field must be email",
                },
              ]}
            >
              <Input placeholder="example@gmail.com" />
            </Form.Item>
          </div>

          <div>
            <span className="py-2">
              Password
              <span className="text-red-700">*</span>
            </span>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="password" />
            </Form.Item>
          </div>
          <Form.Item label={null} className=" w-full">
            <button
              type="submit"
              className="group relative w-full flex justify-center items-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
            >
              Sign In
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </Form.Item>
        </Form>
      </div>
      <div className="w-0 md:w-2/3 h-full relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 border border-white/30 rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-32 left-40 w-32 h-32 border border-white/25 rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 border border-white/15 rounded-full"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center p-12 text-white">
          <div className="max-w-lg">
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Streamline Your Business Operations
            </h2>
            <p className="text-xl text-blue-100 mb-12 leading-relaxed">
              Powerful ERP solutions designed to optimize your workflow,
              increase productivity, and drive growth.
            </p>

            <div className="grid grid-cols-1 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">Secure & Reliable</h3>
                    <p className="text-blue-100 text-sm">
                      Enterprise-grade security and 99.9% uptime
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Users2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">
                      Team Collaboration
                    </h3>
                    <p className="text-blue-100 text-sm">
                      Seamless integration across departments
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-lg">
                      Advanced Analytics
                    </h3>
                    <p className="text-blue-100 text-sm">
                      Real-time insights and reporting
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
