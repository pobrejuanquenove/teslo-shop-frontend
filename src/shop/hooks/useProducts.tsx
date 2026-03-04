import { useQuery } from '@tanstack/react-query'
import { getProductsAction } from '../actions/getProductsAction'
import { useParams, useSearchParams } from 'react-router'

export const useProducts = () => {

    const [searcbParam] = useSearchParams()

    const limit = searcbParam.get('limit') || 9;
    const page = searcbParam.get('page') || 1;

    const offset = (Number(page) - 1) * Number(limit);

    const { gender } = useParams();
    const sizes = searcbParam.get('sizes') || undefined;

    const price = searcbParam.get('price') || 'any';
    let minPrice = undefined;
    let maxPrice = undefined;

    const query = searcbParam.get('query') || '';

    switch (price) {
        case 'any':
            break;
        case '0-50':
            minPrice = 0;
            maxPrice = 50;
            break;
        case '50-100':
            minPrice = 50;
            maxPrice = 100;
            break;
        case '100-150':
            minPrice = 100;
            maxPrice = 150;
            break;
        case '150-200':
            minPrice = 150;
            maxPrice = 200;
            break;
        case '150-200':
            minPrice = 200;
            maxPrice = undefined;
            break;
    }

    return useQuery({
        queryKey: ['Products', { limit, offset, gender, sizes, minPrice, maxPrice, query }],
        queryFn: () => getProductsAction({
            limit: isNaN(+limit) ? 0 : limit,
            offset: isNaN(offset) ? 0 : offset,
            gender,
            sizes,
            minPrice,
            maxPrice,
            query
        }),
        staleTime: 60 * 1000 * 5
    })
}
