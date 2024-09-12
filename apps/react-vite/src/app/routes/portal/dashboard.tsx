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
        <Button variant={'secondary'} size={'lg'} onClick={getProfile}>
          Secondary
        </Button>
        <Button size={'sm'}>Small Button</Button>

      </div>
      <p className="font-medium text-primary">In this application you can:</p>
      <p className="text-secondary">Secondary color</p> <span className="material-icons-outlined">pie_chart</span>

      <hr className='my-4' />
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Typography</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Font size 32 */}
          <div>
            <p className="text-3xl font-semibold mb-2">Semibold 32px</p>
            <p className="text-3xl font-medium mb-2">Medium 32px</p>
            <p className="text-3xl font-normal mb-4">Normal 32px</p>
          </div>

          {/* Font size 24 */}
          <div>
            <p className="text-2xl font-semibold mb-2">Semibold 24px</p>
            <p className="text-2xl font-medium mb-2">Medium 24px</p>
            <p className="text-2xl font-normal mb-4">Normal 24px</p>
          </div>

          {/* Font size 20 */}
          <div>
            <p className="text-xl font-semibold mb-2">Semibold 20px</p>
            <p className="text-xl font-medium mb-2">Medium 20px</p>
            <p className="text-xl font-normal mb-4">Normal 20px</p>
          </div>

          {/* Font size 16 */}
          <div>
            <p className="text-base font-semibold mb-2">Semibold 16px</p>
            <p className="text-base font-medium mb-2">Medium 16px</p>
            <p className="text-base font-normal mb-4">Normal 16px</p>
          </div>

          {/* Font size 14 */}
          <div>
            <p className="text-sm font-semibold mb-2">Semibold 14px</p>
            <p className="text-sm font-medium mb-2">Medium 14px</p>
            <p className="text-sm font-normal mb-4">Normal 14px</p>
          </div>

          {/* Font size 12 */}
          <div>
            <p className="text-xs font-semibold mb-2">Semibold 12px</p>
            <p className="text-xs font-medium mb-2">Medium 12px</p>
            <p className="text-xs font-normal mb-4">Normal 12px</p>
          </div>
        </div>

      </div>
      <hr />
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-border rounded-md shadow-md"></div>
            <span className="mt-2 text-sm">Border</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-input rounded-md shadow-md"></div>
            <span className="mt-2 text-sm">Input</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-ring rounded-md shadow-md"></div>
            <span className="mt-2 text-sm">Ring</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-background rounded-md shadow-md"></div>
            <span className="mt-2 text-sm">Background</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-foreground rounded-md shadow-md"></div>
            <span className="mt-2 text-sm">Foreground</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-brand1 rounded-md shadow-md"></div>
            <span className="mt-2 text-sm">Brand 1</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-brand2 rounded-md shadow-md"></div>
            <span className="mt-2 text-sm">Brand 2</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-brand3 rounded-md shadow-md"></div>
            <span className="mt-2 text-sm">Brand 3</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-border1 rounded-md shadow-md"></div>
            <span className="mt-2 text-sm">Border 1</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-border2 rounded-md shadow-md"></div>
            <span className="mt-2 text-sm">Border 2</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-border3 rounded-md shadow-md"></div>
            <span className="mt-2 text-sm">Border 3</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-gray10 rounded-md shadow-md"></div>
            <span className="mt-2 text-sm">Gray 10</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-gray20 rounded-md shadow-md"></div>
            <span className="mt-2 text-sm">Gray 20</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-gray30 rounded-md shadow-md"></div>
            <span className="mt-2 text-sm">Gray 30</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-gray40 rounded-md shadow-md"></div>
            <span className="mt-2 text-sm">Gray 40</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-grayDisplay rounded-md shadow-md"></div>
            <span className="mt-2 text-sm">Gray Display</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-red1 rounded-md shadow-md"></div>
            <span className="mt-2 text-sm">Red 1</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-red2 rounded-md shadow-md"></div>
            <span className="mt-2 text-sm">Red 2</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-green1 rounded-md shadow-md"></div>
            <span className="mt-2 text-sm">Green 1</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-green2 rounded-md shadow-md"></div>
            <span className="mt-2 text-sm">Green 2</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-green3 rounded-md shadow-md"></div>
            <span className="mt-2 text-sm">Green 3</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-primary rounded-md shadow-md"></div>
            <span className="mt-2 text-sm">Primary</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-secondary rounded-md shadow-md"></div>
            <span className="mt-2 text-sm">Secondary</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-destructive rounded-md shadow-md"></div>
            <span className="mt-2 text-sm">Destructive</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-muted rounded-md shadow-md"></div>
            <span className="mt-2 text-sm">Muted</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-accent rounded-md shadow-md"></div>
            <span className="mt-2 text-sm">Accent</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-popover rounded-md shadow-md"></div>
            <span className="mt-2 text-sm">Popover</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-card rounded-md shadow-md"></div>
            <span className="mt-2 text-sm">Card</span>
          </div>
        </div>
      </div>


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
