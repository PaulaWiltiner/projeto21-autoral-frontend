<template>
  <div class="editor" v-if="editor">
    <menu-bar class="editor__header" :editor="editor" />
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>
<script setup>
import * as NotesAPI from "../../composables/NotesApi";
import Bold from "@tiptap/extension-bold";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { generateHTML } from "@tiptap/html";
import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Document from "@tiptap/extension-document";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-3";
import Heading from "@tiptap/extension-heading";
import { onBeforeUnmount, ref, watch, onMounted, computed } from "vue";
import MenuBar from "./MenuBar.vue";
import { useNoteStore } from "../../store";

const store = useNoteStore();

const actived = computed(() => store.activeNote);
const CustomDocument = Document.extend({
  content: "heading block*",
});

const editor = ref(null);

onMounted(() => {
  editor.value = new Editor({
    extensions: [
      CustomDocument,
      Highlight,
      TaskList,
      TaskItem,
      CharacterCount.configure({
        limit: 1000000,
      }),
      StarterKit.configure({
        document: false,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "What’s the title?";
          }

          return "Can you add some further context?";
        },
      }),
    ],

    content: generateHTML(actived.value[0].body, [
      Document,
      Paragraph,
      Text,
      Bold,
      CustomDocument,
      Highlight,
      TaskList,
      TaskItem,
      Heading,
      // other extensions …
    ]),
    async onUpdate() {
      const json = editor.value.getJSON();
      console.log(actived.value[0], "olaß");
      store.addActivedNote([
        {
          id: actived.value[0].id,
          body: json,
          updated: actived.value[0].updated,
          userId: actived.value[0].userId,
        },
      ]);
      actived.value[0].body = JSON.stringify(json);
      console.log(actived.value[0], "actived.value[0]");
      await NotesAPI.saveNote(actived.value[0], store.userToken.userId);
      refreshNotes();
    },
  });
});

onBeforeUnmount(() => {
  editor.value.destroy();
});

async function refreshNotes() {
  const notes = await NotesAPI.getAllNotes();
  console.log(notes, "refresh");

  store.addNote(notes);
  store.addActivedNote([notes[0]]);
}

watch(
  () => store.activeNote,
  (to, from) => {
    if (to[0].id !== from[0].id) {
      editor.value.commands.setContent(to[0].body);
    }
  }
);
</script>

<style lang="scss">
.editor {
  display: flex;
  flex-direction: column;
  max-width: 1100px;
  color: #0d0d0d;
  background-color: #ffe4b5;
  margin: 0 5% 2% 5%;
  font-size: 14px;

  &__header {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
    background-color: #ffe4b5;
    border: 3px solid #ffe4b5;
    margin-bottom: 8px;
  }

  &__content {
    padding: 1.25rem 1rem;
    flex: 1 1 auto;
    border-radius: 0.75rem;
    margin-bottom: 20px;
    background-color: #fff;
  }
}
</style>

<style lang="scss">
/* Basic editor styles */
@media screen and (max-width: 768px) {
  .ProseMirror {
    min-height: 400px;
    max-height: 650px;
  }
  .ProseMirror:focus {
    box-shadow: 0 0 0 0;
    outline: 0;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
@media screen and (max-width: 380px) {
  .ProseMirror {
    min-height: 300px;
    max-height: 450px;
    font-size: 10px;
  }
  .ProseMirror:focus {
    box-shadow: 0 0 0 0;
    outline: 0;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}

.ProseMirror:focus {
  box-shadow: 0 0 0 0;
  outline: 0;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  padding: 5px 20px 5px 20px;
  margin-top: -0.7em;
  min-height: 600px;
  max-height: 700px;

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  mark {
    background-color: #faf594;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }

  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      align-items: center;

      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      > div {
        flex: 1 1 auto;
      }
    }
  }
}
</style>
