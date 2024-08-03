import Link from "next/link";
import React from "react";
import { fetchCommits } from "@/lib/getData";
import { Commit } from "@/lib/types";
import InfiniteScrollCommits from "@/components/infiniteScroll";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Search from "@/components/SearchCommits";

export type pageProps = {
  params: { id: string | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const page = async (props: pageProps) => {
  const search =
    typeof props?.searchParams?.search === "string"
      ? props?.searchParams.search
      : undefined;

  const repoId: string | undefined = props?.params.id;

  let filteredCommits: Commit[] = [];

  if (repoId) {
    const commits = await fetchCommits(repoId, 1);
    // Filter commits based on the search term
    filteredCommits = search
      ? commits.filter((commit: Commit) =>
          commit.commit.message
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase())
        )
      : commits;
  } else {
    // Handle the case where repoId is undefined
    console.error("repo id in undefined");
  }
  return (
    <div className=" flex flex-col  items-center">
      <div className=" flex py-6 justify-between w-[80%]">
        <div className="mr-4">
          <Link href="/">
            <Button className="capitalize" variant="outline">
              back
            </Button>
          </Link>
        </div>
        <div className=" w-full">
          <Search
            search={search}
            repoId={repoId ? String(repoId) : undefined}
          />
        </div>
      </div>
      <div className=" mt-16 flex flex-col max-w-[80%]">
        {filteredCommits.map((commit: Commit, index: number) => (
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
      <InfiniteScrollCommits
        repoId={repoId ? String(repoId) : undefined}
        initialPage={1}
        initialCommits={filteredCommits}
      />
    </div>
  );
};

export default page;
