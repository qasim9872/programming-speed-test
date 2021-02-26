import React, { useEffect, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; // Example style, you can use another

const CodeEditor: React.FC<{
  name: string;
  backgroundText: string;
  language?: 'javascript' | 'html' | 'css';
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({ language = 'javascript', name, backgroundText }) => {
  const [myCodeText, setMyCodeText] = useState('');

  useEffect(() => {
    Prism.highlightAll();
  }, [myCodeText]);

  return (
    <div className="w-full lg:w-2/3 h-80 code-edit-container">
      <pre className="code-output">
        <code className="language-none background-code">{backgroundText}</code>
      </pre>
      <textarea
        id={name}
        name={name}
        className="code-input"
        value={myCodeText}
        onChange={(event) => setMyCodeText(event.target.value)}
      />
      <pre className="code-output">
        <code className={`language-${language}`}>{myCodeText}</code>
      </pre>
    </div>
  );
};

export default CodeEditor;
