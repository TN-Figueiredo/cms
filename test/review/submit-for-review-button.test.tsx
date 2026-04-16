import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent, screen, waitFor, act } from '@testing-library/react'
import { SubmitForReviewButton } from '../../src/review/submit-for-review-button'

describe('<SubmitForReviewButton>', () => {
  it('renders the default pt-BR label', () => {
    render(<SubmitForReviewButton postId="p1" onSubmit={vi.fn()} />)
    expect(screen.getByRole('button', { name: /enviar para revisão/i })).toBeTruthy()
  })

  it('renders a custom label when provided', () => {
    render(<SubmitForReviewButton postId="p1" onSubmit={vi.fn()} label="Submit for review" />)
    expect(screen.getByRole('button', { name: 'Submit for review' })).toBeTruthy()
  })

  it('calls onSubmit with the post id on click', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    render(<SubmitForReviewButton postId="p1" onSubmit={onSubmit} />)
    fireEvent.click(screen.getByRole('button', { name: /enviar para revisão/i }))
    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith('p1'))
  })

  it('disables the button and shows loading label while onSubmit is pending', async () => {
    let resolve: () => void
    const pending = new Promise<void>((r) => {
      resolve = r
    })
    const onSubmit = vi.fn().mockReturnValue(pending)
    render(<SubmitForReviewButton postId="p2" onSubmit={onSubmit} />)
    const btn = screen.getByRole('button', { name: /enviar para revisão/i }) as HTMLButtonElement
    fireEvent.click(btn)
    await waitFor(() => {
      const loading = screen.getByRole('button', { name: /enviando/i }) as HTMLButtonElement
      expect(loading.disabled).toBe(true)
    })
    act(() => resolve!())
    await waitFor(() =>
      expect((screen.getByRole('button', { name: /enviar para revisão/i }) as HTMLButtonElement).disabled).toBe(false)
    )
  })

  it('re-enables the button if onSubmit rejects', async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error('boom'))
    render(<SubmitForReviewButton postId="p3" onSubmit={onSubmit} />)
    const btn = screen.getByRole('button', { name: /enviar para revisão/i }) as HTMLButtonElement
    fireEvent.click(btn)
    await waitFor(() => expect(btn.disabled).toBe(false))
    expect(onSubmit).toHaveBeenCalledWith('p3')
  })
})
