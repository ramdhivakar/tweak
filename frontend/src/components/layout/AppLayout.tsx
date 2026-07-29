import type { ReactNode } from "react";

interface Props {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
}

export default function AppLayout({ sidebar, header, children }: Props) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#050505] text-white">
      {/* Sidebar */}
      <aside className="w-[220px] flex-shrink-0 border-r border-[#161616] bg-[#070707]">
        {sidebar}
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="h-14 flex-shrink-0 border-b border-[#161616] bg-[#050505]">
          {header}
        </header>

        <main className="flex-1 overflow-y-auto bg-[#050505] px-10 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
