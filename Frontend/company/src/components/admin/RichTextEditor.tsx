
import { useState, useRef, useEffect } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Heading1, Heading2, Link, Quote, Image, FileText, Undo, Redo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface RichTextEditorProps {
  initialValue?: string;
  onSave: (content: string, htmlContent: string) => void;
  title: string;
}

const RichTextEditor = ({ initialValue = '', onSave, title}: RichTextEditorProps) => {
  const [markdownContent, setMarkdownContent] = useState(initialValue);
  const [htmlContent, setHtmlContent] = useState('');
  const editorRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Convert markdown to HTML for preview
    const html = convertMarkdownToHTML(markdownContent);
    setHtmlContent(html);
  }, [markdownContent]);

  const convertMarkdownToHTML = (markdown: string) => {
    // This is a very basic conversion - in a real app you'd use a proper parser
    let html = markdown;
    
    // Handle headings
    html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
    html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
    html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
    
    // Handle bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Handle italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Handle links
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Handle images
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width:100%;" />');
    
    // Handle lists
    html = html.replace(/^\- (.*?)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
    
    // Handle numbered lists
    html = html.replace(/^(\d+)\. (.*?)$/gm, '<li>$2</li>');
    html = html.replace(/(<li>.*<\/li>)/gs, '<ol>$1</ol>');
    
    // Handle blockquotes
    html = html.replace(/^> (.*?)$/gm, '<blockquote>$1</blockquote>');

    // Handle paragraphs (any line not already formatted)
    html = html.replace(/^(?!(#|<h|<ul|<ol|<li|<blockquote))(.*?)$/gm, '<p>$2</p>');
    
    // Replace line breaks with <br>
    html = html.replace(/\n/g, '<br>');
    
    return html;
  };

  const handleCommand = (command: string) => {
    let formattedText = '';
    const textarea = document.getElementById('markdown-editor') as HTMLTextAreaElement;
    const selectionStart = textarea?.selectionStart || 0;
    const selectionEnd = textarea?.selectionEnd || 0;
    const selectedText = markdownContent.substring(selectionStart, selectionEnd);
    
    switch(command) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'heading1':
        formattedText = `\n# ${selectedText}\n`;
        break;
      case 'heading2':
        formattedText = `\n## ${selectedText}\n`;
        break;
      case 'ul':
        formattedText = selectedText.split('\n').map(line => `- ${line}`).join('\n');
        break;
      case 'ol':
        formattedText = selectedText.split('\n').map((line, i) => `${i + 1}. ${line}`).join('\n');
        break;
      case 'link':
        formattedText = `[${selectedText || 'Link text'}](url)`;
        break;
      case 'image':
        formattedText = `![${selectedText || 'Image description'}](image-url)`;
        break;
      case 'quote':
        formattedText = `\n> ${selectedText}\n`;
        break;
      default:
        formattedText = selectedText;
    }
    
    const newContent = markdownContent.substring(0, selectionStart) + formattedText + markdownContent.substring(selectionEnd);
    setMarkdownContent(newContent);
    
    // Focus back to the textarea
    textarea.focus();
  };

  const handleSave = () => {
    onSave(markdownContent, htmlContent);
    toast({
      title: "Content saved",
      description: `Your ${title} has been saved successfully.`
    });
  };

  return (
    <div className="border rounded-md bg-white">
      <div className="p-4 border-b bg-muted/30">
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <div className="flex flex-wrap gap-1">
          <Button variant="outline" size="icon" onClick={() => handleCommand('bold')} title="Bold">
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => handleCommand('italic')} title="Italic">
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => handleCommand('underline')} title="Underline">
            <Underline className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Button variant="outline" size="icon" onClick={() => handleCommand('heading1')} title="Heading 1">
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => handleCommand('heading2')} title="Heading 2">
            <Heading2 className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Button variant="outline" size="icon" onClick={() => handleCommand('ul')} title="Bulleted List">
            <List className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => handleCommand('ol')} title="Numbered List">
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Button variant="outline" size="icon" onClick={() => handleCommand('quote')} title="Quote">
            <Quote className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => handleCommand('link')} title="Insert Link">
            <Link className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => handleCommand('image')} title="Insert Image">
            <Image className="h-4 w-4" />
          </Button>
          <div className="ml-auto">
            <Button onClick={handleSave} className="bg-insurance-orange hover:bg-insurance-orange-dark">
              Save Article
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="write" className="w-full">
        <div className="border-b px-4">
          <TabsList className="bg-transparent border-b-0">
            <TabsTrigger value="write" className="data-[state=active]:bg-background">
              <FileText className="h-4 w-4 mr-2" />
              Write
            </TabsTrigger>
            <TabsTrigger value="preview" className="data-[state=active]:bg-background">
              <FileText className="h-4 w-4 mr-2" />
              Preview
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="write" className="p-0 border-0">
          <textarea
            id="markdown-editor"
            value={markdownContent}
            onChange={(e) => setMarkdownContent(e.target.value)}
            className="w-full p-4 min-h-[500px] font-mono text-sm focus:outline-none resize-y"
            placeholder="Start writing your content here..."
          />
        </TabsContent>
        
        <TabsContent value="preview" className="p-0 border-0">
          <div 
            className="prose max-w-none p-4 min-h-[500px]"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            ref={editorRef}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RichTextEditor;
