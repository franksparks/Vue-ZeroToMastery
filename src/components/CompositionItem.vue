<template>
  <div>
    <div class="border border-gray-200 p-3 mb-4 rounded">
      <div>
        <h4 class="inline-block text-2xl font-bold">{{ song.modifiedName }}</h4>
        <button
          class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
          @click.prevent="deleteSong"
        >
          <i class="fa fa-times"></i>
        </button>
        <button
          class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
          @click.prevent="showForm = !showForm"
        >
          <i class="fa fa-pencil-alt"></i>
        </button>
      </div>
      <div v-if="showForm">
        <div
          class="text-white text-center font bold p-4 mb-4"
          v-if="show_alert"
          :class="alert_variant"
        >
          {{ alert_msg }}
        </div>
        <VeeForm
          :validation-schema="editSongSchema"
          :initial-values="songData"
          @submit="editSong"
        >
          <div class="mb-3">
            <label class="inline-block mb-2">{{ $t("songEdit.title") }}</label>
            <VeeField
              name="modifiedName"
              type="text"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              placeholder="Enter Song Title"
              @input="updateUnsavedFlag(true)"
            />
            <ErrorMessage class="text-red-600" name="modifiedName" />
          </div>
          <div class="mb-3">
            <label class="inline-block mb-2">{{ $t("songEdit.genre") }}</label>
            <VeeField
              name="genre"
              type="text"
              class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
              placeholder="Enter Genre"
              @input="updateUnsavedFlag(true)"
            />
            <ErrorMessage class="text-red-600" name="genre" />
          </div>
          <button
            type="submit"
            class="py-1.5 px-3 rounded text-white bg-green-600"
            :disabled="in_submission"
          >
            {{ $t("songEdit.submit") }}
          </button>
          <button
            type="button"
            class="py-1.5 px-3 rounded text-white bg-gray-600"
            :disabled="in_submission"
            @click.prevent="showForm = false"
          >
            {{ $t("songEdit.back") }}
          </button>
        </VeeForm>
      </div>
    </div>
  </div>
</template>

<script>
import { ErrorMessage } from "vee-validate";
import { songsCollection, storage } from "@/includes/firebase";

export default {
  name: "CompositionItem",
  components: { ErrorMessage },
  props: {
    song: {
      type: Object,
      required: true,
    },
    updateSong: {
      type: Function,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    removeSong: {
      type: Function,
      required: true,
    },
    updateUnsavedFlag: {
      type: Function,
    },
  },
  data() {
    return {
      showForm: false,
      songData: {
        modifiedName: this.song.modifiedName,
        genre: this.song.genre,
      },
      editSongSchema: {
        modifiedName: "required",
        genre: "alpha_spaces",
      },
      in_submission: false,
      show_alert: false,
      alert_variant: "bg-blue-500",
      alert_msg: "Please wait, updating song info",
    };
  },
  methods: {
    async editSong(values) {
      this.in_submission = true;
      this.show_alert = true;
      this.alert_variant = "bg-blue-500";
      this.alert_msg = "Please wait, updating song info";

      try {
        await songsCollection
          .doc(this.song.docID)
          .update(JSON.parse(JSON.stringify(values)));
      } catch (error) {
        console.log(error);
        this.in_submission = false;
        this.alert_variant = "bg-red-500";
        this.alert_msg = "Something went wrong, try again later";
        return;
      }
      this.updateSong(this.index, values);
      this.updateUnsavedFlag(false);

      this.in_submission = false;
      this.alert_variant = "bg-green-500";
      this.alert_msg = "Success!";
    },
    async deleteSong() {
      console.log("Song will be deleted");
      const storageRef = storage.ref();
      const songRef = storageRef.child(`songs/${this.song.originalName}`);

      //Deletes the song from the storage
      await songRef.delete();

      //Deletes the song document in the database
      await songsCollection.doc(this.song.docID).delete();

      //Removes the song from the array
      this.removeSong(this.index);
    },
  },
};
</script>
