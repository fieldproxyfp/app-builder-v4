import { cn } from '@/utils/cn';
import { Spinner } from '../spinner';
import { Typography } from '../typography/typography';

export type LoaderProps = {
  className?: string;
  label?: string;
  description?: string;
  spinnerClassName?: string;
};

export const Loader = ({
  className = '',
  label = 'Loading...',
  description,
  spinnerClassName = '',
}: LoaderProps) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 justify-center items-center h-full',
        className,
      )}
    >
      <Spinner className={cn('w-10 h-10', spinnerClassName)} />
      <Typography variant="subHeading">{label}</Typography>
      {description && <Typography variant="large">{description}</Typography>}
    </div>
  );
};
