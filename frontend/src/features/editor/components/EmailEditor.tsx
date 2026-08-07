import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import { useEffect } from "react";
import { useEditor as useDraft } from "../context/EditorContext";

export default function EmailEditor() {
  const { draft, setBody } = useDraft();

  const insertImage = (file: File) => {
    if (!editor) return;

    const reader = new FileReader();

    reader.onload = () => {
      editor
        .chain()
        .focus()
        .setImage({
          src: reader.result as string,
        })
        .run();
    };

    reader.readAsDataURL(file);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image,
      Placeholder.configure({
        placeholder: "Select a template or start composing your email...",
      }),
    ],

    content: draft.body,

    editorProps: {
      attributes: {
        class:
          "min-h-full h-full outline-none px-8 py-6 max-w-none text-[15px] leading-7",
        spellcheck: "true",
        autocorrect: "on",
        autocapitalize: "sentences",
        autocomplete: "off",
        "data-gramm": "true",
        "data-gramm_editor": "true",
        "data-enable-grammarly": "true",
        lang: "en",
      },

      handlePaste(view, event) {
        const items = event.clipboardData?.items;

        if (!items) return false;

        for (const item of items) {
          if (item.type.startsWith("image/")) {
            const file = item.getAsFile();

            if (file) {
              insertImage(file);
              return true;
            }
          }
        }

        return false;
      },
      handleDrop(view, event) {
        const files = event.dataTransfer?.files;

        if (!files?.length) return false;

        for (const file of files) {
          if (file.type.startsWith("image/")) {
            insertImage(file);
            return true;
          }
        }

        return false;
      },
    },

    onUpdate({ editor }) {
      setBody(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (editor.getHTML() !== draft.body) {
      editor.commands.setContent(draft.body || "", false);
    }
  }, [draft.body, editor]);

  if (!editor) return null;

  return (
    <div className="h-full w-full flex-1 overflow-auto">
      <EditorContent editor={editor} className="h-full" />
    </div>
  );
}
