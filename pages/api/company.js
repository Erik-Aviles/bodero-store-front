import { mongooseConnect } from "@/lib/mongoose";
import messages from "@/utils/messages";

export default async function handle(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Método no permitido" });
  }
  try {
    const db = await mongooseConnect();
    const companies = db.collection("companies");
    const data = await companies.find({}).toArray();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error obteniendo los datos:", error);
    return res
      .status(500)
      .json({ message: messages.error.default, error: error.message });
  }
}
