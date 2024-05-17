import { Loading } from "@/components/Loading";
import Layout from "@/components/auth/Layout";
import { useEffect, useState } from "react";

export default function Login() {
  const [isUpLoanding, setIsUpLoanding] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsUpLoanding(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (isUpLoanding) {
    return <Loading />;
  }

  return (
    <Layout title="B.R.D | Inicio de sesion">
      <div> Soy el login</div>
    </Layout>
  );
}
