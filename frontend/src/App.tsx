import AppLayout from "./components/layout/AppLayout";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";

import WorkspaceLayout from "./features/workspace/components/WorkspaceLayout";

import { useCaseContext } from "./features/case/context/CaseContext";

import WorldClock from "./features/dashboard/components/WorldClock";

import { createTemporaryCase } from "./features/case/utils/createTemporaryCase";

export default function App() {
  const { state } = useCaseContext();

  return (
    <AppLayout
      sidebar={state.activeCase?.isTemporary ? undefined : <Sidebar />}
      header={<Header />}
    >
      {state.activeCase ? <WorkspaceLayout /> : <Home />}
    </AppLayout>
  );
}

function Home() {
  const { dispatch } = useCaseContext();

  function openTemplateWorkspace() {
    dispatch({
      type: "ADD_CASE",
      payload: createTemporaryCase(),
    });
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 p-6">
        {/* Time Converter */}

        <WorldClock />

        {/* Dashboard */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {/* Quick Templates */}

          <button
            onClick={openTemplateWorkspace}
            className="rounded-xl border border-[#1E1E1E] bg-[#0B0B0B] p-5 text-left transition-all duration-200 hover:border-[#8E2434] hover:bg-[#101010]"
          >
            <h3 className="mb-2 text-lg font-semibold text-white">
              Quick Templates
            </h3>

            <p className="text-sm leading-6 text-neutral-500">
              Open all support email templates without creating a customer case.
            </p>
          </button>

          {/* AI */}

          <div className="rounded-xl border border-[#1E1E1E] bg-[#0B0B0B] p-5">
            <h3 className="mb-2 text-lg font-semibold text-white">
              AI Quick Actions
            </h3>

            <p className="text-sm leading-6 text-neutral-500">Coming soon...</p>
          </div>

          {/* Recent */}

          <div className="rounded-xl border border-[#1E1E1E] bg-[#0B0B0B] p-5">
            <h3 className="mb-2 text-lg font-semibold text-white">
              Recent Activity
            </h3>

            <p className="text-sm leading-6 text-neutral-500">Coming soon...</p>
          </div>

          {/* Metrics */}

          <div className="rounded-xl border border-[#1E1E1E] bg-[#0B0B0B] p-5">
            <h3 className="mb-2 text-lg font-semibold text-white">
              Support Metrics
            </h3>

            <p className="text-sm leading-6 text-neutral-500">Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
