import Link from 'next/link';

/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
export function CustomLink(props: any) {
  const target =
    props.target || (props.href.startsWith('http') ? '_blank' : undefined);
  return (
    <Link
      {...props}
      passHref
      target={target}
      rel={target === '_blank' ? 'noreferrer' : undefined}
      className={props.className}
    >
      {props.children}
    </Link>
  );
}
