import { useEffect, useState } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
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
        <main className="mx-auto flex w-full min-h-0 flex-1 flex-col overflow-y-auto px-4 pb-4 pt-3 sm:px-6 lg:px-8">
          <CodeEditor isDark={isDark} onToggleTheme={() => setIsDark((prev) => !prev)} />
        </main>
      </div>

      <Toaster />
    </TooltipProvider>
  );
}

export default App;
