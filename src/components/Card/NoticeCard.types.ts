import type { Notice } from '../../data/notices';
import type { MouseEvent } from 'react';

export type NoticeCardProps = Notice & {
  bookmarked?: boolean;
  defaultBookmarked?: boolean;
  onToggleBookmark?: (next: boolean) => void;
  onClick?: (e: MouseEvent) => void;
  className?: string;
  isPeriodLimited?: boolean;
};
