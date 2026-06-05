import { cn } from '@/lib/utils';

interface LoadingStateProps {
  message?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingState({
  message = 'Loading...',
  className,
  size = 'md',
}: LoadingStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <div
        className={cn(
          'rounded-full border-2 border-blue-500/20 border-t-blue-500 animate-spin',
          size === 'sm' && 'w-6 h-6',
          size === 'md' && 'w-10 h-10',
          size === 'lg' && 'w-14 h-14'
        )}
      />
      {message && (
        <p className={cn('text-slate-400', size === 'sm' && 'text-xs', size === 'lg' && 'text-base')}>
          {message}
        </p>
      )}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/4 p-6 space-y-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-white/8 shimmer" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-white/8 rounded-full w-3/4 shimmer" />
          <div className="h-3 bg-white/6 rounded-full w-1/2 shimmer" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-white/6 rounded-full shimmer" />
        <div className="h-3 bg-white/6 rounded-full w-5/6 shimmer" />
        <div className="h-3 bg-white/6 rounded-full w-4/6 shimmer" />
      </div>
    </div>
  );
}
