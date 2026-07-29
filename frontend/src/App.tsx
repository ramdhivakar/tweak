import AppLayout from "./components/layout/AppLayout";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import NewCaseDialog from "./features/case/components/dialog/NewCaseDialog";
import { Button } from "@/components/ui/button";
import WorkspaceLayout from "./features/workspace/components/WorkspaceLayout";
import { useCaseContext } from "./features/case/context/CaseContext";

export default function App() {
  const { state } = useCaseContext();

  return (
    <AppLayout sidebar={<Sidebar />} header={<Header />}>
      {state.activeCase ? <WorkspaceLayout /> : <Home />}
    </AppLayout>
  );
}

function Home() {
  return (
    <div className="flex h-full overflow-hidden items-center justify-center">
      <div className="max-w-xl text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-semibold tracking-tight text-white">
            Support Workspace
          </h1>

          <p className="mt-5 text-lg leading-8 text-neutral-500">
            Create a new support case or select an existing case from the
            sidebar to begin troubleshooting.
          </p>
        </div>

        <NewCaseDialog
          trigger={
            <Button className="rounded-xl bg-[#8E2434] px-8 py-6 text-base hover:bg-[#A92C3F]">
              + Create New Case
            </Button>
          }
        />
      </div>
    </div>
  );
}

function CaseWorkspace() {
  return (
    <div className="grid h-full grid-cols-[340px_300px_1fr] gap-6">
      {/* Details */}
      <section className="rounded-2xl border border-[#1A1A1A] bg-[#090909] p-6">
        <h2 className="mb-5 text-lg font-semibold text-white">Case Details</h2>

        <p className="text-sm text-neutral-500">Coming in next step...</p>
      </section>

      {/* Templates */}
      <section className="rounded-2xl border border-[#1A1A1A] bg-[#090909] p-6">
        <h2 className="mb-5 text-lg font-semibold text-white">Templates</h2>

        <p className="text-sm text-neutral-500">Coming in next step...</p>
      </section>

      {/* Output */}
      <section className="rounded-2xl border border-[#1A1A1A] bg-[#090909] p-6">
        <h2 className="mb-5 text-lg font-semibold text-white">Output</h2>

        <textarea
          className="
            h-full
            min-h-[600px]
            w-full
            resize-none
            rounded-xl
            border
            border-[#232323]
            bg-[#050505]
            p-4
            text-white
            outline-none
            placeholder:text-neutral-600
            focus:border-[#8E2434]
          "
          placeholder="Generated email or troubleshooting notes will appear here..."
        />
      </section>
    </div>
  );
}
