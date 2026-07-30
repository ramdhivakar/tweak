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
            Tweak
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


