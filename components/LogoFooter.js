import Link from "next/link";
import Image from "next/image";

export default function LogoFooter({ href }) {
  return (
    <Link href={href}>
      <Image alt="Logo B.D.R" src="/logo2.jpg" width={300} height={60} />
    </Link>
  );
}
