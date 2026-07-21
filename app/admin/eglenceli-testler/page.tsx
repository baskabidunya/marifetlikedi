import { getFunTests } from "@/lib/admin-fun-tests";
import TestList from "./TestList";

export default async function AdminFunTestsPage() {
  const tests = await getFunTests();
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-headline-md font-headline-md text-on-surface">Eğlenceli Testler</h1>
      </div>
      <TestList tests={tests} />
    </div>
  );
}
