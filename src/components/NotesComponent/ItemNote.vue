<template>
  <div>
    <div class="notes__small-title">
      {{ title }}
    </div>
    <div class="notes__small-body">
      {{ body }}
    </div>
    <div class="notes__small-updated">
      {{ formatDate }}
    </div>
  </div>
</template>
<script setup>
import moment from "moment";
import i18next from "i18next";

import { defineProps, computed } from "vue";

const props = defineProps(["notesL"]);

const title = computed(() => {
  return props.notesL.body.content.find((item) => item.type === "heading")
    .content
    ? props.notesL.body.content.find((item) => item.type === "heading")
        .content[0].text
    : i18next.t("noTitle");
});

const formatDate = computed(() => {
  if (props.notesL.updated) {
    return moment(String(props.notesL.updated)).format("MM/DD/YYYY hh:mm a");
  }
  return "";
});

const body = computed(() => {
  const notesL = props.notesL.body.content;
  const paragraph = notesL.find((item) => item.type === "paragraph");
  const txt = paragraph?.content?.find((item) => item.type === "text");
  if (txt) {
    return txt.text.length > 25
      ? txt.text.substring(0, 25) + "..."
      : txt.text.substring(0, 25);
  } else {
    return i18next.t("discNote");
  }
});
</script>
