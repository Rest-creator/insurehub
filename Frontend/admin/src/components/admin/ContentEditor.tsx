
import { useState } from 'react';
import { Bold, Italic, List, AlignLeft, AlignCenter, AlignRight, Heading, Image, Link, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface ContentEditorProps {
  initialValue?: string;
  onSave: (content: string) => void;
  title: string;
  previewRenderer?: (content: string) => React.ReactNode;
}

const ContentEditor = ({ 
  initialValue = '', 
  onSave,
  title,
  previewRenderer 
}: ContentEditorProps) => {
  const [content, setContent] = useState(initialValue);
  const { toast } = useToast();

  const handleFormat = (format: string) => {
    let formattedText = '';
    const textarea = document.querySelector('textarea');
    const selectionStart = textarea?.selectionStart || 0;
    const selectionEnd = textarea?.selectionEnd || 0;
    const selectedText = content.substring(selectionStart, selectionEnd);
    
    switch(format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'heading':
        formattedText = `\n## ${selectedText}\n`;
        break;
      case 'list':
        formattedText = `\n- ${selectedText}`;
        break;
      case 'link':
        formattedText = `[${selectedText}](url)`;
        break;
      case 'image':
        formattedText = `![${selectedText || 'Image description'}](image-url)`;
        break;
      default:
        formattedText = selectedText;
    }
    
    const newContent = content.substring(0, selectionStart) + formattedText + content.substring(selectionEnd);
    setContent(newContent);
  };

  const handleSave = () => {
    onSave(content);
    toast({
      title: "Content saved",
      description: `Your changes to ${title} have been saved.`,
    });
  };

  // Simple markdown-like preview renderer if none provided
  const defaultPreviewRenderer = (text: string) => {
    return (
      <div className="prose max-w-none">
        {text.split('\n').map((line, i) => {
          // Handle headings
          if (line.startsWith('## ')) {
            return <h2 key={i} className="text-2xl font-bold mt-4 mb-2">{line.substring(3)}</h2>;
          }
          if (line.startsWith('# ')) {
            return <h1 key={i} className="text-3xl font-bold mt-4 mb-2">{line.substring(2)}</h1>;
          }
          // Handle lists
          if (line.startsWith('- ')) {
            return <li key={i} className="ml-4">{line.substring(2)}</li>;
          }
          // Basic paragraph
          return line ? <p key={i} className="mb-2">{line}</p> : <br key={i} />;
        })}
      </div>
    );
  };

  return (
    <Card className="mt-4">
      <CardContent className="pt-4">
        <div className="mb-4">
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Button variant="outline" size="sm" onClick={() => handleFormat('bold')}>
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleFormat('italic')}>
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleFormat('heading')}>
            <Heading className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleFormat('list')}>
            <List className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleFormat('link')}>
            <Link className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleFormat('image')}>
            <Image className="h-4 w-4" />
          </Button>
          <div className="ml-auto">
            <Button onClick={handleSave} className="bg-insurance-orange hover:bg-insurance-orange-dark">
              Save Changes
            </Button>
          </div>
        </div>

        <Tabs defaultValue="edit">
          <TabsList>
            <TabsTrigger value="edit" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>
          <TabsContent value="edit">
            <Textarea 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              className="min-h-[300px] font-mono"
              placeholder="Enter your content here..."
            />
          </TabsContent>
          <TabsContent value="preview">
            <div className="border rounded-md p-4 min-h-[300px] bg-white">
              {previewRenderer ? previewRenderer(content) : defaultPreviewRenderer(content)}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ContentEditor;
