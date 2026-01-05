import SidebarPage from "../sidebars/SidebarSection";
export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarPage>
      <div className="flex h-full">{children}</div>
    </SidebarPage>
  );
}
