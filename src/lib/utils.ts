/**
 * 将纯文本转换为HTML格式
 * 专门处理Prisma Studio提交的文章内容格式
 */
export function formatContent(text: string): string {
  if (!text) return '';
  
  // 预处理：修复格式问题，提高解析效率
  let content = text.trim();
  
  // 优化正则表达式顺序，将最常用的放在前面
  content = content
    // 修复重复的数字列表项 (如: "1. 1. 文本")
    .replace(/(\d+)\.\s+(\d+)\.\s+/g, '$1. ')
    // 确保标题前后有换行符
    .replace(/([^\n])(#{1,3}\s)/g, '$1\n$2')
    .replace(/(#{1,3}\s[^\n]+)([^\n])/g, '$1\n$2')
    // 确保列表项前有换行符
    .replace(/([^\n])([\d]+\.\s|-\s)/g, '$1\n$2')
    // 添加结尾换行符
    + '\n';
  
  // 分割为行
  const lines = content.split('\n');
  let result = '';
  let inParagraph = false;
  let inList = false;
  let currentListType = 'ul'; // 默认无序列表
  
  // 逐行处理
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]; // 不trim，保持原始空格
    
    // 检查代码块开始和结束
    if (line.trim() === '```python') {
      // 结束当前段落或列表
      if (inParagraph) {
        result += '</p>\n';
        inParagraph = false;
      }
      if (inList) {
        result += `</${currentListType}>\n`;
        inList = false;
      }
      
      // 添加代码块开始标签
      result += '<pre class="bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">\n<code class="language-python">\n';
      
      // 继续读取直到代码块结束
      i++;
      while (i < lines.length && lines[i].trim() !== '```') {
        result += escapeHtml(lines[i]) + '\n';
        i++;
      }
      
      // 添加代码块结束标签
      result += '</code>\n</pre>\n';
      continue;
    }
    
    // 如果是空行，结束当前段落或列表
    if (line.trim() === '') {
      if (inParagraph) {
        result += '</p>\n';
        inParagraph = false;
      }
      if (inList) {
        result += `</${currentListType}>\n`;
        inList = false;
      }
      continue;
    }
    
    // 处理标题 - 使用更高效的startsWith检查
    if (line.trim().startsWith('# ')) {
      // 结束当前段落或列表
      if (inParagraph) {
        result += '</p>\n';
        inParagraph = false;
      }
      if (inList) {
        result += `</${currentListType}>\n`;
        inList = false;
      }
      
      const title = line.trim().substring(2);
      result += `<h1 class="text-4xl font-bold text-gray-900 mt-8 mb-4">${escapeHtml(title)}</h1>\n`;
    } 
    else if (line.trim().startsWith('## ')) {
      // 结束当前段落或列表
      if (inParagraph) {
        result += '</p>\n';
        inParagraph = false;
      }
      if (inList) {
        result += `</${currentListType}>\n`;
        inList = false;
      }
      
      const title = line.trim().substring(3);
      result += `<h2 class="text-3xl font-bold text-gray-900 mt-8 mb-4">${escapeHtml(title)}</h2>\n`;
    } 
    else if (line.trim().startsWith('### ')) {
      // 结束当前段落或列表
      if (inParagraph) {
        result += '</p>\n';
        inParagraph = false;
      }
      if (inList) {
        result += `</${currentListType}>\n`;
        inList = false;
      }
      
      const title = line.trim().substring(4);
      result += `<h3 class="text-2xl font-bold text-gray-900 mt-6 mb-3">${escapeHtml(title)}</h3>\n`;
    }
    // 处理无序列表项
    else if (line.trim().startsWith('- ')) {
      // 结束当前段落
      if (inParagraph) {
        result += '</p>\n';
        inParagraph = false;
      }
      
      // 如果不在列表中，开始一个新的无序列表
      if (!inList || currentListType !== 'ul') {
        if (inList) {
          result += `</${currentListType}>\n`;
        }
        result += '<ul class="mb-6 list-disc ml-6">\n';
        inList = true;
        currentListType = 'ul';
      }
      
      const listItem = line.trim().substring(2);
      result += `<li class="text-gray-700 leading-relaxed mb-2 ml-6">${formatInlineMarkdown(escapeHtml(listItem))}</li>\n`;
    }
    // 处理有序列表项
    else if (line.trim().match(/^\d+\.\s/)) {
      // 结束当前段落
      if (inParagraph) {
        result += '</p>\n';
        inParagraph = false;
      }
      
      // 如果不在列表中，开始一个新的有序列表
      if (!inList || currentListType !== 'ol') {
        if (inList) {
          result += `</${currentListType}>\n`;
        }
        result += '<ol class="mb-6 list-decimal ml-6">\n';
        inList = true;
        currentListType = 'ol';
      }
      
      const listItem = line.trim().replace(/^\d+\.\s/, '');
      result += `<li class="text-gray-700 leading-relaxed mb-2 ml-6">${formatInlineMarkdown(escapeHtml(listItem))}</li>\n`;
    }
    // 处理普通段落
    else {
      // 结束当前列表
      if (inList) {
        result += `</${currentListType}>\n`;
        inList = false;
      }
      
      // 如果不在段落中，开始一个新段落
      if (!inParagraph) {
        result += `<p class="text-gray-700 leading-relaxed mb-4">`;
        inParagraph = true;
      } else {
        // 在段落中，添加空格
        result += ' ';
      }
      
      result += formatInlineMarkdown(escapeHtml(line.trim()));
    }
  }
  
  // 确保关闭所有标签
  if (inParagraph) {
    result += '</p>\n';
  }
  if (inList) {
    result += `</${currentListType}>\n`;
  }
  
  return result;
}

/**
 * 转义HTML特殊字符
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * 处理行内Markdown格式（粗体、斜体、代码）
 */
function formatInlineMarkdown(text: string): string {
  if (!text) return '';
  
  // 优化正则表达式顺序，将最常用的放在前面
  // 使用非贪婪匹配和更精确的字符类
  return text
    // 处理行内代码
    .replace(/`([^`]+?)`/g, '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
    // 处理粗体
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>')
    // 处理斜体
    .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');
}

/**
 * 简单的文本格式化，只处理换行符
 */
export function simpleFormat(text: string): string {
  if (!text) return '';
  
  return text
    .replace(/\n\n/g, '</p><p>')  // 双换行变段落
    .replace(/\n/g, '<br>');      // 单换行变br
}

/**
 * 简单的文本格式化（保留换行但不转换为HTML）
 */
export function preserveLineBreaks(text: string): string {
  if (!text) return '';
  return text.replace(/\n/g, '<br>');
}

/**
 * 移除HTML标签，纯文本显示
 */
export function stripHtml(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '');
}