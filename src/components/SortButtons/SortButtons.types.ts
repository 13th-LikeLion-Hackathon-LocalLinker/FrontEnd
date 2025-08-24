export type SortKey = 'due' | 'latest';

export type SortButtonsProps = {
  sortKey: SortKey;
  onChangeSort: (k: SortKey) => void;
};

export type SortItemProps = {
  $active: boolean;
};
