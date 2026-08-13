import { memo } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VendorRatingStarsProps {
  rating: number;
  className?: string;
  showNumeric?: boolean;
}

export const VendorRatingStars = memo(function VendorRatingStars({
  rating,
  className,
  showNumeric = true,
}: VendorRatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5 text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => {
          const isFilled = i < fullStars;
          const isHalf = i === fullStars && hasHalfStar;

          return (
            <Star
              key={i}
              className={cn(
                'h-3.5 w-3.5',
                isFilled
                  ? 'fill-amber-400 text-amber-400'
                  : isHalf
                  ? 'fill-amber-400/50 text-amber-400'
                  : 'fill-slate-100 text-slate-300 dark:fill-slate-800 dark:text-slate-700',
              )}
            />
          );
        })}
      </div>
      {showNumeric && (
        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
});
