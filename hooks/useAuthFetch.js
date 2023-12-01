import NotificationContext from "@/context/NotificationContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function useAuthFetch() {
  const { showNotification } = useContext(NotificationContext);
  const router = useRouter();

  const authRouter = async ({ endpoint, formData, redirectRoute, options }) => {
    try {
      const { data } = await axios.post(
        `/api/auth/${endpoint}`,
        formData,
        options
      );

      showNotification({ open: true, msj: data.message, status: "success" });

      if (redirectRoute) {
        router.push(redirectRoute);
      }
    } catch (error) {
      showNotification({
        open: true,
        msj: error.response?.data?.message,
        status: "error",
      });
    }
  };
  return authRouter;
}
