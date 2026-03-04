
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { getProductById } from '../actions/getProductByIdAction'
import type { Product } from '@/interfaces/product.interface'
import { createUpdateProduct } from '../actions/createUpdateProductAction'

export const useProduct = (slug: string) => {

    // usado para inv
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['product', { slug }],
        queryFn: () => getProductById(slug),
        retry: false,
        staleTime: 1000 * 60 * 5
    })

    const mutation = useMutation({
        mutationFn: createUpdateProduct,
        onSuccess: (product: Product) => {
            queryClient.invalidateQueries({
                // invalidamos el cache para 
                // el listado refleje los cambios
                queryKey: ['products']
            })
            queryClient.invalidateQueries({
                // invalidamos el cache para 
                // el prducto refleje los cambios
                // al reingresar al mismo
                queryKey: ['product', { id: product.id }]
            })
            // actualizamos el cache con la data nueva
            // y se evita realizar una llamada al server
            queryClient.setQueryData(['products', { id: product.id }], product)
        }
    })

    // const handleSubmitForm = async (productLike: Partial<Product>) => {
    //     console.log(productLike)
    // }

    return {
        ...query,
        mutation
    }
}
