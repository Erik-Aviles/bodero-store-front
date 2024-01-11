import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const StaledLink = styled(Link)`
  display: flex;
  align-items: center;
`;

export default function Logo({ href }) {
  return (
    <StaledLink href={href}>
      <Image alt="Logo B.D.R" src="/logo.jpg" width={300} height={120} />
    </StaledLink>
  );
}
