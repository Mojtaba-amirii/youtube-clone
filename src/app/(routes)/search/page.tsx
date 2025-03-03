import { Suspense } from "react";

import SearchResults from "@/components/search/SearchResults ";

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchResults />
    </Suspense>
  );
}
