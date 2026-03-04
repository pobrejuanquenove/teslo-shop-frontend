// https://github.com/Klerith/bolt-product-editor

import { Navigate, useNavigate, useParams } from 'react-router';

import { useProduct } from '@/admin/hooks/useProduct';
import { CustomFullScreenLoading } from '@/components/custom/CustomFullscreenLoading';
import { ProductForm } from './ui/ProductForm';
import type { Product } from '@/interfaces/product.interface';
import { toast } from 'sonner';


export const AdminProductPage = () => {
    const { id } = useParams();
    const { isLoading, isError, data: product, mutation } = useProduct(id || '');
    const navigate = useNavigate()

    const handleSubmit = async (productLike: Partial<Product> & { files?: File[] }) => {

        await mutation.mutateAsync(productLike, {
            onSuccess: (data) => {
                toast.success('El producto fue actualizado correctamente', {
                    position: "top-right"
                });
                navigate(`/admin/products/${data.id}`)

            },
            onError: (error) => {
                console.log('errir', error)
                toast.error('Error al actualizar el producto', {
                    position: "bottom-right"
                });
            }
        });
    }

    const productTitle = id === 'new' ? 'Nuevo producto' : 'Editar producto';
    const productSubtitle =
        id === 'new'
            ? 'Aquí puedes crear un nuevo producto.'
            : 'Aquí puedes editar el producto.';

    if (isError) return <Navigate to='/admin/products' />
    if (isLoading) return <CustomFullScreenLoading />
    if (!product) return <Navigate to='/admin/products' />


    return (
        <ProductForm title={productTitle} subtitle={productSubtitle} product={product} onSubmit={handleSubmit} isPosting={mutation.isPending} />
    );
};