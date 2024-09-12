
import { NavLink, Outlet, useParams } from 'react-router-dom';


export const AppRoute = () => {
    const { appId } = useParams();

    return (
        <div className="size-full flex flex-col flex-grow ">
            <header className=" h-14 bg-background flex justify-between items-center border-b-[1px] border-border1">

            </header>
            <main className="flex flex-col flex-grow p-2">
                APP ID: {appId} Layer
                <div className="flex gap-4">
                    <NavLink to="screen-1" className={({ isActive }) => isActive ? 'text-blue-500' : ''}>Screen 1</NavLink>
                    <NavLink to="screen-2" className={({ isActive }) => isActive ? 'text-blue-500' : ''}>Screen 2</NavLink>
                </div>
                <Outlet />
            </main>

        </div>
    );
};
