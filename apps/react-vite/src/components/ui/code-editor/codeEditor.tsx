import { loader } from '@monaco-editor/react';
import JSON5 from 'json5';
import * as monaco from 'monaco-editor';
// import { format as formatJS } from 'prettier';
// import parserBabel from 'prettier/parser-babel';
import React, { useEffect, useRef } from 'react';
import { format as formatSQL } from 'sql-formatter';
import { Button } from '../button';
import { Typography } from '../typography';

// Load Monaco Editor
loader.config({ monaco });

interface CodeEditorProps {
  language: 'json' | 'sql' | 'javascript';
  value: string;
  onChange: (value: string) => void;
  options?: monaco.editor.IStandaloneEditorConstructionOptions;
  contextOptions?: { tables: Record<string, string[]> };
  theme?: 'light' | 'dark';
  error?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  value,
  onChange,
  options = {},
  contextOptions = {},
  theme = 'light',
  error,
}) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef(null);

  useEffect(() => {
    if (monacoEl.current) {
      editorRef.current = monaco.editor.create(monacoEl.current, {
        value,
        language,
        minimap: { enabled: true },
        folding: true,
        lineNumbers: 'on',
        wordWrap: 'on',
        theme: theme === 'light' ? 'vs' : 'vs-dark',
        ...options,
      });

      editorRef.current.onDidChangeModelContent(() => {
        onChange(editorRef.current?.getValue() || '');
      });

      // Set up language-specific features
      setupLanguageFeatures(language, contextOptions);
    }

    return () => editorRef.current?.dispose();
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({
        theme: theme === 'dark' ? 'vs-dark' : 'vs-light',
      });
    }
  }, [theme]);

  useEffect(() => {
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      if (model) monaco.editor.setModelLanguage(model, language);
      setupLanguageFeatures(language, contextOptions);
    }
  }, [language, contextOptions]);

  const setupLanguageFeatures = (lang: string, context: any) => {
    switch (lang) {
      case 'json':
        setupJSONFeatures();
        break;
      case 'sql':
        setupSQLFeatures(context);
        break;
      case 'javascript':
        setupJavaScriptFeatures();
        break;
    }
  };

  const setupJSONFeatures = () => {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      allowComments: true,
      schemas: [],
    });
  };

  const setupSQLFeatures = (context: Record<string, string[]>) => {
    monaco.languages.registerCompletionItemProvider('sql', {
      provideCompletionItems: (model, position) => {
        const textUntilPosition = model.getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        });
        const wordUntilPosition = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: wordUntilPosition.startColumn,
          endColumn: wordUntilPosition.endColumn,
        };

        const suggestions: monaco.languages.CompletionItem[] = [];

        // Suggest table names on blank space
        if (/\s$/.test(textUntilPosition)) {
          Object.keys(context).forEach((table) => {
            suggestions.push({
              label: table,
              kind: monaco.languages.CompletionItemKind.Class,
              insertText: table,
              range: range,
            });
          });
        }

        // Suggest column names when typing table.{column name}
        const tableMatch = textUntilPosition.match(/(\w+)\.\w*$/);
        if (tableMatch) {
          const tableName = tableMatch[1];
          const columns = context[tableName] || [];
          columns.forEach((column) => {
            suggestions.push({
              label: column,
              kind: monaco.languages.CompletionItemKind.Field,
              insertText: column,
              range: range,
              detail: `Column of ${tableName}`,
            });
          });
        }

        return { suggestions };
      },
    });
  };

  const setupJavaScriptFeatures = () => {
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });
  };

  const formatCode = () => {
    if (editorRef.current) {
      const value = editorRef.current.getValue();
      let formatted = value;

      try {
        switch (language) {
          case 'json':
            formatted = JSON.stringify(JSON5.parse(value), null, 2);
            break;
          case 'sql':
            formatted = formatSQL(value);
            break;
            //   case 'javascript':
            //     formatted = formatJS(value, {
            //       parser: 'babel',
            //       plugins: [parserBabel],
            //     });
            break;
        }

        editorRef.current.setValue(formatted);
      } catch (error) {
        console.error('Formatting failed:', error);
      }
    }
  };

  useEffect(() => {
    formatCode();
  }, [editorRef.current]);

  return (
    <div className="code-editor-container flex flex-col h-full">
      <div className="code-editor-toolbar flex gap-2 justify-between items-center mb-2">
        <Typography variant="small" className="text-destructive text-sm ">
          {error}
        </Typography>
        <Button variant="outline" size="sm" onClick={formatCode}>
          Format
        </Button>
      </div>
      <div
        ref={monacoEl}
        className="code-editor flex-grow"
        style={{ height: '100%', width: '100%' }}
      />
    </div>
  );
};

export default CodeEditor;
