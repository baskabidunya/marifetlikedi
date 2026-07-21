import { getFunTests } from "@/lib/admin-fun-tests";
import TestList from "./TestList";

export default async function AdminFunTestsPage() {
  const tests = await getFunTests();
  return <TestList tests={tests} />;
}
