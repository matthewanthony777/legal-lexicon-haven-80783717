
import { Article } from "@/types/article";

/**
 * Initializes window.__ARTICLE_DATA__ with sample article data for fallback purposes.
 * This should be imported and called in the main.tsx file.
 */
export function initializeArticleData() {
  if (typeof window !== 'undefined') {
    // Only initialize if data doesn't already exist
    if (!window.__ARTICLE_DATA__ || window.__ARTICLE_DATA__.length === 0) {
      window.__ARTICLE_DATA__ = getSampleArticles();
      console.log(`Initialized window.__ARTICLE_DATA__ with ${window.__ARTICLE_DATA__.length} sample articles`);
    }
  }
}

function getSampleArticles(): Article[] {
  return [
    {
      slug: "legal-innovation",
      title: "The Innovation Imperative in Legal Practice",
      author: "David Chen, Esq.",
      date: new Date().toISOString().split('T')[0],
      description: "Why innovation is no longer optional for legal practitioners in today's rapidly evolving landscape.",
      content: "# The Innovation Imperative in Legal Practice\n\nIn today's rapidly evolving legal landscape, innovation is no longer just a buzzword—it's an imperative for survival and success. Law firms and legal departments that fail to embrace new technologies and methodologies risk being left behind.\n\n## Drivers of Change\n\n- **Client Expectations**: Clients increasingly expect more value, transparency, and efficiency.\n- **Technological Advancement**: AI, blockchain, and automation are transforming legal service delivery.\n- **Market Competition**: Alternative legal service providers are disrupting traditional models.\n\n## Strategic Approaches to Innovation\n\nSuccessful legal innovation requires more than just adopting new technologies. It demands a cultural shift, strategic vision, and willingness to reimagine longstanding practices.",
      category: "Innovation",
      tags: ["Legal Innovation", "Future of Law", "Legal Technology"],
      coverImage: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
    },
    {
      slug: "legal-ethics-ai",
      title: "Ethical Dilemmas in AI-Assisted Legal Practice",
      author: "Prof. Sarah Williams",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: "Navigating the complex ethical terrain of artificial intelligence in the practice of law.",
      content: "# Ethical Dilemmas in AI-Assisted Legal Practice\n\nThe integration of artificial intelligence into legal practice creates unprecedented ethical challenges. As AI systems take on increasingly sophisticated roles in legal research, document review, and even predictive analytics, attorneys must grapple with novel ethical questions.\n\n## Key Ethical Considerations\n\n- **Competence**: Do attorneys have a duty to understand the AI tools they use?\n- **Supervision**: What level of oversight is required when delegating tasks to AI?\n- **Confidentiality**: How can client data privacy be maintained when using third-party AI services?\n\n## Professional Responsibility Framework\n\nMany jurisdictions are only beginning to adapt their rules of professional conduct to address AI-specific concerns. In this regulatory gap, attorneys must exercise heightened vigilance and conservative judgment.",
      category: "Ethics",
      tags: ["Legal Ethics", "AI", "Professional Responsibility"],
      coverImage: "https://images.unsplash.com/photo-1562564055-71e051d33c19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
    }
  ];
}
