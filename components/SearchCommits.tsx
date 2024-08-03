"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";

interface SearchProps {
  search?: string;
  repoId?: string;
}

const Search = ({ search, repoId }: SearchProps) => {
  const router = useRouter();
  const initialRender = useRef(true);

  const [text, setText] = useState(search);
  const [query] = useDebounce(text, 750);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (!query) {
      // If there is no search query, check if repoId is available
      if (repoId) {
        router.push(`/${repoId}`);
      }
    } else {
      // If there is a search query, include it in the route
      router.push(`${repoId}/?search=${query}`);
    }
  }, [query, router, repoId]);

  return (
    <div>
      <Input
        value={text}
        placeholder="Search For Commit..."
        onChange={(e) => setText(e.target.value)}
        type="text"
        className="w-full"
      />
    </div>
  );
};

export default Search;
