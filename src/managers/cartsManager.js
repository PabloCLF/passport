import { cartsModel } from "../db/models/carts.model.js";

class CartsManager {
    async createCart() {
        const newCart = { products: [] };
        const response = await cartsModel.create(newCart);
        return response;
    }

    async findCartById(idCart) {
        const response = await cartsModel
            .findById(idCart)
            .populate("products.product", ["name", "price"]);
        return response;
    }

    async addProductToCart(idCart, idProduct) {
        const cart = await cartsModel.findById(idCart);

        const productIndex = cart.products.findIndex((p) =>
            p.product.equals(idProduct)
        );

        if (productIndex === -1) {
            cart.products.push({ product: idProduct, quantity: 1 });
        } else {
            cart.products[productIndex].quantity++;
        }
        return cart.save();
    }

    async addProductsToCart(idCart, products) {
        const cart = await cartsModel.findById(idCart).populate('products.product').exec();

        if (!products) {
            return;
        }
        products.forEach(idProduct => {
            const productIndex = cart.products.findIndex((p) => {
                return p.product.equals(idProduct)
            });

            if (productIndex === -1) {
                cart.products.push({ product: idProduct, quantity: 1 });
            } else {
                cart.products[productIndex].quantity++;
            }

        });

        return cart.save();
    }

    async deleteProductFromCart(idCart, idProduct) {
        const cart = await cartsModel.findById(idCart);

        const productIndex = cart.products.findIndex((p) =>
            p.product.equals(idProduct)
        );

        if (productIndex > 0 - 1) {
            cart.products.splice(productIndex, 1);
        }
        return cart.save();
    }
}

export const cartsManager = new CartsManager();