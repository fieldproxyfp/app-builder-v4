import { Button } from '@/components/ui/button';
import CodeEditor from '@/components/ui/code-editor/codeEditor';
import { Typography } from '@/components/ui/typography';
import { Screen } from '@/types/screen';
import React, { ErrorInfo, useState } from 'react';
import { Outlet, useOutletContext, useParams } from 'react-router-dom';
import sampleJson from './sample.json';
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
  const screen = useOutletContext<Screen>();
  const { appId, screenId } = useParams();

  const [jsonContent, setJsonContent] = useState(JSON.stringify(sampleJson));
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [jsonView, setJsonView] = useState(false);

  const handleJsonChange = (value: string) => {
    setJsonContent(value);
  };

  return (
    <React.Fragment>
      <div
        className={`grid ${jsonView ? 'col-span-4' : 'col-span-6'} h-full bg-background border-[1px] border-border1 p-2 rounded-md shadow-sm`}
      >
        <Button onClick={() => setJsonView(!jsonView)}>Toggle JSON View</Button>

        <div className="mt-2 flex justify-center items-center">
          <div className="relative w-[350px] h-[760px] bg-white rounded-[50px] shadow-xl border-[12px] border-gray-800 overflow-hidden">
            {/* iPhone 16-style notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[144px] h-[30px] bg-black rounded-b-3xl"></div>

            {/* Screen content area */}
            <div className="w-full h-full pt-[40px] pb-[7px] px-[7px] overflow-y-auto">
              {/* Placeholder for draggable elements */}
              <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <Typography variant="body" className="text-gray-400">
                  Drag and drop elements here
                </Typography>
              </div>
            </div>

            {/* iPhone 16-style home indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-[120px] h-[4px] bg-gray-800 rounded-full"></div>
          </div>
        </div>
      </div>

      <div
        className={`grid ${jsonView ? 'col-span-6' : 'col-span-4'} h-full bg-background border-[1px] border-border1 p-2 rounded-md shadow-sm`}
      >
        <div className="w-full">
          <Typography variant="h2">Settings Bar</Typography>

          {jsonView && (
            <div className="mt-4">
              <Typography variant="h3" className="mb-2">
                JSON Editor
              </Typography>
              <div className="relative">
                <ErrorBoundary>
                  <CodeEditor
                    language="json"
                    value={jsonContent}
                    onChange={handleJsonChange}
                  />
                </ErrorBoundary>
              </div>
              {jsonError && (
                <Typography variant="body" className="mt-2 text-destructive">
                  {jsonError}
                </Typography>
              )}
            </div>
          )}
          <Outlet />
        </div>
      </div>
    </React.Fragment>
  );
};
