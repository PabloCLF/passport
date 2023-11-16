import { Router } from "express";
import { cartsManager } from "../managers/cartsManager.js";

const router = Router();

router.get("/:idCart", async(req, res) => {
    const { idCart } = req.params;
    const cart = await cartsManager.findCartById(idCart);
    res.json({ cart });
});

router.post("/:idCart/products/:idProduct", async(req, res) => {
    const { idCart, idProduct } = req.params;
    const cart = await cartsManager.addProductToCart(idCart, idProduct);
    res.json({ cart });
});

router.post("/", async(req, res) => {
    const cart = await cartsManager.createCart();
    res.json({ cart });
});

router.put("/:idCart/products/:idProduct", async(req, res) => {
    const { idCart, idProduct } = req.params;
    try {
        await cartsManager.addProductToCart(idCart, idProduct);
        res.status(200).json({ message: "Product added" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/:idCart", async(req, res) => {
    const { idCart } = req.params;
    const { products } = req.body;

    try {
        await cartsManager.addProductsToCart(idCart, products);
        res.status(200).json({ message: "Products added" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/:idCart/products/:idProduct", async(req, res) => {
    const { idCart, idProduct } = req.params;
    try {
        await cartsManager.deleteProductFromCart(idCart, idProduct);
        res.status(200).json({ message: "Product deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;