import { MemoryScene } from "@/components/memories/MemoryArt";
import type { MemoryKey } from "@/data/memories";

const keys: MemoryKey[] = ["beginning", "food", "conversations", "reels", "unexpected"];

export default function PreviewFixPage() {
  return (
    <main style={{ background: "#F9EEE8", minHeight: "100vh", padding: 24, display: "grid", gap: 24 }}>
      {keys.map((kind) => (
        <section key={kind} id={`scene-${kind}`} data-kind={kind} style={{ width: 960, height: 630, background: "#FFF9F0", borderRadius: 24, overflow: "hidden" }}>
          <MemoryScene kind={kind} animated className="h-full w-full" />
        </section>
      ))}
    </main>
  );
}
