import { useRef, useState } from "react";
import {
  Plus,
  X,
  Edit,
  FileText,
  Bold,
  Heading1,
  Heading2,
  Italic,
  Link,
  List,
  ListOrdered,
  Quote,
  Underline,
  Loader,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import RichTextEditor from "@/components/admin/RichTextEditor";
import { Badge } from "@/components/ui/badge";
import Server from "@/components/server/Server";
import { Separator } from "@radix-ui/react-select";
import { title } from "process";
import { format } from "date-fns";

interface Article {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  htmlContent: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
}

const EditLearningHub = () => {
  const { toast } = useToast();
  const [articleTitle, setArticleTitle] = useState("");
  const [articleCategory, setArticleCategory] = useState("");
  const [isArticleOpen, setIsArticleOpen] = useState(false);
  // const [articleContent, setArticleContent] = useState("");y
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [markdownContent, setMarkdownContent] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  // const [articleImageUrl, setArticleImageUrl] = useState('');

  const categories = [
    "Auto Insurance",
    "Home Insurance",
    "Life Insurance",
    "Health Insurance",
    "Business Insurance",
    "Umbrella Insurance",
    "Travel Insurance",
  ];

  // Example articles data
  const [articles, setArticles] = useState<Article[]>([
    {
      id: 1,
      title: "Understanding Insurance Deductibles",
      category: "Basics",
      excerpt:
        "Learn what insurance deductibles are and how they affect your premiums.",
      content:
        "# Understanding Insurance Deductibles\n\nInsurance deductibles are a key part of any insurance policy. They represent the amount you need to pay out-of-pocket before your insurance coverage kicks in.\n\n## How deductibles work\n\nLet's say you have a $500 deductible on your auto insurance policy. If you get into an accident and the repair costs $2,000, you would pay the first $500 and your insurance would cover the remaining $1,500.\n\n## Types of deductibles\n\n- **Fixed deductibles**: A specific dollar amount\n- **Percentage deductibles**: A percentage of the insured value\n\n## How deductibles affect premiums\n\nGenerally, the higher your deductible, the lower your premium. This is because you're taking on more financial risk.\n",
      htmlContent:
        "<h1>Understanding Insurance Deductibles</h1><p>Insurance deductibles are a key part of any insurance policy. They represent the amount you need to pay out-of-pocket before your insurance coverage kicks in.</p><h2>How deductibles work</h2><p>Let's say you have a $500 deductible on your auto insurance policy. If you get into an accident and the repair costs $2,000, you would pay the first $500 and your insurance would cover the remaining $1,500.</p><h2>Types of deductibles</h2><ul><li><strong>Fixed deductibles</strong>: A specific dollar amount</li><li><strong>Percentage deductibles</strong>: A percentage of the insured value</li></ul><h2>How deductibles affect premiums</h2><p>Generally, the higher your deductible, the lower your premium. This is because you're taking on more financial risk.</p>",
      createdAt: "2023-03-15",
      updatedAt: "2023-03-15",
      published: true,
    },
    {
      id: 2,
      title: "How to Choose Auto Insurance",
      category: "Auto",
      excerpt: "A guide to finding the right auto insurance for your needs.",
      content:
        "# How to Choose Auto Insurance\n\nSelecting the right auto insurance can save you money and provide peace of mind.\n\n## Coverage Types\n\n- **Liability coverage**: Covers damage you cause to others\n- **Collision coverage**: Repairs your vehicle after an accident\n- **Comprehensive coverage**: Protects against theft, vandalism, and natural disasters\n\n## Factors to Consider\n\n1. Your state's minimum requirements\n2. Your vehicle's value and age\n3. Your driving habits and history\n4. Your budget constraints\n\n## Shopping Tips\n\n* Get quotes from multiple insurers\n* Ask about available discounts\n* Consider bundling with other insurance policies",
      htmlContent:
        "<h1>How to Choose Auto Insurance</h1><p>Selecting the right auto insurance can save you money and provide peace of mind.</p><h2>Coverage Types</h2><ul><li><strong>Liability coverage</strong>: Covers damage you cause to others</li><li><strong>Collision coverage</strong>: Repairs your vehicle after an accident</li><li><strong>Comprehensive coverage</strong>: Protects against theft, vandalism, and natural disasters</li></ul><h2>Factors to Consider</h2><ol><li>Your state's minimum requirements</li><li>Your vehicle's value and age</li><li>Your driving habits and history</li><li>Your budget constraints</li></ol><h2>Shopping Tips</h2><ul><li>Get quotes from multiple insurers</li><li>Ask about available discounts</li><li>Consider bundling with other insurance policies</li></ul>",
      createdAt: "2023-04-10",
      updatedAt: "2023-05-02",
      published: true,
    },
    {
      id: 3,
      title: "Life Insurance: Term vs Whole Life",
      category: "Life",
      excerpt: "Compare different types of life insurance policies.",
      content:
        "# Life Insurance: Term vs Whole Life\n\nUnderstanding the difference between term and whole life insurance is crucial when planning for your family's financial security.\n\n## Term Life Insurance\n\nTerm life insurance provides coverage for a specific period, typically 10, 20, or 30 years. It offers:\n\n- Lower premiums\n- No cash value component\n- Simpler structure\n\n## Whole Life Insurance\n\nWhole life insurance covers you for your entire lifetime. Features include:\n\n- Fixed premiums\n- Cash value accumulation\n- Potential dividends (with participating policies)\n\n## Making the Right Choice\n\nThe best option depends on your:\n\n- Current age and health status\n- Financial goals and needs\n- Budget considerations\n- Long-term planning objectives",
      htmlContent:
        "<h1>Life Insurance: Term vs Whole Life</h1><p>Understanding the difference between term and whole life insurance is crucial when planning for your family's financial security.</p><h2>Term Life Insurance</h2><p>Term life insurance provides coverage for a specific period, typically 10, 20, or 30 years. It offers:</p><ul><li>Lower premiums</li><li>No cash value component</li><li>Simpler structure</li></ul><h2>Whole Life Insurance</h2><p>Whole life insurance covers you for your entire lifetime. Features include:</p><ul><li>Fixed premiums</li><li>Cash value accumulation</li><li>Potential dividends (with participating policies)</li></ul><h2>Making the Right Choice</h2><p>The best option depends on your:</p><ul><li>Current age and health status</li><li>Financial goals and needs</li><li>Budget considerations</li><li>Long-term planning objectives</li></ul>",
      createdAt: "2023-02-21",
      updatedAt: "2023-06-15",
      published: true,
    },
  ]);

  const handleOpenArticleEditor = (article?: Article) => {
    if (article) {
      setCurrentArticle(article);
      setArticleTitle(article.title);
      setArticleCategory(article.category);
    } else {
      setCurrentArticle(null);
      setArticleTitle("");
      setArticleCategory("");
    }
    setIsArticleOpen(true);
  };

  // const formattedDate = format(new Date(article.created_at), 'MMM d, yyyy');

  const handleSaveArticle = () => {
    if (!articleTitle) {
      toast({
        title: "Missing title",
        description: "Please provide a title for your article",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    // In a real app, this would save to a database
    const newArticle = {
      title: articleTitle,
      category: articleCategory || "Uncategorized",
      content: markdownContent,
      // image: articleImageUrl,
    };

    console.log(newArticle);

    Server.addArticle(newArticle)
      .then(() => {
        toast({
          title: "Article saved",
          description: `"${articleTitle}" has been added to the Learning Hub.`,
        });
        setArticles([...articles, newArticle]);
        // Reset form
        setArticleTitle("");
        setArticleCategory("");
        setMarkdownContent("");
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error saving article:", error);

        toast({
          title: "Error saving article",
          description:
            "There was an error saving your article. Please try again.",
          variant: "destructive",
        });
        setLoading(false);
      });
  };

  const fetchArticles = () => {
    Server.getArticles()
      .then((response) => {
        setArticles(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("Error fetching articles:", error);
      });
  };

  useState(() => {
    fetchArticles();
  }, []);

  const handleCommand = (command: string) => {
    let formattedText = "";
    const textarea = document.getElementById(
      "markdown-editor"
    ) as HTMLTextAreaElement;
    const selectionStart = textarea?.selectionStart || 0;
    const selectionEnd = textarea?.selectionEnd || 0;
    const selectedText = markdownContent.substring(
      selectionStart,
      selectionEnd
    );

    switch (command) {
      case "bold":
        formattedText = `**${selectedText}**`;
        break;
      case "italic":
        formattedText = `*${selectedText}*`;
        break;
      case "heading1":
        formattedText = `\n# ${selectedText}\n`;
        break;
      case "heading2":
        formattedText = `\n## ${selectedText}\n`;
        break;
      case "ul":
        formattedText = selectedText
          .split("\n")
          .map((line) => `- ${line}`)
          .join("\n");
        break;
      case "ol":
        formattedText = selectedText
          .split("\n")
          .map((line, i) => `${i + 1}. ${line}`)
          .join("\n");
        break;
      case "link":
        formattedText = `[${selectedText || "Link text"}](url)`;
        break;
      case "image":
        formattedText = `![${selectedText || "Image description"}](image-url)`;
        break;
      case "quote":
        formattedText = `\n> ${selectedText}\n`;
        break;
      default:
        formattedText = selectedText;
    }

    const newContent =
      markdownContent.substring(0, selectionStart) +
      formattedText +
      markdownContent.substring(selectionEnd);
    setMarkdownContent(newContent);

    // Focus back to the textarea
    textarea.focus();
  };

  const handleDeleteArticle = (id: number) => {
    setArticles(articles.filter((article) => article.id !== id));
    toast({
      title: "Article deleted",
      description: "The article has been removed from the Learning Hub.",
    });
  };

  const togglePublishArticle = (id: number) => {
    setArticles(
      articles.map((article) =>
        article.id === id
          ? { ...article, published: !article.published }
          : article
      )
    );

    const article = articles.find((a) => a.id === id);
    const status = article && !article.published ? "published" : "unpublished";

    toast({
      title: `Article ${status}`,
      description: `The article has been ${status}.`,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Learning Hub Management</h2>
        <p className="text-muted-foreground">
          Create and manage educational content for the Learning Hub.
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Articles & Guides</h3>
          <p className="text-muted-foreground text-sm">
            Manage your educational content
          </p>
        </div>
        <Button
          onClick={() => handleOpenArticleEditor()}
          className="bg-insurance-orange hover:bg-insurance-orange-dark"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Article
        </Button>
      </div>

      <div className="grid gap-6">
        {articles.map((article) => (
          <Card key={article.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-medium">{article.title}</h3>
                    <Badge variant={article.published ? "default" : "outline"}>
                      {article.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground space-x-2">
                    <Badge variant="secondary" className="rounded-sm">
                      {article.category}
                    </Badge>
                    <span>
                      Created:{" "}
                      {article.created_at
                        ? format(
                            new Date(
                              article.created_at.replace(/\.\d{6}Z$/, "Z")
                            ),
                            "MMM d, yyyy"
                          )
                        : "Unknown"}
                    </span>

                    <span>•</span>
                    {/* <span>Updated: {article.updatedAt}</span> */}
                  </div>
                  <p className="text-muted-foreground">{article.content}</p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => togglePublishArticle(article.id)}
                  >
                    {article.published ? "Unpublish" : "Publish"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenArticleEditor(article)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteArticle(article.id)}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {articles.length === 0 && (
          <Card>
            <CardContent className="p-10 text-center">
              <FileText className="mx-auto h-10 w-10 text-muted-foreground/60 mb-4" />
              <h3 className="text-lg font-medium mb-2">No articles yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first article to start populating the Learning Hub.
              </p>
              <Button onClick={() => handleOpenArticleEditor()}>
                <Plus className="h-4 w-4 mr-2" />
                Create Article
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={isArticleOpen} onOpenChange={setIsArticleOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {currentArticle ? "Edit Article" : "Create New Article"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Article Title</Label>
                <Input
                  id="title"
                  value={articleTitle}
                  onChange={(e) => setArticleTitle(e.target.value)}
                  placeholder="Enter article title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  value={articleCategory}
                  onChange={(e) => setArticleCategory(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                >
                  <option value="">Select a category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div className="border rounded-md bg-white">
                <div className="p-4 border-b bg-muted/30">
                  {/* <h3 className="text-lg font-medium mb-2">{title}</h3> */}
                  <div className="flex flex-wrap gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCommand("bold")}
                      title="Bold"
                    >
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCommand("italic")}
                      title="Italic"
                    >
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCommand("underline")}
                      title="Underline"
                    >
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Separator orientation="vertical" className="mx-1 h-6" />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCommand("heading1")}
                      title="Heading 1"
                    >
                      <Heading1 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCommand("heading2")}
                      title="Heading 2"
                    >
                      <Heading2 className="h-4 w-4" />
                    </Button>
                    <Separator orientation="vertical" className="mx-1 h-6" />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCommand("ul")}
                      title="Bulleted List"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCommand("ol")}
                      title="Numbered List"
                    >
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                    <Separator orientation="vertical" className="mx-1 h-6" />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCommand("quote")}
                      title="Quote"
                    >
                      <Quote className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCommand("link")}
                      title="Insert Link"
                    >
                      <Link className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCommand("image")}
                      title="Insert Image"
                    >
                      {/* <Image className="h-4 w-4" /> */}
                    </Button>
                    <div className="ml-auto">
                      {/* <Button
                        onClick={handleSave}
                        className="bg-insurance-orange hover:bg-insurance-orange-dark"
                      >
                        Save Article
                      </Button> */}
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="write" className="w-full">
                  <div className="border-b px-4">
                    <TabsList className="bg-transparent border-b-0">
                      <TabsTrigger
                        value="write"
                        className="data-[state=active]:bg-background"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Write
                      </TabsTrigger>
                      <TabsTrigger
                        value="preview"
                        className="data-[state=active]:bg-background"
                      >
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
                      placeholder={`# Your article title here\n\n## Introduction\nWrite an introduction to your topic...\n\n## Main Content\nThe main content of your article goes here...\n\n## Conclusion\nSummarize key points and offer next steps...\n`}
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
              {/* <RichTextEditor
                title="Article Content"
                markdownContent={currentArticle?.content || ""}
                initialValue={
                  currentArticle?.content ||
                  `# Your article title here\n\n## Introduction\nWrite an introduction to your topic...\n\n## Main Content\nThe main content of your article goes here...\n\n## Conclusion\nSummarize key points and offer next steps...\n`
                }
                onSave={handleSaveArticle}
              /> */}
            </div>
          </div>
          <Button
            onClick={() => handleSaveArticle()}
            disabled={loading}
            className="bg-insurance-orange hover:bg-insurance-orange-dark mt-4"
          >
            {loading ? (
              <span className="flex items-center">
                <Loader className="animate-spin mr-2" /> Saving...
              </span>
            ) : (
              <span className="flex items-center">
                <Plus className="h-4 w-4 mr-2" /> Save Article
              </span>
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditLearningHub;
