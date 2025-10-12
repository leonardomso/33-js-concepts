// State management
let currentConcept = null;
let originalCode = '';

// DOM elements
const conceptsList = document.getElementById('conceptsList');
const conceptTitle = document.getElementById('conceptTitle');
const conceptDescription = document.getElementById('conceptDescription');
const codeEditor = document.getElementById('codeEditor');
const output = document.getElementById('output');
const searchInput = document.getElementById('searchInput');
const runBtn = document.getElementById('runBtn');
const clearBtn = document.getElementById('clearBtn');
const resetBtn = document.getElementById('resetBtn');
const clearOutputBtn = document.getElementById('clearOutputBtn');

// Initialize the application
function init() {
    renderConceptsList();
    setupEventListeners();
    
    // Load first concept by default
    if (conceptsData.length > 0) {
        selectConcept(conceptsData[0].id);
    }
}

// Render the concepts list
function renderConceptsList(filter = '') {
    conceptsList.innerHTML = '';
    
    const filteredConcepts = conceptsData.filter(concept => 
        concept.title.toLowerCase().includes(filter.toLowerCase())
    );
    
    filteredConcepts.forEach(concept => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="concept-number">${concept.id}</span>
            ${concept.title}
        `;
        li.addEventListener('click', () => selectConcept(concept.id));
        
        if (currentConcept && currentConcept.id === concept.id) {
            li.classList.add('active');
        }
        
        conceptsList.appendChild(li);
    });
}

// Select and load a concept
function selectConcept(conceptId) {
    const concept = conceptsData.find(c => c.id === conceptId);
    if (!concept) return;
    
    currentConcept = concept;
    originalCode = concept.example;
    
    // Update UI
    conceptTitle.textContent = `${concept.id}. ${concept.title}`;
    conceptDescription.textContent = concept.description;
    codeEditor.value = concept.example;
    
    // Clear output
    clearOutput();
    
    // Update active state in list
    renderConceptsList(searchInput.value);
    
    // Scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        renderConceptsList(e.target.value);
    });
    
    // Run code button
    runBtn.addEventListener('click', runCode);
    
    // Clear editor button
    clearBtn.addEventListener('click', () => {
        codeEditor.value = '';
        clearOutput();
    });
    
    // Reset to original code
    resetBtn.addEventListener('click', () => {
        if (originalCode) {
            codeEditor.value = originalCode;
            clearOutput();
        }
    });
    
    // Clear output button
    clearOutputBtn.addEventListener('click', clearOutput);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Enter to run code
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            runCode();
        }
    });
    
    // Allow Tab key in textarea
    codeEditor.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = codeEditor.selectionStart;
            const end = codeEditor.selectionEnd;
            
            codeEditor.value = codeEditor.value.substring(0, start) + 
                '    ' + 
                codeEditor.value.substring(end);
            
            codeEditor.selectionStart = codeEditor.selectionEnd = start + 4;
        }
    });
}

// Run the code in the editor
function runCode() {
    const code = codeEditor.value.trim();
    
    if (!code) {
        addOutput('No code to execute', 'error');
        return;
    }
    
    clearOutput();
    
    // Capture console output
    const originalConsole = {
        log: console.log,
        error: console.error,
        warn: console.warn,
        info: console.info
    };
    
    const logs = [];
    
    // Override console methods
    console.log = (...args) => {
        const message = args.map(arg => formatValue(arg)).join(' ');
        logs.push({ type: 'log', message });
        originalConsole.log(...args);
    };
    
    console.error = (...args) => {
        const message = args.map(arg => formatValue(arg)).join(' ');
        logs.push({ type: 'error', message });
        originalConsole.error(...args);
    };
    
    console.warn = (...args) => {
        const message = args.map(arg => formatValue(arg)).join(' ');
        logs.push({ type: 'warn', message });
        originalConsole.warn(...args);
    };
    
    console.info = (...args) => {
        const message = args.map(arg => formatValue(arg)).join(' ');
        logs.push({ type: 'info', message });
        originalConsole.info(...args);
    };
    
    try {
        // Execute the code
        const result = eval(code);
        
        // Display logs
        logs.forEach(log => {
            addOutput(log.message, log.type);
        });
        
        // If there's a return value and no logs, display it
        if (result !== undefined && logs.length === 0) {
            addOutput(`=> ${formatValue(result)}`, 'success');
        }
        
        // If no output at all
        if (logs.length === 0 && result === undefined) {
            addOutput('Code executed successfully (no output)', 'success');
        }
        
    } catch (error) {
        addOutput(`Error: ${error.message}`, 'error');
        console.error(error);
    } finally {
        // Restore console methods
        console.log = originalConsole.log;
        console.error = originalConsole.error;
        console.warn = originalConsole.warn;
        console.info = originalConsole.info;
    }
}

// Format values for display
function formatValue(value) {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'string') return value;
    if (typeof value === 'function') return value.toString();
    if (typeof value === 'symbol') return value.toString();
    
    try {
        return JSON.stringify(value, null, 2);
    } catch (e) {
        return String(value);
    }
}

// Add output to the console
function addOutput(message, type = 'log') {
    const outputDiv = document.getElementById('output');
    
    // Remove empty state
    outputDiv.classList.remove('empty');
    
    const logEntry = document.createElement('div');
    logEntry.className = `log ${type}`;
    logEntry.textContent = message;
    
    outputDiv.appendChild(logEntry);
    
    // Auto-scroll to bottom
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

// Clear the output console
function clearOutput() {
    output.innerHTML = '';
    output.classList.add('empty');
    output.textContent = 'Run your code to see output here...';
}

// Initialize the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
