import ShowcaseNav from "@/components/showcase/ShowcaseNav";

export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ShowcaseNav />
      <div style={{ paddingTop: "44px" }}>{children}</div>
    </>
  );
}
