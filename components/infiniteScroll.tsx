"use client";

import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { fetchCommits } from "@/lib/getData";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Commit } from "@/lib/types";

export interface InfiniteScrollCommitsProps {
  repoId: string | undefined;
  initialPage: number;
  initialCommits: Commit[];
}

const InfiniteScrollCommits: React.FC<InfiniteScrollCommitsProps> = ({
  repoId,
  initialPage,
}) => {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [page, setPage] = useState<number>(initialPage);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadMoreCommits = async () => {
      if (repoId) {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 200));

        const nextPageCommits = await fetchCommits(repoId, page + 1);
        setCommits((prevCommits) => [...prevCommits, ...nextPageCommits]);
        setPage((prevPage) => prevPage + 1);
        setLoading(false);
      }
    };
    // handle scrolling events
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadMoreCommits();
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, repoId]);

  return (
    <>
      <div className="mt-16 flex flex-col max-w-[80%]">
        {commits.length > 0 ? (
          <div>
            {commits.map((commit: Commit, index: number) => (
              <Card className="flex mb-4" key={`${commit.sha}-${index}`}>
                <CardHeader>
                  <CardTitle className="text-xl">
                    {commit.commit.author.name}
                  </CardTitle>
                  <CardDescription>{commit.commit.message}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          !loading && ""
        )}{" "}
        {loading && (
          <div className="flex justify-center mt-4">
            <ClipLoader color="#4F46E5" loading={loading} size={35} />
          </div>
        )}
      </div>
    </>
  );
};
export default InfiniteScrollCommits;
