import { useRouter } from "next/router";

export const useHandleGoBack = () => {
  const router = useRouter();

  const handleGoBack = (e) => {
    e.preventDefault();
    router.back();
  };

  return handleGoBack;
};