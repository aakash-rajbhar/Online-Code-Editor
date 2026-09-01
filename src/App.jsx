import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toast';
import CodeEditor from './components/CodeEditor';

function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <TooltipProvider delay={200}>
      <div className="relative flex h-dvh flex-col">
        {/* <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
          <div className="mx-auto flex w-full items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary font-mono text-[13px] font-bold text-primary-foreground shadow-[0_0_24px_-6px_var(--primary)]">
                &gt;_
              </span>
              <div className="leading-tight">
                <p className="font-heading text-base font-semibold uppercase tracking-[0.18em]">
                  Forge
                </p>
                <p className="text-xs text-muted-foreground">
                  write · run · refine
                </p>
              </div>
            </div>

            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon-sm"
                    aria-label={
                      isDark ? 'Switch to light mode' : 'Switch to dark mode'
                    }
                    onClick={() => setIsDark((prev) => !prev)}
                  >
                    {isDark ? <Sun /> : <Moon />}
                  </Button>
                }
              />
              <TooltipContent>
                {isDark ? 'Light mode' : 'Dark mode'}
              </TooltipContent>
            </Tooltip>
          </div>
        </header>*/}

        <main className="mx-auto flex w-full min-h-0 flex-1 flex-col overflow-y-auto px-4 pb-4 pt-3 sm:px-6 lg:px-8">
          <CodeEditor isDark={isDark} />
        </main>
      </div>

      <Toaster />
    </TooltipProvider>
  );
}

export default App;
