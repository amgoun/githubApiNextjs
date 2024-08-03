"use server";

import { Commit } from "./types";
export async function getData() {
  const res = await fetch(`https://api.github.com/repositories`);
  if (!res.ok) {
    throw new Error("failed to fetch data");
  }

  return res.json();
}
export async function fetchCommits(
  repoId: string,
  page: number,
  search?: string
): Promise<Commit[]> {
  try {
    // Fetch repository details
    const responseRepo = await fetch(
      `https://api.github.com/repositories/${repoId}`
    );
    const repoDetails = await responseRepo.json();

    // Fetch commits for the repository

    const responsecommits = await fetch(
      `https://api.github.com/repos/${repoDetails.full_name}/commits?per_page=20`
    );
    const commits = await responsecommits.json();
    return commits;
  } catch (error) {
    console.error("Error Fetching Commits", error);
    throw error;
  }
}
