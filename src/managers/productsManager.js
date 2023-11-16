import { productsModel } from "../db/models/products.model.js";

class ProductsManager {
    async findAll(obj) {
        const { limit = 20, page = 1, sort, ...filter } = obj;
        const sortOption = sort ? { price: sort } : null;
        try {
            const response = await productsModel.paginate(filter, { limit, page, sort: sortOption, lean: true });
            return {
                status: 'success',
                payload: response.docs,
                count: response.totalDocs,
                totalPages: response.totalPages,
                prevPage: response.hasPrevPage,
                nextPage: response.hasNextPage,
                next: response.hasNextPage ?
                    `http://localhost:8080/products?page=${response.nextPage}` : null,
                prev: response.hasPrevPage ?
                    `http://localhost:8080/products?page=${response.nextPage}` : null,
            };
        } catch (error) {
            console.log(error)
            return {
                status: 'error'
            }
        }

    }

    async findById(id) {
        const result = await productsModel.findById(id);
        return result;
    }

    async createOne(obj) {
        const result = await productsModel.create(obj);
        return result;
    }

    async updateOne(id, obj) {
        const result = await productsModel.updateOne({ _id: id }, obj);
        return result;
    }

    async deleteOne(id) {
        const result = await productsModel.deleteOne({ _id: id });
        return result;
    }
}

export const productsManager = new ProductsManager();