'use client'

import type { ReactNode } from 'react'

export interface ReviewItem {
  id: string
  title: string
  author_name: string
  submitted_at: string
  excerpt: string
}

export interface ReviewQueueProps {
  items: ReviewItem[]
  onApprove: (id: string) => Promise<void>
  onReject: (id: string, reason: string) => Promise<void>
  /** Custom empty-state node (default: pt-BR "Nenhum post aguardando revisão."). */
  emptyState?: ReactNode
  /** Locale used for `Date.toLocaleDateString` formatting (default: pt-BR). */
  locale?: string
  /** Custom className overrides for each surface. */
  classNames?: {
    list?: string
    item?: string
    title?: string
    meta?: string
    excerpt?: string
    actions?: string
    approve?: string
    reject?: string
  }
}

const DEFAULT_CLASS_NAMES: Required<NonNullable<ReviewQueueProps['classNames']>> = {
  list: 'divide-y',
  item: 'py-3',
  title: 'font-medium',
  meta: 'text-sm text-neutral-600',
  excerpt: 'mt-1 text-sm',
  actions: 'mt-2 flex gap-2',
  approve: 'rounded bg-green-600 px-3 py-1 text-sm text-white',
  reject: 'rounded bg-neutral-200 px-3 py-1 text-sm',
}

/**
 * ReviewQueue — editor+ inbox rendering the list of `pending_review` posts
 * with Approve / Reject actions. Rejection opens a native `window.prompt`
 * asking for a reason; the callback is skipped when the editor cancels or
 * enters an empty string.
 *
 * Date formatting uses the consumer-supplied `locale` (default pt-BR).
 */
export function ReviewQueue({
  items,
  onApprove,
  onReject,
  emptyState,
  locale = 'pt-BR',
  classNames,
}: ReviewQueueProps) {
  const cx = { ...DEFAULT_CLASS_NAMES, ...(classNames ?? {}) }

  if (items.length === 0) {
    return <div>{emptyState ?? 'Nenhum post aguardando revisão.'}</div>
  }

  return (
    <ul className={cx.list}>
      {items.map((item) => (
        <li key={item.id} className={cx.item}>
          <div className={cx.title}>{item.title}</div>
          <div className={cx.meta}>
            por {item.author_name} · {new Date(item.submitted_at).toLocaleDateString(locale)}
          </div>
          <p className={cx.excerpt}>{item.excerpt}</p>
          <div className={cx.actions}>
            <button
              type="button"
              onClick={() => {
                void onApprove(item.id)
              }}
              className={cx.approve}
            >
              Aprovar
            </button>
            <button
              type="button"
              onClick={() => {
                const reason = window.prompt('Motivo da rejeição:') ?? ''
                if (reason) {
                  void onReject(item.id, reason)
                }
              }}
              className={cx.reject}
            >
              Rejeitar
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
