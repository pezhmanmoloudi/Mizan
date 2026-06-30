import { Stack, type StackProps } from './Stack';

export type RowProps = Omit<StackProps, 'direction'>;

/** Horizontal `Stack`, vertically centered by default. RTL-aware via `Stack`. */
export function Row({ align = 'center', ...rest }: RowProps) {
  return <Stack direction="horizontal" align={align} {...rest} />;
}
