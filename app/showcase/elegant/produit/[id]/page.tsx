import { PdpPage } from "@/components/showcase/shared/PdpPage";
import { THEMES } from "@/lib/showcase-data";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PdpPage theme={THEMES.elegant} id={id} />;
}
