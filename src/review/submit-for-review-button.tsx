'use client'

import { useState } from 'react'

export interface SubmitForReviewButtonProps {
  postId: string
  onSubmit: (id: string) => Promise<void>
  /** Override the idle-state label (default: pt-BR "Enviar para revisão"). */
  label?: string
  /** Override the pending-state label (default: pt-BR "Enviando…"). */
  pendingLabel?: string
  /** Optional className override for the button element. */
  className?: string
}

const DEFAULT_CLASS_NAME =
  'rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50'

/**
 * SubmitForReviewButton — reporter-facing action that flips a post from
 * `draft` → `pending_review`. Wraps the consumer-provided `onSubmit` callback
 * in a pending-state lock so double-clicks and submit-while-in-flight both
 * render correctly. The button re-enables on both success AND failure so the
 * reporter can retry after a transient error.
 */
export function SubmitForReviewButton({
  postId,
  onSubmit,
  label = 'Enviar para revisão',
  pendingLabel = 'Enviando…',
  className = DEFAULT_CLASS_NAME,
}: SubmitForReviewButtonProps) {
  const [pending, setPending] = useState(false)
  return (
    <button
      type="button"
      disabled={pending}
      onClick={async () => {
        setPending(true)
        try {
          await onSubmit(postId)
        } catch {
          // Swallow: `onSubmit` contract is "consumer surfaces its own errors
          // (toast, form error, etc.)". Re-throwing here would produce an
          // unhandled rejection in the React event loop. We always re-enable
          // the button so the reporter can retry.
        } finally {
          setPending(false)
        }
      }}
      className={className}
    >
      {pending ? pendingLabel : label}
    </button>
  )
}
