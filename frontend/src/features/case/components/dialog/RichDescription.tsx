import { useEffect } from "react";

import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import { EditorContent, useEditor } from "@tiptap/react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichDescription({
  value,
  onChange,
  placeholder,
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Placeholder.configure({
        placeholder:
          placeholder ??
          "Describe the issue... You can also paste screenshots.",
      }),
    ],

    content: value,

    editorProps: {
      attributes: {
        class:
          "min-h-[220px] rounded-xl border border-[#232323] bg-[#0A0A0A] p-4 text-white outline-none",
      },

      handlePaste(view, event) {
        const items = event.clipboardData?.items;

        if (!items) return false;

        for (const item of items) {
          if (item.type.startsWith("image/")) {
            const file = item.getAsFile();

            if (!file) continue;

            const reader = new FileReader();

            reader.onload = () => {
              editor
                ?.chain()
                .focus()
                .setImage({
                  src: reader.result as string,
                })
                .run();
            };

            reader.readAsDataURL(file);

            return true;
          }
        }

        return false;
      },
    },

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (editor.getHTML() !== value) {
      editor.commands.setContent(value || "", false);
    }
  }, [value, editor]);

  if (!editor) return null;

  return <EditorContent editor={editor} />;
}
