import { createPinia, defineStore } from "pinia";
import piniaPersist from "./pinia-plugin-persist";
import { Maybe, Repository } from "@octokit/graphql-schema";
export const pinia = createPinia();
pinia.use(piniaPersist);
export const useMainStore = defineStore({
  id: "mainAppStore",
  state(): {
    PAT: string | null;
    user: {
      bio: string;
      name: string;
      email: string;
      avatarUrl: string;
      id: string;
      company: string;
    } | null;
    staredRepos: Repository[] | null;
  } {
    return {
      PAT: "",
      user: null,
      staredRepos: null,
    };
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "pinia",
        storage: localStorage,
      },
    ],
  },
});
