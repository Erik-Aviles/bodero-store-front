import React, { useCallback } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const StyledTrigger = styled.div`
  height: 0.25rem;
  width: 0.25rem;
  background-color: #ef4444;
`;

const Trigger = ({ limit }) => {
  const router = useRouter();

  const TriggerRef = useCallback(
    (node) => {
      if (!node) return;

      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            router.push(`/productos?limit=${limit + 10}`, { scroll: false });
            observer.disconnect();
          }
        });
      });

      observer.observe(node);
    },
    [limit, router]
  );

  return <StyledTrigger ref={TriggerRef} />;
};

export default Trigger;
