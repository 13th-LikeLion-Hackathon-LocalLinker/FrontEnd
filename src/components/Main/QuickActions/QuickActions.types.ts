import icon1 from '../../../assets/icons/main/1.svg';
import icon2 from '../../../assets/icons/main/2.svg';
import icon3 from '../../../assets/icons/main/3.svg';
import icon4 from '../../../assets/icons/main/4.svg';
import icon5 from '../../../assets/icons/main/5.svg';
import icon6 from '../../../assets/icons/main/6.svg';
import { type CategoryCode } from '../../../types/category';

export type Item = { icon: string; label: string; code: CategoryCode };

export const ITEMS: readonly Item[] = [
  { icon: icon1, label: '행정', code: 'ADMINSTRATION' },
  { icon: icon2, label: '의료', code: 'MEDICAL' },
  { icon: icon3, label: '주거', code: 'HOUSING' },
  { icon: icon4, label: '취업/근로', code: 'EMPLOYMENT' },
  { icon: icon5, label: '교육', code: 'EDUCATION' },
  { icon: icon6, label: '생활 지원', code: 'LIFE_SUPPORT' },
] as const;
