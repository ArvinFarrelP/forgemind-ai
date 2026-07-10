import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Download, Star, RotateCcw, Trash2, Clock, Type } from 'lucide-react'
import Button from '../ui/Button'
import Spinner from '../ui/Spinner'
import { SkeletonText } from '../ui/Skeleton'
import { countWords, estimateReadingTime, downloadTextFile, copyToClipboard } from '../../utils/format'
import { useToastStore } from '../../store/toastStore'

export default function OutputPanel({
  output,
  isLoading,
  isStreaming,
  error,
  onRegenerate,
  onClear,
  onFavorite,
  isFavorite,
  filename = 'forgemind-output.txt',
}) {
  const addToast = useToastStore((s) => s.addToast)
  const hasOutput = output && output.trim().length > 0

  async function handleCopy() {
    const success = await copyToClipboard(output)
    addToast(success ? 'Copied to clipboard.' : 'Could not copy to clipboard.', success ? 'success' : 'error')
  }

  function handleDownload() {
    downloadTextFile(filename, output)
    addToast('Download started.', 'success')
  }

  return (
    <div className="glass-card p-6 flex flex-col min-h-[420px]">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <h3 className="font-display font-semibold">Output</h3>
        {hasOutput && !isLoading && (
          <div className="flex items-center gap-4 text-xs text-forge-muted">
            <span className="flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5" /> {countWords(output)} words
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {estimateReadingTime(output)} min read
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto max-h-[520px]">
        {isLoading && !isStreaming && <SkeletonText lines={6} />}

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-400">{error}</div>
        )}

        {!error && !isLoading && !hasOutput && (
          <div className="flex flex-col items-center justify-center text-center h-full py-16 text-forge-muted">
            <Spinner size="sm" className="hidden" />
            <p className="text-sm">Your generated content will appear here.</p>
          </div>
        )}

        {hasOutput && (
          <div className="prose prose-invert prose-sm sm:prose-base max-w-none prose-headings:font-display prose-a:text-forge-ember">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" {...props}>
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-forge-surface2 px-1.5 py-0.5 rounded text-forge-amber" {...props}>
                      {children}
                    </code>
                  )
                },
              }}
            >
              {output}
            </ReactMarkdown>
            {isStreaming && <span className="inline-block w-2 h-4 bg-forge-ember animate-pulseGlow ml-0.5" />}
          </div>
        )}
      </div>

      {hasOutput && !isLoading && (
        <div className="flex flex-wrap gap-2.5 mt-6 pt-5 border-t border-white/5">
          <Button variant="secondary" size="sm" icon={Copy} onClick={handleCopy}>
            Copy
          </Button>
          <Button variant="secondary" size="sm" icon={Download} onClick={handleDownload}>
            Download
          </Button>
          <Button variant="secondary" size="sm" icon={RotateCcw} onClick={onRegenerate}>
            Regenerate
          </Button>
          <Button
            variant={isFavorite ? 'primary' : 'secondary'}
            size="sm"
            icon={Star}
            onClick={onFavorite}
          >
            {isFavorite ? 'Favorited' : 'Favorite'}
          </Button>
          <Button variant="ghost" size="sm" icon={Trash2} onClick={onClear}>
            Clear
          </Button>
        </div>
      )}
    </div>
  )
}
