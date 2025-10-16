import React, { useState } from "react";

type Props = {
  initialTags?: string[];
  placeholder?: string;
  onChange?: (tags: string[]) => void;
};

export default function TagInput({ initialTags = [], placeholder = "Type and press Enter...", onChange }: Props) {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [input, setInput] = useState<string>("");

  const addTag = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    // prevent duplicates (case-insensitive)
    if (tags.some(t => t.toLowerCase() === trimmed.toLowerCase())) return;
    const newTags = [...tags, trimmed];
    setTags(newTags);
    onChange?.(newTags);
  };

  const removeTag = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    onChange?.(newTags);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(input);
      setInput("");
    } else if (e.key === "Backspace" && input === "" && tags.length > 0) {
      // remove last tag on backspace when input empty
      removeTag(tags.length - 1);
    } else if (e.key === "," ) {
      // optional: treat comma as tag separator
      e.preventDefault();
      addTag(input);
      setInput("");
    }
  };

  const handlePaste: React.ClipboardEventHandler<HTMLInputElement> = (e) => {
    // optional: if user pastes "a, b, c" -> split into tags
    const paste = e.clipboardData.getData("text");
    if (paste.includes(",")) {
      e.preventDefault();
      paste.split(",").map(p => p.trim()).forEach(p => addTag(p));
      setInput("");
    }
  };

  return (
    <div style={{ border: "1px solid #ddd", padding: 8, borderRadius: 6, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
      {tags.map((tag, i) => (
        <div key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 8px", borderRadius: 16, background: "#f1f1f1" }}>
          <span style={{ fontSize: 13 }}>{tag}</span>
          <button
            onClick={() => removeTag(i)}
            aria-label={`Remove ${tag}`}
            style={{ border: "none", background: "transparent", cursor: "pointer", fontWeight: 600 }}
            >
            ×
          </button>
        </div>
      ))}

      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        placeholder={placeholder}
        style={{ flex: 1, minWidth: 120, border: "none", outline: "none", padding: "6px 4px", fontSize: 14, background: "#fff"}}
      />
    </div>
  );
}
