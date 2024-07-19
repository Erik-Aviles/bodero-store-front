import { primary } from "@/lib/colors";
import { RiseLoader } from "react-spinners";

export default function Spinner() {
  return <RiseLoader color={primary} speedMultiplier={1} size={7} />;
}
