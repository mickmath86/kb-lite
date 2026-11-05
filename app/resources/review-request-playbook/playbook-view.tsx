'use client'

import { useState } from 'react'
import type { PlaybookBlock, PlaybookDocument } from '@/lib/review-playbook/schema'

function templateText(block: Extract<PlaybookBlock, { type: 'template' }>) {
  return block.subject ? `Subject: ${block.subject}\n\n${block.body}` : block.body
}

function Block({ block, copyId, copiedId, onCopy }: {
  block: PlaybookBlock
  copyId: string
  copiedId: string
  onCopy: (id: string, text: string) => void
}) {
  if (block.type === 'paragraph') {
    return <p className="text-base/7 text-[#24241f]">{block.text}</p>
  }
  if (block.type === 'note') {
    return (
      <aside className="border-l-2 border-[#5c445e] pl-4">
        <p className="text-sm font-medium text-[#3f2e41]">{block.title}</p>
        <p className="mt-1 text-base/7 text-[#24241f]">{block.text}</p>
      </aside>
    )
  }
  if (block.type === 'list' || block.type === 'steps') {
    const ListTag = block.type === 'steps' ? 'ol' : 'ul'
    return (
      <ListTag className={block.type === 'steps' ? 'list-decimal space-y-2 pl-5 text-base/7 text-[#24241f]' : 'list-disc space-y-2 pl-5 text-base/7 text-[#24241f]'}>
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ListTag>
    )
  }
  if (block.type === 'link') {
    return (
      <p className="text-base/7 text-[#24241f]">
        <a href={block.href} className="underline decoration-[#596352] underline-offset-4">
          {block.label}
        </a>{' '}
        {block.text}
      </p>
    )
  }
  const copied = copiedId === copyId
  return (
    <figure className="border border-[#0c0c09]/12 bg-[#f4f4f0]">
      <figcaption className="flex items-center justify-between gap-3 border-b border-[#0c0c09]/10 px-4 py-3">
        <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#3e5560]">{block.label}</span>
        <button
          type="button"
          className="text-sm font-medium text-[#0c0c09] underline decoration-[#596352] underline-offset-4"
          onClick={() => onCopy(copyId, templateText(block))}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </figcaption>
      {block.subject ? <p className="px-4 pt-4 text-sm text-[#24241f]">Subject: {block.subject}</p> : null}
      <pre className="playbook-sans whitespace-pre-wrap px-4 py-4 text-sm/6 text-[#0c0c09]">{block.body}</pre>
    </figure>
  )
}

export function PlaybookView({ playbook, preview }: { playbook: PlaybookDocument; preview: boolean }) {
  const [copiedId, setCopiedId] = useState('')

  async function onCopy(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
    } catch {
      setCopiedId('')
    }
  }

  return (
    <article className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#5c445e]">Kickbord · Review request playbook</p>
      <h1
        id="playbook-title"
        tabIndex={-1}
        className="playbook-serif mt-4 text-5xl leading-none tracking-tight text-[#0c0c09] sm:text-6xl"
      >
        {playbook.title}
      </h1>
      <p className="mt-6 text-lg/8 text-[#24241f]">{playbook.dek}</p>
      {preview ? (
        <p className="mt-6 border border-[#7b627d] bg-white px-4 py-3 text-sm/6 text-[#3f2e41]" role="status">
          Developer preview. The playbook is open so you can review the page. No webhook was called. This path stays off in production.
        </p>
      ) : (
        <p className="mt-6 text-sm/6 text-[#3a3a34]" role="status">
          Your request was accepted. The playbook is on this page. There is no account, so a refresh brings the form back. Print it if you want a copy.
        </p>
      )}
      <div className="mt-6 flex flex-wrap gap-3 print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center rounded-full bg-[#0c0c09] px-4 py-2 text-sm font-medium text-[#f4f4f0]"
        >
          Print or save as PDF
        </button>
      </div>

      <nav aria-label="Playbook sections" className="mt-12 border-t border-[#0c0c09]/10 pt-6">
        <h2 className="playbook-serif text-2xl text-[#0c0c09]">Contents</h2>
        <ol className="mt-4 space-y-2">
          {playbook.sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="text-base/7 text-[#24241f] underline decoration-[#596352]/50 underline-offset-4">
                <span className="mr-3 text-sm text-[#5c445e]">{section.number}</span>
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-4">
        {playbook.sections.map((section) => (
          <section id={section.id} key={section.id} className="scroll-mt-8 border-t border-[#0c0c09]/10 pt-10 mt-12">
            <p className="text-sm tracking-[0.16em] text-[#5c445e]">{section.number}</p>
            <h2 className="playbook-serif mt-2 text-4xl tracking-tight text-[#0c0c09]">{section.title}</h2>
            <div className="mt-6 space-y-5">
              {section.blocks.map((block, index) => (
                <Block
                  key={`${section.id}-${index}`}
                  block={block}
                  copyId={`${section.id}-${index}`}
                  copiedId={copiedId}
                  onCopy={onCopy}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {copiedId ? 'Template copied.' : ''}
      </p>
    </article>
  )
}
