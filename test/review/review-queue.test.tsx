import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { ReviewQueue } from '../../src/review/review-queue'
import type { ReviewItem } from '../../src/review/review-queue'

function item(overrides: Partial<ReviewItem> = {}): ReviewItem {
  return {
    id: 'post-1',
    title: 'Como virar editor chefe',
    author_name: 'Ana Reporter',
    submitted_at: '2026-04-16T12:00:00.000Z',
    excerpt: 'Trecho do artigo que foi submetido para revisão.',
    ...overrides,
  }
}

describe('<ReviewQueue>', () => {
  it('renders the default empty state when items list is empty', () => {
    render(<ReviewQueue items={[]} onApprove={vi.fn()} onReject={vi.fn()} />)
    expect(screen.getByText(/nenhum post aguardando revisão/i)).toBeTruthy()
  })

  it('renders a custom empty state when provided', () => {
    render(
      <ReviewQueue
        items={[]}
        onApprove={vi.fn()}
        onReject={vi.fn()}
        emptyState={<p>Nothing to review</p>}
      />
    )
    expect(screen.getByText('Nothing to review')).toBeTruthy()
  })

  it('renders each item with title, author, and excerpt', () => {
    render(
      <ReviewQueue
        items={[
          item(),
          item({
            id: 'post-2',
            title: 'Segundo post',
            author_name: 'Bruno',
            excerpt: 'Excerpt do segundo item',
          }),
        ]}
        onApprove={vi.fn()}
        onReject={vi.fn()}
      />
    )
    expect(screen.getByText('Como virar editor chefe')).toBeTruthy()
    expect(screen.getByText(/Ana Reporter/)).toBeTruthy()
    expect(screen.getByText(/Trecho do artigo/)).toBeTruthy()
    expect(screen.getByText('Segundo post')).toBeTruthy()
    expect(screen.getByText(/Bruno/)).toBeTruthy()
    expect(screen.getByText('Excerpt do segundo item')).toBeTruthy()
  })

  it('calls onApprove with the item id when Approve is clicked', async () => {
    const onApprove = vi.fn().mockResolvedValue(undefined)
    render(<ReviewQueue items={[item()]} onApprove={onApprove} onReject={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: /aprovar/i }))
    await waitFor(() => expect(onApprove).toHaveBeenCalledWith('post-1'))
  })

  describe('Reject flow (uses window.prompt)', () => {
    const originalPrompt = window.prompt
    beforeEach(() => {
      // happy-dom ships a prompt that throws; we stub it per-test.
    })
    afterEach(() => {
      window.prompt = originalPrompt
    })

    it('calls onReject with id and reason when user enters a reason', async () => {
      window.prompt = vi.fn().mockReturnValue('Falta fonte primária')
      const onReject = vi.fn().mockResolvedValue(undefined)
      render(<ReviewQueue items={[item()]} onApprove={vi.fn()} onReject={onReject} />)
      fireEvent.click(screen.getByRole('button', { name: /rejeitar/i }))
      await waitFor(() => expect(onReject).toHaveBeenCalledWith('post-1', 'Falta fonte primária'))
    })

    it('does NOT call onReject when user cancels the prompt (returns null)', () => {
      window.prompt = vi.fn().mockReturnValue(null)
      const onReject = vi.fn()
      render(<ReviewQueue items={[item()]} onApprove={vi.fn()} onReject={onReject} />)
      fireEvent.click(screen.getByRole('button', { name: /rejeitar/i }))
      expect(onReject).not.toHaveBeenCalled()
    })

    it('does NOT call onReject when user submits an empty reason', () => {
      window.prompt = vi.fn().mockReturnValue('')
      const onReject = vi.fn()
      render(<ReviewQueue items={[item()]} onApprove={vi.fn()} onReject={onReject} />)
      fireEvent.click(screen.getByRole('button', { name: /rejeitar/i }))
      expect(onReject).not.toHaveBeenCalled()
    })
  })
})
