import { Progress } from "./dashboard-layout"


export function AppLayout({ children }: { children: React.ReactNode }) {
    return <div className="flex min-h-screen w-full flex-col bg-muted/40 ">
        <Progress />
        {children}
    </div>
}