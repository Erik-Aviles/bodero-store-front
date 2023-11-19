import Link from "next/link";
import Image from "next/image";

export default function Logo({ href }) {
  return (
    <Link href={href}>
      <Image alt="Logo B.D.R" src="/logo.jpg" width={300} height={160} />
    </Link>
  );
}
