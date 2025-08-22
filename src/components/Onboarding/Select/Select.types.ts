export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string }[];
}
