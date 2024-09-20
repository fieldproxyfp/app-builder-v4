import { Button } from '@/components/ui/button';
import CodeEditor from '@/components/ui/code-editor/codeEditor';
import { ErrorBlock } from '@/components/ui/error-block';
import { Loader } from '@/components/ui/loader';
import { useNotifications } from '@/components/ui/notifications';
import { OptionT } from '@/components/ui/radio-group/RadioGroup';
import { Typography } from '@/components/ui/typography';
import {
  useDeleteScreenMutation,
  useScreen,
  useUpdateScreenMutation,
} from '@/features/app/api/get-app-meta';
import { CreateScreen } from '@/features/screen/components/create-screen';
import React, {
  ErrorInfo,
  Fragment,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  NavLink,
  useNavigate,
  useOutletContext,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { PageActions } from './actions';
import { AppDataRoute } from './data';
import { AppDesignRoute } from './design';
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export const ScreenRoute = () => {
  const screenOptions = useOutletContext<OptionT[]>();
  const { appId, view_id } = useParams();
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab');
  const {
    data: view,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useScreen({
    appId: appId as string,
    view_id: view_id as string,
  });

  const [jsonContent, setJsonContent] = useState<string | null>(null);
  const { addNotification } = useNotifications();
  const [hasUnSavedChanges, setHasUnSavedChanges] = useState(false);
  const [parsedJson, setParsedJson] = useState<any>(null);
  const navigate = useNavigate();
  const [blur, setBlur] = useState(false);

  const deleteScreenMutation = useDeleteScreenMutation({
    appId: appId as string,
    onSuccess: (view_id: string) => {
      addNotification({
        title: 'Screen Deleted',
        message: `Screen deleted successfully`,
        type: 'error',
        autoDismiss: true,
      });
      setBlur(true);
      setTimeout(() => {
        navigate(`/app/${appId}/screens`);
      }, 2600);
    },
    onError: (error) => {
      setBlur(false);
      addNotification({
        title: 'Error',
        message: error.message,
        type: 'error',
        autoDismiss: true,
      });
    },
  });

  useEffect(() => {
    if (isSuccess && view) {
      setJsonContent(JSON.stringify(view));
    }
  }, [view, isSuccess]);

  const updateScreenMutation = useUpdateScreenMutation({
    appId: appId as string,
    onSuccess: (viewId) => {
      setHasUnSavedChanges(false);
      addNotification({
        title: 'Screen Updated',
        message: 'Screen updated successfully',
        type: 'success',
        autoDismiss: true,
      });
    },
  });

  const debouncedSetParsedJson = useCallback(
    debounce((value: string) => {
      try {
        setParsedJson(JSON.parse(value));
        setHasUnSavedChanges(true);
      } catch (error) {
        console.error('Failed to parse JSON:', error);
      }
    }, 500),
    [],
  );

  const handleJsonChange = (value?: string) => {
    setJsonContent(value || '');
    debouncedSetParsedJson(value || '');
  };

  const handleSave = () => {
    if (jsonContent) {
      updateScreenMutation.mutate(JSON.parse(jsonContent));
    }
  };

  return (
    <Fragment>
      <header className=" h-14 bg-background flex justify-between items-center border-b-[1px] border-border1 px-4">
        <div className="inline-flex items-center h-full gap-2">
          {isLoading ? (
            <div className="w-48 h-6 bg-gray-300 rounded animate-pulse"></div>
          ) : (
            <Typography variant="large">
              {parsedJson?.label || view?.label || 'Untitled'}
            </Typography>
          )}
          <span className="material-icons-round text-xl">chevron_right</span>
        </div>
        <div className="flex items-center h-full gap-4">
          <NavLink
            to={`?tab=data`}
            className={() => (tab === 'data' ? 'text-blue-500' : '')}
          >
            Data
          </NavLink>
          <NavLink
            to={`?tab=design`}
            className={() => (tab === 'design' ? 'text-blue-500' : '')}
          >
            Design
          </NavLink>
          <NavLink
            to={`?tab=actions`}
            className={() => (tab === 'actions' ? 'text-blue-500' : '')}
          >
            Actions
          </NavLink>
        </div>
        <Button
          variant="secondary"
          size="sm"
          disabled={!hasUnSavedChanges}
          onClick={handleSave}
          isLoading={updateScreenMutation.isPending}
        >
          Save
        </Button>
      </header>

      {isError ? (
        <div className="flex flex-grow flex-col justify-center items-center h-[calc(100vh-14rem)]">
          <ErrorBlock
            title="Cannot Retrive Screen"
            description={error.message}
          />
        </div>
      ) : isLoading ? (
        <div className="flex justify-center flex-grow flex-col items-center h-[calc(100vh-14rem)]">
          <Loader label="Loading Screen" />
        </div>
      ) : (
        <main
          className={`grid grid-cols-12 gap-4 w-full p-2 ${blur ? 'blur-sm' : ''}`}
        >
          <div className="grid col-span-2 h-full bg-background border-[1px] border-border1 p-2 rounded-md shadow-sm  ">
            <div className="flex flex-col gap-2 w-full">
              <div className="flex justify-between gap-3 items-center">
                <Typography variant="subHeading">Screens</Typography>
                <CreateScreen appId={appId as string} size="sm" />
              </div>

              {screenOptions.map((screen) => (
                <div
                  className="flex flex-row w-full items-center justify-between gap-2"
                  key={screen.value}
                >
                  <NavLink
                    key={screen.value}
                    className={({ isActive }) =>
                      isActive ? 'text-blue-500' : ''
                    }
                    to={`../${screen.value}?tab=${tab}`}
                  >
                    {screen.label}
                  </NavLink>
                  <Button
                    variant="ghost"
                    size="icon"
                    icon="delete_outline"
                    onClick={() => {
                      deleteScreenMutation.mutate(view_id as string);
                      setBlur(true);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div
            className={`grid col-span-4 h-full bg-background border-[1px] border-border1 p-2 rounded-md shadow-sm`}
          >
            <div className="mt-2 flex justify-center items-center">
              <div className="relative w-[350px] h-[760px] bg-white rounded-[50px] shadow-xl border-[12px] border-gray-800 overflow-hidden">
                {/* iPhone 16-style notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[144px] h-[30px] bg-black rounded-b-3xl"></div>

                {/* Screen content area */}
                <div className="w-full h-full pt-[40px] pb-[7px] px-[7px] overflow-y-auto">
                  {/* Placeholder for draggable elements */}
                  <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center">
                    <Typography variant="body" className="text-gray-400">
                      Drag and drop elements here
                    </Typography>
                    {tab === 'data' && <AppDataRoute />}
                    {tab === 'design' && <AppDesignRoute />}
                    {tab === 'actions' && <PageActions />}
                  </div>
                </div>

                {/* iPhone 16-style home indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[120px] h-[4px] bg-gray-800 rounded-full"></div>
              </div>
            </div>
          </div>

          <div
            className={`grid col-span-6 h-full  bg-background border-[1px] border-border1 p-2 rounded-md shadow-sm`}
          >
            <div className="flex flex-col gap-2 h-full w-full">
              <Typography variant="subHeading">Settings</Typography>
              {view ? (
                <div className="relative h-full bg-gray-200 border-[1px] border-border1 p-2">
                  {jsonContent !== null && (
                    <ErrorBoundary>
                      <CodeEditor
                        language="json"
                        value={jsonContent || ''}
                        onChange={handleJsonChange}
                        theme="light"
                      />
                    </ErrorBoundary>
                  )}
                </div>
              ) : (
                <div className="flex justify-center items-center h-full">
                  <Loader label="Loading Screen" />
                </div>
              )}
            </div>
          </div>
        </main>
      )}
    </Fragment>
  );
};

function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}
