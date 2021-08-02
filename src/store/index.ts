import { createPinia, defineStore } from "pinia";
import piniaPersist from "./pinia-plugin-persist";
import { Repository } from "@octokit/graphql-schema";
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
    staredRepos: Repository[];
  } {
    return {
      PAT: "",
      user: null,
      staredRepos: [],
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
