<template>
  <div class="flex flex-row m-3 max-w-md border-2 rounded-xl justify-between">
    <img class="w-1/3" :src="user.avatarUrl" />
    <div class="flex flex-col justify-center w-full gap-2">
      <h1 class="text-3xl mb-3">{{ user.name }}</h1>
      <p>{{ user.company }}</p>
      <p>{{ user.email }}</p>
      <p>{{ user.bio }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "UserProfile",
  props: {
    user: Object as PropType<{
      avatarUrl: string;
      bio: string;
      name: string;
      company: string;
      email: string;
    }>,
  },
});
</script>
