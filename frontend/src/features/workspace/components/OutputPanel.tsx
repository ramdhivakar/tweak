export default function OutputPanel() {
  return (
    <textarea
      className="h-full w-full resize-none bg-[#050505] p-6 text-sm text-white outline-none placeholder:text-neutral-600"
      placeholder="Generated emails, troubleshooting notes and AI responses will appear here..."
    />
  );
}
