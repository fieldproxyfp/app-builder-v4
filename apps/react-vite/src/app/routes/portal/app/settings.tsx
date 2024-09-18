import { useParams } from 'react-router-dom';

export const AppSettingsRoute = () => {
  const { appId } = useParams();
  return <div>AppSettingsRoute - {appId}</div>;
};
