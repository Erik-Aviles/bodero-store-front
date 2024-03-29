import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import messages from "@/utils/messages";

export default async function handle(req, res) {
  const { method } = req;
  /*   res.setHeader("Access-Control-Allow-Origin", "http://boderoracing.com");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
 */
  //Obtener
  await mongooseConnect();
  if (method === "GET") {
    try {
      const categories = await Category.find({}, null, { sort: { _id: -1 } });
      return res.status(200).json({
        categories,
        message: messages.success.successfullyObtainedData,
      });
    } catch (err) {
      return res.status(500).json({ err: err.message });
    }
  }
}
