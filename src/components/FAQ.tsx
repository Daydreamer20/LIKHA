
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) => {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="w-full flex justify-between items-center py-5 px-2 text-left"
        onClick={onClick}
      >
        <h3 className="font-medium text-lg">{question}</h3>
        <span className="flex-shrink-0 ml-2">
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-80 opacity-100 mb-5' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-600 px-2">{answer}</p>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    {
      question: "How do I install the Likha application?",
      answer: "Download the APK file from this website, then open it on your Android device. You may need to allow installation from unknown sources in your device settings. Follow the on-screen instructions to complete the installation."
    },
    {
      question: "Is the Likha app free to use?",
      answer: "Yes, the Likha application is completely free for all users, especially designed for public school K-3 learners in the Philippines."
    },
    {
      question: "Can I use Likha without internet connection?",
      answer: "Yes, most features including storybooks, SLMs, and games work offline. Only multimedia resources like DepEd TV and YouTube videos require an internet connection."
    },
    {
      question: "Will the app work on my device?",
      answer: "Likha is compatible with Android tablets and smartphones running Android 6.0 (Marshmallow) and above. It works best on devices with at least 2GB of RAM."
    },
    {
      question: "How often is the content updated?",
      answer: "The BLR regularly updates the app content via the BLR dashboard. Updates include new storybooks, learning modules, videos, and interactive resources. You'll be notified when new content is available."
    },
    {
      question: "When will Likha be available on Google Play Store?",
      answer: "We are currently in the approval process for the Google Play Store. The official launch is set for 2025, but in the meantime, you can download the app directly from this website."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-32">
      <div className="container max-w-3xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="bg-likha-purple/10 text-likha-purple text-sm font-medium px-4 py-2 rounded-full">
            Support
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg">
            Find answers to common questions about the Likha application.
          </p>
        </div>

        <div className="glass rounded-2xl p-6 md:p-8">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
