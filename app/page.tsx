import Link from "next/link";
import Image from "next/image";

import Navbar from "@/components/navbar";

import { getData } from "@/lib/getData";
import { Repository } from "@/lib/types";

import { Button } from "@/components/ui/button";

export default async function Home() {
  const data = await getData();

  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <Navbar />
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 xl:grid-cols-4  lg:grid-cols-3 md:grid-cols-2 lg:text-lef mt-12 gap-4">
        {data.map((repo: Repository) => (
          <div
            key={repo.id}
            className=" group rounded-lg border border-gary-300 px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            <div className=" flex justify-between items-center mb-4">
              <Image
                src={repo.owner.avatar_url}
                alt="avatar"
                width={40}
                height={40}
                priority
                className="bg-salte-500 rounded-full"
              />
              <h2 className="tex-md font-semibold"> {repo.owner.login}</h2>
            </div>
            <div className=" flex flex-col justify-start text-start">
              <p className="py-1">repo name: {repo.name}</p>
              <p className="m-0 max-w-[30ch] text-sm opacity-50">
                {repo.description}
              </p>
            </div>
            <div className="mt-4 ">
              <Link href={`${repo.id}`}>
                <Button className="capitalize" variant="outline">
                  view commits
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
