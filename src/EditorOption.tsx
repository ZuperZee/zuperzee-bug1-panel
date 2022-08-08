import { StandardEditorProps } from '@grafana/data';
import { CodeEditor, Monaco } from '@grafana/ui';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import React, { FC } from 'react';
import { SimpleOptions } from 'types';

interface Props extends StandardEditorProps<string, {}, SimpleOptions> {}

export const EditorOption: FC<Props> = ({ value, context, item, onChange }) => {
  const editorDidMount = async (_: editor.IStandaloneCodeEditor, m: Monaco) => {
    m.languages.typescript.javascriptDefaults.addExtraLib(`const niceCar: boolean;`, 'niceCar.d.ts');

    // Simulate adding libs lazily.
    setTimeout(() => {
      m.languages.typescript.javascriptDefaults.addExtraLib(`const niceTruck: boolean;`, 'niceTruck.d.ts');
    }, 2000);
    // Changing timeout to `0` will make it work.
  };

  return (
    <div>
      <CodeEditor
        height={'33vh'}
        value={value ?? ''}
        language={'javascript'}
        showLineNumbers={true}
        onEditorDidMount={editorDidMount}
        onSave={onChange}
        onBlur={onChange}
        monacoOptions={{ contextmenu: true }}
      />
    </div>
  );
};
