<template>
  <div class="container mx-auto">
    <div class="flex flex-col justify-center">
      <div class="mx-1 flex flex-row gap-1">
        <n-input
          class="py-1"
          size="small"
          v-model:value="PAT"
          type="input"
          placeholder="Github Personal access tokens"
          :disabled="is_PAT_in_store()"
        />
        <n-button
          class="py-2 px-4"
          type="primary"
          @click="setPAT"
          :disabled="is_PAT_in_store()"
        >
          {{ is_PAT_in_store() ? "已存在" : "新增" }}
        </n-button>
        <n-button
          class="py-2 px-4"
          type="primary"
          @click="clearPAT"
          :disabled="!is_PAT_in_store()"
        >
          {{ "刪除" }}
        </n-button>
      </div>
      <p class="text-gray-500 text-sm">
        Fill with your
        <a
          class="text-red-500"
          href="https://github.com/settings/tokens"
          target="_blank"
        >
          Github Personal access tokens
        </a>
      </p>

      <div class="mt-3 mx-1 flex flex-col justify-center">
        <n-button
          class="text-lg"
          size="large"
          type="primary"
          ghost
          @click="getData()"
          :disabled="!is_PAT_in_store()"
        >
          取得資料
        </n-button>
      </div>

      <div class="flex justify-center">
        <UserProfile v-if="state.user" :user="state.user"></UserProfile>
      </div>

      <div class="flex flex-col justify-center">
        <RepoProfile :repos="state.staredRepos"></RepoProfile>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useMainStore } from "@/store/index";
import { getGithubUserStarredRepos } from "@/composable";
import { useLoadingBar } from "naive-ui";
import UserProfile from "@/components/UserProfile.vue";

import { Repository } from "@octokit/graphql-schema";
import RepoProfile from "@/components/RepoProfile";

export default defineComponent({
  name: "Home",
  components: { UserProfile, RepoProfile },
  setup() {
    const store = useMainStore();
    const loadingBar = useLoadingBar();
    const PAT = ref(process.env["VUE_APP_PAT"] || "");
    const setPAT = () => {
      store.$patch({ PAT: PAT.value });
    };
    function clearPAT() {
      PAT.value = "";
      store.$patch({ PAT: "" });
    }
    const user = reactive({});

    const getData = async () => {
      try {
        let res;
        let repos: Repository[] = [];
        do {
          loadingBar.start();
          if (res?.endCursor) {
            res = await getGithubUserStarredRepos("et84121", res.endCursor);
            if (res.repos) {
              repos = [...repos, ...(res.repos as Repository[])];
            }
          } else {
            res = await getGithubUserStarredRepos("et84121");
          }
          loadingBar.finish();
        } while (res.hasNextPage);

        Object.assign(user, res.user);

        store.$patch({ user: user, staredRepos: repos });
      } catch (error) {
        loadingBar.error();
      }
    };

    const is_PAT_in_store = () => store.PAT !== "";

    return {
      PAT,
      setPAT,
      clearPAT,
      is_PAT_in_store,
      getData,
      user,
      state: store.$state,
    };
  },
});
</script>
