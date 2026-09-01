import { useState } from 'react';
import PropTypes from 'prop-types';
import { executeCode } from '../api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldLabel } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/toast';
import {
  CheckCheck,
  ChevronsLeftRightEllipsis,
  CircleX,
  Loader2,
  MemoryStick,
  Play,
  SquareTerminal,
  Timer,
  TriangleAlert,
  Zap,
} from 'lucide-react';
import { LANGUAGE_NAMES } from '../constants';
import { cn } from '@/lib/utils';

const STATUS_TONE = {
  Accepted: 'success',
  'Wrong Answer': 'warning',
  'Compilation Error': 'error',
  'Runtime Error': 'error',
  'Time Limit Exceeded': 'warning',
  'Memory Limit Exceeded': 'warning',
  'Internal Error': 'error',
};

function StatusBadge({ tone, status }) {
  if (tone === 'success') {
    return (
      <Badge variant="secondary" className="gap-1">
        <CheckCheck className="text-success" />
        {status}
      </Badge>
    );
  }

  if (tone === 'warning') {
    return (
      <Badge variant="secondary" className="gap-1">
        <TriangleAlert className="text-warning" />
        {status}
      </Badge>
    );
  }

  if (tone === 'error') {
    return (
      <Badge variant="destructive" className="gap-1">
        <CircleX />
        {status}
      </Badge>
    );
  }

  return <Badge variant="outline">{status}</Badge>;
}

StatusBadge.propTypes = {
  tone: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isError, setIsError] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [meta, setMeta] = useState(null);

  const runCode = async () => {
    const sourceCode = editorRef.current?.getValue();
    if (!sourceCode || isRunning) return;

    try {
      setIsRunning(true);
      setOutput(null);
      setMeta(null);

      const result = await executeCode(language, sourceCode, inputValue);
      const text = result.stdout || result.stderr || result.compile_output || '';
      const failed = Boolean(result.stderr || result.compile_output);
      setOutput(text.split('\n'));
      setIsError(failed);
      setMeta({
        status: result.status?.description || null,
        time: result.time,
        memory: result.memory,
      });
    } catch (error) {
      toast.add({
        title: 'Execution failed',
        description: error.message || 'Unable to reach the execution service.',
        type: 'error',
      });
      console.error(error);
      setIsError(true);
    } finally {
      setIsRunning(false);
    }
  };

  const status = meta?.status ?? null;
  const tone = STATUS_TONE[status] ?? 'neutral';

  return (
    <Card
      size="sm"
      className="flex min-h-0 flex-col overflow-hidden lg:col-span-2 lg:h-full"
    >
      <CardHeader className="flex flex-row items-center justify-between gap-2 border-b [.border-b]:pb-3">
        <div className="flex items-center gap-2">
          <SquareTerminal size={18} className="text-primary" />
          <CardTitle className="font-mono text-sm uppercase tracking-[0.2em]">
            Console
          </CardTitle>
        </div>
        <Button size="sm" onClick={runCode} disabled={isRunning}>
          {isRunning ? (
            <Loader2 data-icon="inline-start" className="animate-spin" />
          ) : (
            <Play data-icon="inline-start" fill="currentColor" />
          )}
          {isRunning ? 'Running…' : 'Run'}
        </Button>
      </CardHeader>

      <CardContent className="flex min-h-0 flex-1 flex-col gap-3 p-3">
        <Field>
          <FieldLabel className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            <ChevronsLeftRightEllipsis size={18} />
            stdin
          </FieldLabel>
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Input passed to your program on STDIN…"
            className="min-h-20 resize-none font-mono text-sm"
          />
        </Field>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border">
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              Output
            </span>
            {meta && status ? (
              <StatusBadge tone={tone} status={status} />
            ) : null}
          </div>

          <ScrollArea className="min-h-0 flex-1">
            <div
              className={cn(
                'p-3 font-mono text-sm leading-relaxed',
                isError ? 'text-destructive' : 'text-foreground'
              )}
            >
              {isRunning ? (
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              ) : output ? (
                output.length ? (
                  output.map((line, i) => (
                    <p key={i} className="min-h-4 whitespace-pre-wrap">
                      {line || '\u00A0'}
                    </p>
                  ))
                ) : (
                  <p className="text-success">
                    Program finished with no output.
                  </p>
                )
              ) : (
                <p className="text-muted-foreground">
                  Run your code — output lands here.
                </p>
              )}
            </div>
          </ScrollArea>
        </div>
      </CardContent>

      <CardFooter className="justify-between gap-2 text-xs font-mono text-muted-foreground">
        <span className="flex min-w-0 items-center gap-1.5 truncate">
          <span
            className={cn(
              'size-1.5 shrink-0 rounded-full',
              tone === 'success'
                ? 'bg-success'
                : tone === 'error'
                  ? 'bg-destructive'
                  : tone === 'warning'
                    ? 'bg-warning'
                    : 'bg-muted-foreground/40'
            )}
          />
          {isRunning ? 'compiling…' : status ?? 'idle'}
        </span>

        <div className="flex shrink-0 items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Timer className="size-3.5 text-primary" />
            {meta?.time ? `${meta.time}s` : '–'}
          </span>
          <span className="flex items-center gap-1.5">
            <MemoryStick className="size-3.5 text-primary" />
            {meta?.memory ? `${Math.round(meta.memory)} KB` : '–'}
          </span>
          <span className="hidden items-center gap-1.5 md:flex">
            <Zap className="size-3.5 text-primary" />
            {LANGUAGE_NAMES[language]}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

Output.propTypes = {
  editorRef: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
};

export default Output;
