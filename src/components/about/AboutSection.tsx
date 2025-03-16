
import { ReactNode } from "react";

interface AboutSectionProps {
  title: string;
  children: ReactNode;
}

const AboutSection = ({ title, children }: AboutSectionProps) => {
  return (
    <>
      <h2 className="text-2xl font-playfair mb-6 mt-8">{title}</h2>
      {children}
    </>
  );
};

export default AboutSection;
