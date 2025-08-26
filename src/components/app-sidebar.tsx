import {
    Calendar,
    Home,
    Inbox,
    Search,
    Settings,
    BookOpen,
    Layers,
    Users,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
} from "./ui/sidebar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const platformItems = [
    {
        title: "Playground",
        url: "#",
        icon: Home,
        children: [
            { title: "Dashboard", url: "/user" },
            { title: "Manage Device", url: "/user/manageDevice" },
        ],
    },
    {
        title: "Models",
        url: "#",
        icon: Layers,
    },
    {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

export function AppSidebar() {
    return (
        <Sidebar >
            <SidebarContent >
                <SidebarGroup>
                    <SidebarGroupLabel>
                        <div className="flex items-center space-x-2">
                            <div className="h-10 w-10 mt-3 bg-blue-500 rounded-md" />
                            <div>
                                <p className="font-medium mt-3 text-[1rem]">Acme Inc</p>
                                <p className="text-[.8rem] mt-1 text-muted-foreground">Enterprise</p>
                            </div>
                        </div>
                    </SidebarGroupLabel>
                </SidebarGroup>
                <hr className="my-3" />
                <SidebarGroup>
                    <SidebarGroupLabel className="text-md">Platform</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {platformItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url} className="flex items-center gap-2">
                                            <item.icon className="h-6 w-6" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                    {item.children && (
                                        <div className="ml-6 mt-1 space-y-1">
                                            {item.children.map((child) => (
                                                <a
                                                    key={child.title}
                                                    href={child.url}
                                                    className="block text-sm text-muted-foreground hover:text-foreground"
                                                >
                                                    {child.title}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <hr />
            <SidebarFooter>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex cursor-pointer items-center gap-3 px-3 py-2 rounded-md hover:bg-muted/50">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>SC</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">shadcn</span>
                                <span className="text-xs text-muted-foreground">
                                    m@example.com
                                </span>
                            </div>
                        </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent side="top" align="end" className="w-48">
                        <DropdownMenuItem onClick={() => console.log("Logout clicked")}>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
