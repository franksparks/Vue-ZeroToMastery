<template>
  <div>
    <li
      class="flex justify-between items-center p-3 pl-6 cursor-pointer transition duration-300 hover:bg-gray-50"
    >
      <div>
        <RouterLink
          :to="{ name: 'song', params: { id: song.docID } }"
          class="font-bold block text-gray-600"
          >{{ song.modifiedName }}</RouterLink
        >
        <span class="text-gray-500 text-sm">{{ song.genre }}</span>
      </div>

      <div class="text-gray-600 text-lg">
        <RouterLink
          custom
          :to="{ name: 'song', params: { id: song.docID }, hash: '#comments' }"
          v-slot="{ navigate }"
        >
          <span class="comments">
            {{ song.commentCount }}
            <span @click="navigate" v-icon.gray600="'comments'"></span>
          </span>
        </RouterLink>
      </div>
    </li>
  </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  name: "SongItem",
  props: ["song"],
  components: { RouterLink },
};
</script>
