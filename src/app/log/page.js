"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/components/AuthProvider";

export default function LogPage() {
  const { isAdmin } = useAuth();
  const [posts, setPosts] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState([{ type: "text", content: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => { fetchPosts(); }, []);

  async function fetchPosts() {
    try {
      const res = await fetch("/api/posts");
      setPosts(await res.json());
    } catch (e) {
      console.error(e);
    }
  }

  // ===== 블록 에디터 함수들 =====
  function updateBlock(index, value) {
    setBlocks((prev) => prev.map((b, i) => (i === index ? { ...b, content: value } : b)));
  }

  function addTextBlock() {
    setBlocks((prev) => [...prev, { type: "text", content: "" }]);
  }

  function removeBlock(index) {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleImageInsert() {
    fileInputRef.current?.click();
  }

  async function onFileSelected(e) {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (data.url) {
          setBlocks((prev) => [
            ...prev,
            { type: "image", url: data.url },
            { type: "text", content: "" },
          ]);
        }
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }
    e.target.value = "";
  }

  async function handleSubmit() {
    const filledBlocks = blocks.filter(
      (b) => (b.type === "text" && b.content.trim()) || b.type === "image"
    );
    if (!title.trim() || filledBlocks.length === 0) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, blocks: filledBlocks }),
      });
      if (res.ok) {
        setTitle("");
        setBlocks([{ type: "text", content: "" }]);
        setShowEditor(false);
        fetchPosts();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function confirmDelete() {
    if (!deleteTargetId) return;
    try {
      const res = await fetch(`/api/posts?id=${deleteTargetId}`, { method: "DELETE" });
      if (res.ok) {
        setExpandedId(null);
        fetchPosts();
      }
    } catch (e) {
      console.error("Delete error:", e);
    } finally {
      setDeleteTargetId(null);
    }
  }

  function toggleExpand(id) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  // ===== 렌더 =====
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            <h1 className="animate-fade-in-up delay-100 font-[family-name:var(--font-heading)] text-4xl sm:text-5xl font-bold tracking-tight text-text-primary">
              Log
            </h1>
            {isAdmin && (
              <button
                onClick={() => setShowEditor(!showEditor)}
                className="animate-fade-in-up delay-200 px-4 py-2 bg-accent text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,45,85,0.3)] hover:scale-105"
              >
                {showEditor ? "취소" : "+ 새 글"}
              </button>
            )}
          </div>
          <p className="animate-fade-in-up delay-200 text-text-muted mt-3 text-base">
            일상의 단편들을 기록합니다.
          </p>
          <div className="animate-fade-in-up delay-300 w-12 h-[2px] bg-accent mt-4" />
        </div>

        {/* ===== 블록형 에디터 ===== */}
        {showEditor && isAdmin && (
          <div className="animate-fade-in glass rounded-2xl p-6 mb-8">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent text-text-primary text-xl font-[family-name:var(--font-heading)] font-semibold placeholder:text-text-dim outline-none border-b border-glass-border pb-3 mb-4 focus:border-accent transition-colors"
            />

            {/* 블록 목록 */}
            <div className="space-y-3">
              {blocks.map((block, i) => (
                <div key={i} className="group relative">
                  {block.type === "text" ? (
                    <textarea
                      placeholder="내용을 작성하세요..."
                      value={block.content}
                      onChange={(e) => updateBlock(i, e.target.value)}
                      rows={3}
                      className="w-full bg-white/5 rounded-xl px-4 py-3 text-text-primary text-sm placeholder:text-text-dim outline-none resize-none leading-relaxed border border-transparent focus:border-glass-border transition-colors"
                    />
                  ) : (
                    <div className="relative rounded-xl overflow-hidden">
                      <img src={block.url} alt="" className="w-full rounded-xl" />
                    </div>
                  )}
                  {/* 블록 삭제 버튼 */}
                  {blocks.length > 1 && (
                    <button
                      onClick={() => removeBlock(i)}
                      className="absolute -right-2 -top-2 w-6 h-6 bg-bg-secondary border border-glass-border rounded-full text-text-dim hover:text-accent text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* 블록 추가 버튼 */}
            <div className="flex gap-2 mt-4 border-t border-glass-border pt-4">
              <button
                type="button"
                onClick={addTextBlock}
                className="flex items-center gap-1.5 px-3 py-2 glass glass-hover rounded-lg text-text-muted text-xs hover:text-text-primary transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                + 글 블록
              </button>
              <button
                type="button"
                onClick={handleImageInsert}
                className="flex items-center gap-1.5 px-3 py-2 glass glass-hover rounded-lg text-text-muted text-xs hover:text-text-primary transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                + 사진 추가
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={onFileSelected} className="hidden" />
            </div>

            {/* 게시 */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !title.trim()}
                className="px-6 py-2.5 bg-accent text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,45,85,0.3)] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "게시 중..." : "게시하기"}
              </button>
            </div>
          </div>
        )}

        {/* ===== 글 목록 (토글/아코디언) ===== */}
        <div className="space-y-2">
          {posts.length === 0 && (
            <div className="animate-fade-in text-center py-20 text-text-dim">
              <p className="text-4xl mb-4">✦</p>
              <p>아직 기록이 없습니다.</p>
            </div>
          )}
          {posts.map((post) => {
            const isOpen = expandedId === post.id;
            return (
              <article key={post.id} className="glass rounded-2xl overflow-hidden transition-all duration-300">
                {/* 토글 헤더 — 클릭 시 펼쳐짐 */}
                <button
                  onClick={() => toggleExpand(post.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left group glass-hover transition-all duration-300"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <time className="text-text-dim text-xs font-mono tracking-wider shrink-0">
                      {post.date}
                    </time>
                    <h2 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-text-primary group-hover:text-accent transition-colors truncate">
                      {post.title}
                    </h2>
                  </div>
                  <svg
                    className={`w-4 h-4 text-text-dim transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* 토글 본문 — 펼쳐진 상태 */}
                {isOpen && (
                  <div className="px-6 pb-6 animate-fade-in border-t border-glass-border">
                    <div className="pt-4 space-y-4">
                      {(post.blocks || []).map((block, i) => {
                        if (block.type === "text") {
                          return (
                            <p key={i} className="text-text-muted text-sm leading-relaxed whitespace-pre-wrap">
                              {block.content}
                            </p>
                          );
                        }
                        if (block.type === "image") {
                          return (
                            <img key={i} src={block.url} alt="" className="rounded-xl max-w-full" />
                          );
                        }
                        return null;
                      })}
                      {!post.blocks && post.content && (
                        <p className="text-text-muted text-sm leading-relaxed whitespace-pre-wrap">
                          {post.content}
                        </p>
                      )}
                    </div>
                    {isAdmin && (
                      <div className="mt-4 pt-3 border-t border-glass-border flex justify-end">
                        <button
                          onClick={() => setDeleteTargetId(post.id)}
                          className="text-text-dim hover:text-accent text-xs transition-colors"
                        >
                          이 글 삭제
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      {deleteTargetId && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setDeleteTargetId(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass rounded-2xl p-8 w-full max-w-xs text-center"
          >
            <p className="text-text-primary font-[family-name:var(--font-heading)] font-semibold text-lg mb-2">
              삭제 확인
            </p>
            <p className="text-text-muted text-sm mb-6">
              정말 이 글을 삭제하시겠습니까?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="flex-1 py-2.5 glass glass-hover rounded-xl text-text-muted text-sm font-medium transition-all"
              >
                취소
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 bg-accent text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,45,85,0.3)]"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
