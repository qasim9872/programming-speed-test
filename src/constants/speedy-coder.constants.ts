export interface CodeLevel {
  title: string;
  codeToType: string;
}

const levels: CodeLevel[] = [
  { title: 'Hello World', codeToType: "console.log('Hello World');" },
  {
    title: 'Add Two Numbers',
    codeToType: `function add(num1, num2) {
    return num1 + num2;
}`,
  },
  {
    title: 'For In Loop',
    codeToType: `const names = ['Marcus', 'Norman', 'Christian'];

for (const index in names) {  
    console.log(\`\${names[index]} is at position \${index}\`)
}`,
  },
  {
    title: 'First HTTP Server',
    codeToType: `const http = require('http');
http
  .createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Node.js World!');
  })
  .listen(8080);`,
  },
];

const SpeedyCoder = {
  TOTAL_TIME: 60 * 1000, // 60 seconds
  INTERVAL: 1000,
  CODE_LEVELS: levels,
};

export default SpeedyCoder;
