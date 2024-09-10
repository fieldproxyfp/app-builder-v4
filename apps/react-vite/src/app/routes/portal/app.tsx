
import { ContentLayout } from '@/components/layouts';
import { NavLink, Outlet, useParams } from 'react-router-dom';


export const AppRoute = () => {
    const { appId } = useParams();

    return (
        <ContentLayout title="App">
            <div className="mt-4">
                APP ID: {appId}
                <div className="flex  gap-4">
                    <NavLink to="data" className={({ isActive }) => isActive ? 'text-blue-500' : ''}>Data</NavLink>
                    <NavLink to="design" className={({ isActive }) => isActive ? 'text-blue-500' : ''}>Design</NavLink>
                    <NavLink to="settings" className={({ isActive }) => isActive ? 'text-blue-500' : ''}>Settings</NavLink>
                </div>
                <Outlet />
            </div>
        </ContentLayout>
    );
};
