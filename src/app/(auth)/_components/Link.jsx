import Link from 'next/link';

export default function CustomLink({ href, label }) {
  return (
    <Link href={href}>
      {label}
    </Link>
  );
}
