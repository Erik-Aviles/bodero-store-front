import React, { useEffect } from "react";
import { useRouter } from "next/router";

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirigir a la página de inicio después de 3 segundos
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <h1>404 - Página no encontrada</h1>
      <p>¡Serás redirigido a la página de inicio en unos segundos!</p>
    </div>
  );
};

export default Custom404;
