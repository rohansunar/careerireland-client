"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
//   import { Plus } from 'lucide-react'
import React from "react";

export default function FAQSection() {
  const faqs = [
    {
      question: "What is career coaching and how does it work ?",
      answer:
        "Career coaching is an investment in yourself and your future happiness and wealth.Career counselling is a type of advice-giving and support provided by career counsellors to their clients, to help the clients manage their journey through life, learning and work changes.",
    },
    {
      question:
        "Do you support and work with clients which are based internationally ?",
      answer: "Yes , we do support !",
    },
    {
      question:
        "Do you give coaching only by Phone / Skype / Zoom / WhatsApp or in person too ?",
      answer:
        "We only give coaching through Phone / Skype / Zoom ! Mostly its over Zoom.",
    },
    {
      question: "What's your working schedule outside of 5:30-9:00 ?",
      answer:
        "Until there's an important call which is not suiting your schedule , we may consider it to plan it earlier , mostly 1:00 PM but only on weekdays.",
    },
    {
      question: "You people are available on the weekends ?",
      answer: "Sunday is an off for the entire team !",
    },
    {
      question: "Will you help me with my network and connections?",
      answer: "NA",
    },
    {
      question: "Would you offer me out of sessions help & support ?",
      answer:
        "As part of our private mentorship coaching viz. 1:1 coaching there is no limit on your email and text support. Our customer support team would get back to you within 24 hours.",
    },
    {
      question: "What is your Career Coaching process ?",
      answer:
        "Firstly , we have a Career Discussion Call. It is the first call which you can avail for free and talk about your career aspirations to your assigned mentor. Further after the call you can decide whether or not you would want to go further ! After you register with us , our Customer Service Team would schedule your calls according to your availability !",
    },
    {
      question: "What if I want to terminate in the middle of my program ?",
      answer: "Please refer to our T&C's",
    },
    {
      question: "Do you offer a free or no charge initial consultation ?",
      answer:
        "Yes , we do ! Its the first call with you assigned mentor which is the career discussion call.",
    },
    {
      question: "Can I reschedule a scheduled coaching session ?",
      answer:
        "Yes , you can ! Our customer service team always asks whether or not the scheduled call suiting your availability or not.",
    },
    {
      question:
        "How do I know what program I need or is going to provide my best value and results that I want ?",
      answer:
        "Initially the first call with your mentor would clear this doubt of yours ! Our Session allows us to know what you want to improve or change as well as what is going on in your career and how much time you can devote to your Career Action Plan. This allows us to provide you with an experienced solution and path to get you your desired outcomes.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto p-4 py-28 space-y-6">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="border rounded-lg overflow-hidden"
          >
            <AccordionTrigger className="text-left hover:no-underline px-4 py-2 flex items-start [&[data-state=open]>svg]:rotate-180 [&::after]:hidden">
              {/* <Plus className="h-4 w-4 text-blue-600 mr-2 flex-shrink-0 transition-transform duration-200" /> */}
              <span>{faq.question}</span>
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 px-4 pb-2 pt-0">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
