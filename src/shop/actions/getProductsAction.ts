import { tesloApi } from "@/api/tesloApi"
import type { ProductsResponse } from "@/interfaces/products.response";

interface Options {
    limit?: number | string;
    offset?: number | string;
    gender?: string;
    sizes?: string;
    minPrice?: number;
    maxPrice?: number;
    query?: string;
}


export const getProductsAction = async (options: Options): Promise<ProductsResponse> => {
    const { limit, offset, gender, sizes, minPrice, maxPrice, query } = options;
    const { data } = await tesloApi.get<ProductsResponse>('/products', {
        params: {
            limit: limit,
            offset: offset,
            gender: gender,
            sizes: sizes,
            minPrice,
            maxPrice,
            q: query
        }
    });

    const productsWithImagesUrls = data.products.map((product) => {
        return {
            ...product,
            images: product.images.map((image) => `${import.meta.env.VITE_API_URL}/files/product/${image}`)
        }

    })

    return {
        ...data,
        products: productsWithImagesUrls
    };
}