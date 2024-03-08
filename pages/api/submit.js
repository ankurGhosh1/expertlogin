import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  console.log(req.body);
  if (req.method === "POST") {
    try {
      const client = await clientPromise;
      const db = client.db(process.env.NEXT_PUBLIC_DB_NAME); // Replace with your database name

      // Replace "your_collection" with your actual collection name
      const result = await db
        .collection(process.env.NEXT_PUBLIC_CLUSTER_NAME)
        .insertOne(req.body);

      res.status(201).send({ success: true, data: result });
    } catch (error) {
      res.status(500).send({ success: false, error: error.message });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
