import { cn } from '@/utils/cn';
import { Typography } from '../typography/typography';

export type ErrorBlockProps = {
  className?: string;
  title?: string;
  description?: string;
};

export const ErrorBlock = ({
  className,
  title = 'Error',
  description,
}: ErrorBlockProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2 h-full',
        className,
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-destructive "
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <Typography variant="subHeading">{title}</Typography>
      {description && <Typography variant="large">{description}</Typography>}
    </div>
  );
};
