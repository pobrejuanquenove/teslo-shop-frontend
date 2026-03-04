import { Button } from "@/components/ui/button";

interface Props {
    title: string,
    subtitle?: string,
}

export const CustomJumbotron = ({ title, subtitle }: Props) => {
    const DEFAULT_SUBTITLE = 'Ropa minimalista y elegante inspirada en el diseño futurista de Tesla.'
    return (
        <section className="py-10 px-4 lg:px-8 bg-muted/30" >
            <div className="container mx-auto text-center">
                <h1 className="text-2xl lg:text-7xl font-montserrat tracking-tight mb-6">
                    {title}
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    {subtitle || DEFAULT_SUBTITLE}
                </p>
            </div>
        </section>
    )
}
