import type { ReactNode } from "react";

interface Props {
  sidebar?: ReactNode;
  header: ReactNode;
  children: ReactNode;
}

export default function AppLayout({ sidebar, header, children }: Props) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#050505] text-white">
      {/* Top Header */}

      <header className="h-14 flex-shrink-0 border-b border-[#161616] bg-[#050505]">
        {header}
      </header>

      {/* Body */}

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {sidebar && (
          <aside className="w-[220px] flex-shrink-0 border-r border-[#161616] bg-[#070707]">
            {sidebar}
          </aside>
        )}

        <main className="flex-1 overflow-y-auto bg-[#050505] px-10 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
