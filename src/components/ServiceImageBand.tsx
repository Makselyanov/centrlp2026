interface ServiceImageBandProps {
    slug: string;
    alt: string;
}

/**
 * Brand-aligned hero illustration band shown right under the page hero on each
 * services/* page. Image source is /og/services/<slug>.png — same file we serve
 * as the OG card, so a single render is reused for both purposes.
 */
export const ServiceImageBand = ({ slug, alt }: ServiceImageBandProps) => {
    return (
        <section className="py-12 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-4xl">
                    <div className="relative aspect-[40/21] w-full overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-[#0096D6]/10 via-white to-[#44B78B]/10 shadow-lg">
                        <img
                            src={`/og/services/${slug}.png`}
                            alt={alt}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover"
                            onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = "none";
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};
