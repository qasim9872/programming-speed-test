import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

const CodeEditor: React.FC<{
  name: string;
  backgroundText: string;
  code: string;
  onCodeUpdate: (text: string) => void;
  language?: 'javascript' | 'html' | 'css';
}> = ({
  code,
  name,
  onCodeUpdate,
  backgroundText,
  language = 'javascript',
}) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLTextAreaElement>) => {
    let value = code;
    const selStartPos = evt.currentTarget.selectionStart;

    // handle 4-space indent on
    if (evt.key === 'Tab') {
      value = `${value.substring(0, selStartPos)}    ${value.substring(
        selStartPos,
        value.length,
      )}`;
      // eslint-disable-next-line no-param-reassign
      evt.currentTarget.selectionStart = selStartPos + 3;
      // eslint-disable-next-line no-param-reassign
      evt.currentTarget.selectionEnd = selStartPos + 4;
      evt.preventDefault();

      onCodeUpdate(value);
    }
  };

  return (
    <div className="w-full lg:w-2/3 h-80 code-edit-container">
      <pre className="code-output">
        <code className="language-none background-code">{backgroundText}</code>
      </pre>
      <textarea
        id={name}
        name={name}
        className="code-input"
        value={code}
        onChange={(event) => onCodeUpdate(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <pre className="code-output">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};

export default CodeEditor;
