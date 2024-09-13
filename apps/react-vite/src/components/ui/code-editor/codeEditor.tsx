import { loader } from '@monaco-editor/react';
import JSON5 from 'json5';
import * as monaco from 'monaco-editor';
// import { format as formatJS } from 'prettier';
// import parserBabel from 'prettier/parser-babel';
import React, { useEffect, useRef, useState } from 'react';
import { format as formatSQL } from 'sql-formatter';

// Load Monaco Editor
loader.config({ monaco });

interface CodeEditorProps {
  language: 'json' | 'sql' | 'javascript';
  value: string;
  onChange: (value: string) => void;
  options?: monaco.editor.IStandaloneEditorConstructionOptions;
  contextOptions?: any;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  value,
  onChange,
  options = {},
  contextOptions = {},
}) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const monacoEl = useRef(null);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    if (monacoEl.current) {
      editorRef.current = monaco.editor.create(monacoEl.current, {
        value,
        language,
        minimap: { enabled: false },
        folding: true,
        lineNumbers: 'on',
        wordWrap: 'on',
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

  const setupSQLFeatures = (context: any) => {
    // Add SQL-specific features, like auto-completion for table names
    monaco.languages.registerCompletionItemProvider('sql', {
      provideCompletionItems: (model, position) => {
        const suggestions = context.tables.map((table: string) => ({
          label: table,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: table,
        }));
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

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (editorRef.current) {
      editorRef.current.layout();
    }
  };

  return (
    <div className="code-editor-container">
      <div className="code-editor-toolbar">
        <button onClick={formatCode}>Format</button>
        <button onClick={toggleMinimize}>
          {isMinimized ? 'Expand' : 'Minimize'}
        </button>
      </div>
      <div
        ref={monacoEl}
        className="code-editor"
        style={{ height: isMinimized ? '100px' : '500px', width: '100%' }}
      />
    </div>
  );
};

export default CodeEditor;
