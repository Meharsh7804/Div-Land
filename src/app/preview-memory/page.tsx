import { MemoryScene } from "@/components/memories/MemoryArt";

export default function PreviewMemoryPage() {
  return (
    <main style={{ background: "#F9EEE8", minHeight: "100vh", padding: 24, display: "grid", gap: 24 }}>
      <div style={{ width: 960, height: 630, overflow: "hidden", background: "#FFF9F0", borderRadius: 24 }}>
        <MemoryScene kind="sleep" animated={false} className="h-full w-full" />
      </div>
      <div style={{ width: 960, height: 630, overflow: "hidden", background: "#FFF9F0", borderRadius: 24 }}>
        <MemoryScene kind="sleep" animated className="h-full w-full" />
      </div>
    </main>
  );
}
