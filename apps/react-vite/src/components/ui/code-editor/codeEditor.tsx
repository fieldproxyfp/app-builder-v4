import MonacoEditor from '@monaco-editor/react'; // Add this import
import JSON5 from 'json5';
import * as monaco from 'monaco-editor';
import { useEffect, useRef, useState } from 'react';
import { format as formatSQL } from 'sql-formatter';
import { Button } from '../button';
import { Typography } from '../typography';

// ... existing code ...

interface CodeEditorProps {
  language: 'json' | 'sql' | 'javascript';
  value: string;
  onChange: (value?: string) => void;
  options?: monaco.editor.IStandaloneEditorConstructionOptions;
  contextOptions?: { tables: Record<string, string[]> };
  theme?: 'light' | 'dark';
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  value,
  onChange,
  options = {},
  contextOptions = {},
  theme = 'light',
}) => {
  const [validationError, setValidationError] = useState<string | null>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
    formatCode();
  }

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
          // break;
        }

        editorRef.current.setValue(formatted);
      } catch (error) {
        console.error('Formatting failed:', error);
      }
    }
  };

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
    try {
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        allowComments: true,
        schemas: [],
      });
    } catch (error) {
      console.error('Failed to setup JSON features:', error);
    }
  };

  const setupSQLFeatures = (context: Record<string, string[]>) => {
    try {
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
    } catch (error) {
      console.error('Failed to setup SQL features:', error);
    }
  };

  const setupJavaScriptFeatures = () => {
    try {
      monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false,
      });
    } catch (error) {
      console.error('Failed to setup JavaScript features:', error);
    }
  };

  const validateCode = () => {
    if (editorRef.current) {
      const value = editorRef.current.getValue();
      try {
        switch (language) {
          case 'json':
            JSON.parse(value);
            break;
          case 'sql':
            formatSQL(value);
            break;
        }
        setValidationError(null);
      } catch (error) {
        console.log(error);
        setValidationError('Invalid ' + language + error);
      }
    }
  };

  return (
    <div className="code-editor-container flex flex-col h-full">
      <div className="code-editor-toolbar flex gap-2 justify-between items-center mb-2">
        <Typography variant="small" className="text-destructive text-sm ">
          {validationError}
        </Typography>
        <div className="inline-flex items-center  gap-2">
          <Button variant="outline" size="sm" onClick={validateCode}>
            Validate
          </Button>
          <Button variant="outline" size="sm" onClick={formatCode}>
            Format
          </Button>
        </div>
      </div>
      <MonacoEditor // Replace the editor with this component
        height="100%"
        language={language}
        value={value}
        options={{
          minimap: { enabled: true },
          folding: true,
          lineNumbers: 'on',
          wordWrap: 'on',
          theme: theme === 'light' ? 'vs' : 'vs-dark',
          ...options,
        }}
        onChange={onChange}
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default CodeEditor;
