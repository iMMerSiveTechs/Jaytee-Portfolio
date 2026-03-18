import { useState, useCallback } from 'react';
import { toast } from 'sonner';

const BACKEND = process.env.REACT_APP_BACKEND_URL;

export function parseError(message) {
  const lower = (message || '').toLowerCase();
  if (lower.includes('too short') || lower.includes('at least')) {
    return { title: 'Input too short', detail: 'Add more detail or context for a better analysis.', fixable: true, fixType: 'expand' };
  }
  if (lower.includes('too long') || lower.includes('3000')) {
    return { title: 'Input too long', detail: 'Trim your input to under 3,000 characters.', fixable: true, fixType: 'trim' };
  }
  if (lower.includes('parse') || lower.includes('json')) {
    return { title: 'AI response was malformed', detail: 'The AI returned an unexpected format. Running again usually fixes this.', fixable: false };
  }
  if (lower.includes('not configured') || lower.includes('llm service')) {
    return { title: 'Service unavailable', detail: 'The AI service is not configured on the server. Contact support.', fixable: false };
  }
  if (lower.includes('network') || lower.includes('fetch') || lower.includes('failed to fetch')) {
    return { title: 'Network error', detail: 'Could not reach the server. Check your connection and try again.', fixable: false };
  }
  return { title: message || 'Something went wrong', detail: null, fixable: false };
}

export function useToolRunner({ endpoint, toolName, errorMessage, expandHint, formatResult, extraBody }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const run = useCallback(async () => {
    if (input.trim().length < 10) { setError('Please provide at least a sentence of context.'); return; }
    setLoading(true); setError(''); setResult(null);
    try {
      const body = { text: input, ...(extraBody || {}) };
      const res = await fetch(`${BACKEND}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      let data;
      try { data = await res.json(); } catch { throw new Error('Unexpected server response. Please try again.'); }
      if (!res.ok) throw new Error(data.detail || 'Analysis failed.');
      setResult(data.data);
    } catch (err) {
      console.error(`${toolName} error:`, err);
      setError(err.message || errorMessage);
    } finally {
      setLoading(false);
    }
  }, [input, endpoint, toolName, errorMessage, extraBody]);

  const handleFix = useCallback(() => {
    const parsed = parseError(error);
    if (parsed.fixType === 'expand') {
      setInput(prev => prev + `\n\n[Add more context: ${expandHint}]`);
    } else if (parsed.fixType === 'trim') {
      setInput(prev => prev.slice(0, 2900));
    }
    setError('');
  }, [error, expandHint]);

  const copy = useCallback(() => {
    if (!result) return;
    const text = formatResult(result);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast.success('Output copied.');
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => toast.error('Failed to copy to clipboard.'));
  }, [result, formatResult]);

  return { input, setInput, loading, result, error, copied, run, handleFix, copy };
}
