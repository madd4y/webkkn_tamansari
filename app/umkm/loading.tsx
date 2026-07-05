import { Container } from "@/components/ui/container";
import { LoadingSkeleton } from "@/components/ui/loading-skeleton";

export default function Loading() {
  return (
    <section className="bg-slate-50 pt-32 pb-16">
      <Container>
        <LoadingSkeleton className="h-8 w-40" />
        <LoadingSkeleton className="mt-4 h-12 max-w-2xl" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
            >
              <LoadingSkeleton className="aspect-[4/3] rounded-none" />
              <div className="space-y-3 p-6">
                <LoadingSkeleton className="h-5 w-24" />
                <LoadingSkeleton className="h-7 w-3/4" />
                <LoadingSkeleton className="h-4 w-full" />
                <LoadingSkeleton className="h-4 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
