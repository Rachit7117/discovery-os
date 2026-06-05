import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 p-12 text-center',
        className
      )}
    >
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
        <Icon className="w-8 h-8 text-slate-500" />
      </div>
      <div className="space-y-1">
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="text-sm text-slate-400 max-w-xs">{description}</p>
      </div>
      {action && (
        <Button onClick={action.onClick} size="sm">
          {action.label}
        </Button>
      )}
    </div>
  );
}
