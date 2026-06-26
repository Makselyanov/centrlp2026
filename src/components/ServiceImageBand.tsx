import { ContextVisual } from "@/components/ContextVisual";

interface ServiceImageBandProps {
    slug: string;
    alt: string;
}

export const ServiceImageBand = ({ slug, alt }: ServiceImageBandProps) => {
    return (
        <section className="py-12 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-4xl">
                    <ContextVisual variant="service-band" slug={slug} label={alt} className="aspect-[40/13]" />
                </div>
            </div>
        </section>
    );
};
