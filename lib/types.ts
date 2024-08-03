export type Owner = {
  avatar_url: string;
  login: string;
};

export type Repository = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  owner: Owner;
};

export type Commit = {
  sha: string;
  commit: {
    author: {
      name: string;
    };
    message: string;
  };
};
