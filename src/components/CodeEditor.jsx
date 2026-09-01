import Editor from '@monaco-editor/react';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FileCode2, Moon, Sun } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import Output from './Output';
import { CODE_SNIPPETS, FILENAMES } from '../constants';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { defineNeutralDarkTheme } from './monacoTheme';

const CodeEditor = ({ isDark, onToggleTheme }) => {
  const [value, setValue] = useState(() => CODE_SNIPPETS.javascript || '');
  const [language, setLanguage] = useState('javascript');
  const editorRef = useRef();

  const onBeforeMount = (monaco) => {
    defineNeutralDarkTheme(monaco);
  };
  const onMount = (editor, monaco) => {
    editorRef.current = editor;
    if (isDark) {
        monaco.editor.setTheme('neutral-dark');
      }
    editor.focus();
  };

  const onSelect = (next) => {
    setLanguage(next);
    setValue(CODE_SNIPPETS[next] || '');
  };

  return (
    <div className="flex flex-col gap-4 lg:grid lg:min-h-0 lg:flex-1 lg:grid-cols-6 lg:items-stretch">
      <Card size="sm" className="flex min-h-0 flex-col overflow-hidden lg:col-span-4 lg:h-full pb-0 gap-0">
<CardHeader className="shrink-0 flex flex-row items-center justify-between gap-2 border-b [.border-b]:pb-3">
          <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
            <FileCode2 className="text-primary" />
            <span>{FILENAMES[language]}</span>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon-sm"
                    aria-label={
                      isDark ? 'Switch to light mode' : 'Switch to dark mode'
                    }
                    onClick={onToggleTheme}
                  >
                    {isDark ? <Sun /> : <Moon />}
                  </Button>
                }
              />
              <TooltipContent>
                {isDark ? 'Light mode' : 'Dark mode'}
              </TooltipContent>
            </Tooltip>
            <LanguageSelector language={language} onSelect={onSelect} />
          </div>
        </CardHeader>
        <CardContent className="flex min-h-0 flex-1 flex-col p-0">
          <div className="h-full w-full">
            <Editor
              height="100%"
              theme={isDark ? 'neutral-dark' : 'vs-light'}
              language={language}
              value={value}
              onChange={(next) => setValue(next || '')}
              beforeMount={onBeforeMount}
              onMount={onMount}
              options={{
                padding: {
                  top: 20,
                  left: 10,
                  right: 10,
                  bottom: 20,
                },
                fontSize: 16,
                fontFamily: 'Fira Code, Cascadia Code',
                fontLigatures: true,
                wordWrap: 'on',
                scrollBeyondLastLine: false,
                automaticLayout: true,
                minimap: { enabled: false },
                scrollbar: { verticalScrollbarSize: 10 },
              }}
            />

          </div>
        </CardContent>
      </Card>

      <Output editorRef={editorRef} language={language} />
    </div>
  );
};

CodeEditor.propTypes = {
  isDark: PropTypes.bool.isRequired,
  onToggleTheme: PropTypes.func.isRequired,
};

export default CodeEditor;
