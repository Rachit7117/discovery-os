import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 p-12 text-center',
        className
      )}
    >
      <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
        <AlertTriangle className="w-8 h-8 text-red-400" />
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="text-sm text-slate-400 max-w-xs">{message}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4" />
          Try again
        </Button>
      )}
    </div>
  );
}
