const fs = require('fs');
const path = require('path');

const outputFileName = 'project-context.mdx';

const excludeList = ['node_modules', 
    '.git', 
    'build', 
    'dist', 
    '.next',
    '.vscode',
    'public',
    'scripts', 
    'coverage', 
    'temp', 
    'tests'];

const includeExtensions = ['.js', '.jsx', '.ts', '.tsx', '.css', '.json', '.html', '.md', '.mdx'];

function getFiles(dir, files_ = []) {
    const files = fs.readdirSync(dir);
    for (let file of files) {
        const name = path.join(dir, file);
        if (excludeList.includes(file)) continue;

        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files_);
        } else {
            if (includeExtensions.includes(path.extname(name))) {
                files_.push(name);
            }
        }
    }
    return files_;
}

function generate() {
    const fileList = getFiles('.');
    const output = fs.createWriteStream(outputFileName);

    output.write("# Project Context\n\n");
    
    output.write("## Folder Structure\n```text\n");
    fileList.forEach(file => output.write(`${file}\n`));
    output.write("```\n\n---\n\n");

    output.write("## File Contents\n\n");
    fileList.forEach(file => {
        if (file === outputFileName || file === 'make-context.js') return;
        
        const ext = path.extname(file).slice(1) || 'text';
        
        output.write(`<file_path>${file}</file_path>\n`);
        output.write("```" + ext + "\n");
        output.write(fs.readFileSync(file, 'utf8'));
        output.write("\n```\n\n---\n");
    });

    console.log(`✅ Success! Created ${outputFileName} for Claude/Gemini.`);
}

generate();
