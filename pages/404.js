import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { TitleH4 } from "@/components/stylesComponents/TitleH4";

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
    <Layout>
      <TitleH4>404 - Página no encontrada</TitleH4>
      <p>¡Serás redirigido a la página de inicio en unos segundos!</p>
    </Layout>
  );
};

export default Custom404;
