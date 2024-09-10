import { ContentLayout } from '@/components/layouts';
import { Button } from '@/components/ui/button';
import API_END_POINTS from '@/constants/apiEndPoints';
import { useUser } from '@/lib/auth';
import { ROLES } from '@/lib/authorization';
import { BackEndRequest } from '@/services/api-service/ProtectedApiInstance';

export const DashboardRoute = () => {
  const user = useUser();

  const getProfile = async () => {
    const response = await BackEndRequest.Get(
      API_END_POINTS.ACCOUNT_USER.GET_ACCOUNT_USER,
    );
    console.log({ response });
  };
  return (
    <ContentLayout title="Dashboard" >
      <h1 className="text-xl">
        Welcome <b>{`${user.data?.firstName} ${user.data?.lastName}`}</b>
      </h1>

      <h4 className="my-3">
        Your Email is : <b>{user.data?.emailId}</b>
      </h4>
      <div className='flex justify-start w-full gap-2 mb-2'>
      <Button onClick={getProfile}>Call Profile</Button>
      <Button variant="destructive" onClick={getProfile}>
        Destructive
      </Button>
      <Button variant="outline"> Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant={'secondary'} onClick={getProfile}>
        Secondary
      </Button>
      </div>
      <p className="font-medium text-primary">In this application you can:</p>
      <p className="text-secondary">Secondary color</p> <span className="material-icons-outlined">pie_chart</span>


      {user.data?.role === ROLES.USER && (
        <ul className="my-4 list-inside list-disc">
          <li>Create comments in discussions</li>
          <li>Delete own comments</li>
        </ul>
      )}

      {user.data?.role === ROLES.ADMIN && (
        <ul className="my-4 list-inside list-disc">
          <li>Create discussions</li>
          <li>Edit discussions</li>
          <li>Delete discussions</li>
          <li>Comment on discussions</li>
          <li>Delete all comments</li>
        </ul>
      )}
    </ContentLayout>
  );
};
