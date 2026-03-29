const express = require("express");
const Customer = require("../models/Customer");

const router = express.Router();

// =======================
// CREATE customer
// =======================
router.post("/add", async (req, res) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).json(customer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// =======================
// READ all customers
// =======================
router.get("/", async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// =======================
// UPDATE customer
// =======================
router.put("/update/:id", async (req, res) => {
    try {
        const updated = await Customer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// =======================
// DELETE customer
// =======================
router.delete("/delete/:id", async (req, res) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.json({ message: "Customer deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
