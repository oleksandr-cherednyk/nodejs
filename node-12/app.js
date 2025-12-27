// app.js
import express from "express";
import { ObjectId } from "mongodb";
import "dotenv/config";
import { connectToMongo, getDb } from "./db/index.js";

const app = express();
app.use(express.json());

// CREATE: POST /products
app.post("/products", async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection("products").insertOne(req.body);
    const product = await db.collection("products").findOne({ _id: result.insertedId });
    res.status(201).json(product);
  } catch (e) {
    res.status(500).json({ message: "Error creating product", error: e.message });
  }
});

// READ ALL: GET /products
app.get("/products", async (req, res) => {
  try {
    const db = getDb();
    const products = await db.collection("products").find().toArray();
    res.json(products);
  } catch (e) {
    res.status(500).json({ message: "Error getting products", error: e.message });
  }
});

// READ ONE: GET /products/:id
app.get("/products/:id", async (req, res) => {
  try {
    const db = getDb();
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (e) {
    res.status(500).json({ message: "Error getting product", error: e.message });
  }
});

// UPDATE: PUT /products/:id
app.put("/products/:id", async (req, res) => {
  try {
    const db = getDb();
    await db
      .collection("products")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });

    const updated = await db
      .collection("products")
      .findOne({ _id: new ObjectId(req.params.id) });

    if (!updated) return res.status(404).json({ message: "Product not found" });

    res.json(updated);
  } catch (e) {
    res.status(500).json({ message: "Error updating product", error: e.message });
  }
});

// DELETE: DELETE /products/:id
app.delete("/products/:id", async (req, res) => {
  try {
    const db = getDb();
    const result = await db
      .collection("products")
      .deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted" });
  } catch (e) {
    res.status(500).json({ message: "Error deleting product", error: e.message });
  }
});

// start server only after DB connect
const PORT = process.env.PORT || 3000;

connectToMongo()
  .then(() => {
    app.listen(PORT, () => console.log("Server started on port " + PORT));
  })
  .catch((e) => {
    console.log("MongoDB connection error:", e.message);
  });
