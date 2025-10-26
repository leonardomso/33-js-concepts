const fs = require('fs');
const path = require('path');

const examplesDir = path.join(__dirname, 'examples');

function cleanComments(content) {
  let lines = content.split('\n');
  let cleaned = [];
  let inMultiLineComment = false;
  
  for (let line of lines) {
    const trimmed = line.trim();
    
    // Check for multi-line comment start
    if (trimmed.startsWith('/*')) {
      inMultiLineComment = true;
      if (trimmed.includes('*/')) {
        inMultiLineComment = false;
      }
      continue;
    }
    
    // Check for multi-line comment end
    if (inMultiLineComment) {
      if (trimmed.includes('*/')) {
        inMultiLineComment = false;
      }
      continue;
    }
    
    // Skip single-line comments
    if (trimmed.startsWith('//')) {
      continue;
    }
    
    // Remove inline comments but keep the code
    if (line.includes('//')) {
      const codeBeforeComment = line.split('//')[0].trimEnd();
      if (codeBeforeComment) {
        cleaned.push(codeBeforeComment);
      }
      continue;
    }
    
    // Keep the line if it's not empty or just whitespace
    if (trimmed || cleaned.length > 0) {
      cleaned.push(line);
    }
  }
  
  // Remove trailing empty lines
  while (cleaned.length > 0 && !cleaned[cleaned.length - 1].trim()) {
    cleaned.pop();
  }
  
  return cleaned.join('\n') + '\n';
}

// Get all .js files in examples directory
const files = fs.readdirSync(examplesDir)
  .filter(file => file.endsWith('.js') && file !== 'clean-comments.js');

console.log('Cleaning comments from files...\n');

files.forEach(file => {
  const filePath = path.join(examplesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  const cleaned = cleanComments(content);
  fs.writeFileSync(filePath, cleaned, 'utf8');
  console.log(`✓ Cleaned: ${file}`);
});

console.log('\n✓ All files cleaned!');
