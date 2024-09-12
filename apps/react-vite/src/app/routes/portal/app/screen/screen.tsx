import { NavLink, Outlet, useParams } from "react-router-dom";


export const ScreenRoute = () => {
    const { appId, screenId } = useParams();
    return <div className="flex flex-col"> Screen {screenId} of App {appId}

        <div className="flex  gap-4">
            <NavLink to="data" className={({ isActive }) => isActive ? 'text-blue-500' : ''}>Data</NavLink>
            <NavLink to="design" className={({ isActive }) => isActive ? 'text-blue-500' : ''}>Design</NavLink>
            <NavLink to="settings" className={({ isActive }) => isActive ? 'text-blue-500' : ''}>Actions</NavLink>
        </div>

        <Outlet />
    </div>
}