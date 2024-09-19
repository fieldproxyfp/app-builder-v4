import { useNavigate } from 'react-router';

import logo from '@/assets/logo.svg';
import { Head } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { useUser } from '@/lib/auth';

export const LandingRoute = () => {
  const navigate = useNavigate();
  const user = useUser();
  console.log({ user: user.data });
  const handleStart = () => {
    if (user.data) {
      navigate('/portal');
    } else {
      navigate('/auth/login');
    }
  };

  return (
    <>
      <Head description="Welcome to Fieldproxy" />
      <div className="flex h-screen items-center bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Fieldproxy</span>
          </h2>
          <img src={logo} alt="react" />
          <p>Showcasing Best Practices For Building React Applications</p>
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-md shadow">
              <Button onClick={handleStart} icon={'home'}>
                Get started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
