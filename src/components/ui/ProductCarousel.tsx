import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

export function ProductCarousel({
  images,
  alt,
  aspect = "video",
}: {
  images: string[];
  alt: string;
  aspect?: "video" | "portrait";
}) {
  const aspectClass = aspect === "portrait" ? "aspect-[3/4]" : "aspect-video";
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSel = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSel);
    onSel();
  }, [emblaApi]);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const single = images.length <= 1;

  return (
    <div className="relative overflow-hidden rounded-t-2xl bg-creme">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {images.map((src, i) => (
            <div key={i} className="min-w-0 flex-[0_0_100%]">
              <div className={`${aspectClass} w-full bg-creme-soft`}>
                <img
                  src={src}
                  alt={`${alt} – foto ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {!single && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Anterior"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-creme/90 p-2 text-marrom shadow transition hover:bg-creme"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Próxima"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-creme/90 p-2 text-marrom shadow transition hover:bg-creme"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition ${
                  i === selected ? "bg-marrom" : "bg-marrom/30"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
