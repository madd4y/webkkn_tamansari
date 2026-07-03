import { Container } from "@/components/ui/container";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="border-b border-green-100 bg-green-50 pt-28 pb-14">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-green-700">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-4xl text-3xl font-bold tracking-normal text-zinc-950 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-700 sm:text-lg">
          {description}
        </p>
      </Container>
    </section>
  );
}
