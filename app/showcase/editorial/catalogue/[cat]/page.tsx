import { CataloguePage } from "@/components/showcase/shared/CataloguePage";
import { THEMES } from "@/lib/showcase-data";

export default async function Page({ params }: { params: Promise<{ cat: string }> }) {
  const { cat } = await params;
  return <CataloguePage theme={THEMES.editorial} cat={cat} />;
}
