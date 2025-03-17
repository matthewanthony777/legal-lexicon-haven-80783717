
import { Article } from "@/types/article";

export function useMockArticles() {
  const getExampleArticles = (): Article[] => {
    return [
      {
        slug: "ai-in-legal-practice",
        title: "The Future of AI in Legal Practice",
        author: "Dr. Jane Smith",
        date: new Date().toISOString().split('T')[0],
        description: "Exploring how artificial intelligence is transforming the legal profession and what it means for future lawyers.",
        content: "# The Future of AI in Legal Practice\n\nArtificial intelligence is rapidly changing how legal professionals work. From document review to predictive case analysis, AI tools are becoming essential for modern law firms.\n\n## Key Areas of Impact\n\n- **Document Analysis**: AI can review thousands of documents in a fraction of the time it would take human lawyers.\n- **Legal Research**: AI systems can search and analyze case law with unprecedented speed and accuracy.\n- **Contract Management**: Smart contract systems can automate many aspects of contract creation and management.\n\n## The Human Element\n\nWhile AI brings tremendous capabilities, the human element remains irreplaceable. Judgment, creativity, and ethical reasoning are areas where human lawyers will continue to excel.",
        category: "Technology",
        tags: ["AI", "Legal Tech", "Future of Law"],
        coverImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
      },
      {
        slug: "environmental-law-challenges",
        title: "Emerging Challenges in Environmental Law",
        author: "Prof. Michael Johnson",
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        description: "An examination of the new legal challenges arising from climate change and environmental degradation.",
        content: "# Emerging Challenges in Environmental Law\n\nAs climate change accelerates, legal frameworks are struggling to keep pace. This article examines the emerging challenges in environmental law and potential solutions.\n\n## Global Coordination\n\nEnvironmental issues transcend national boundaries, creating complex jurisdictional challenges. International agreements like the Paris Climate Accord represent attempts to create cohesive global responses.\n\n## Corporate Responsibility\n\nCourts are increasingly holding corporations accountable for environmental impacts. Recent landmark cases have established new precedents for corporate liability.",
        category: "Environmental",
        tags: ["Climate Change", "Environmental Law", "Sustainability"],
        coverImage: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2874&q=80"
      },
      {
        slug: "legal-career-2030",
        title: "Legal Careers in 2030: What to Expect",
        author: "Lisa Rodriguez, JD",
        date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        description: "A forward-looking analysis of how legal careers will evolve over the next decade.",
        content: "# Legal Careers in 2030: What to Expect\n\nThe legal profession is undergoing a significant transformation. By 2030, the landscape of legal careers will look substantially different than it does today.\n\n## New Specializations\n\n- **Data Privacy Law**: As digital footprints expand, so does the need for specialized privacy attorneys.\n- **Space Law**: With commercial space exploration accelerating, legal frameworks for extraterrestrial activities are developing rapidly.\n- **AI Ethics Counsel**: Lawyers specializing in the ethical implications of artificial intelligence will be in high demand.\n\n## Changing Workplace Models\n\nThe traditional law firm model is giving way to more flexible arrangements. Virtual law practices, gig economy legal services, and legal operations specialists will become increasingly common.",
        category: "Career",
        tags: ["Career Development", "Future of Law", "Legal Education"],
        coverImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"
      }
    ];
  };

  return { getExampleArticles };
}
