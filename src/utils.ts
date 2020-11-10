export const md2Html = (input: string): string => {
  // backticks - span.tooltip-card-symbol
  let output = (input || '').replace(/`([a-zA-Z0-9 ]+)`/gi, '<span class="tooltip-card-symbol">$1</span>');

  // asterisks - span.tooltip-score
  output = (output || '').replace(/_([a-zA-Z0-9 ]+)_/gi, '<span class="tooltip-score">$1</span>');

  if (output.includes('\\')) {
    // backslash - new line, separates elements with p.tooltip-paragraph
    return '<p class="tooltip-paragraph">' + output.split(/\\/).join(`</p><p class="tooltip-paragraph">`) + '</p>';
  }

  return output;
};
