"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Question {
  question: string;
  rubrics: string;
  marks: number;
}

const StudentPortal: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [feedbacks, setFeedbacks] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const savedQuestions = localStorage.getItem("questions");
    const savedAnswers = localStorage.getItem("studentAnswers");

    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  const handleAnswerChange = (question: string, answer: string) => {
    setAnswers({ ...answers, [question]: answer });
  };

  useEffect(() => {
    localStorage.setItem("studentAnswers", JSON.stringify(answers));
  }, [answers]);

  const gradeAnswer = (answer: string, rubrics: string) => {
    const rubricLines = rubrics.split("\n");
    let totalMarks = 0;
    let feedback = "";

    rubricLines.forEach((line) => {
      const [description, marks] = line.split("→").map((item) => item.trim());
      if (answer.includes(description)) {
        totalMarks += Number(marks);
      } else {
        feedback += `Missing: ${description}\n`;
      }
    });

    return { totalMarks, feedback: feedback || "All key elements present!" };
  };

  const handleSubmit = (question: string) => {
    if (!answers[question] || answers[question].trim() === "") {
      setFeedbacks((prev) => ({
        ...prev,
        [question]: "Please enter an answer before submitting.",
      }));
      return;
    }

    const questionData = questions.find((q) => q.question === question);
    if (questionData) {
      const { totalMarks, feedback } = gradeAnswer(
        answers[question],
        questionData.rubrics
      );
      setFeedbacks((prev) => ({
        ...prev,
        [question]: `You scored: ${totalMarks} marks. ${feedback}`,
      }));
    }
  };

  return (
    <div>
    <div className="relative">
        <Link href="/">
          <button className="absolute top-3 right-4 bg-white text-black font-bold py-2 px-4 rounded hover:text-red-600">
            Log Out
          </button>
        </Link>
      </div>
      <h1 className="text-[2.8rem] font-bold mt-1 mb-10 text-center text-white bg-black shadow-lg hover:cursor-pointer hover:text-black hover:bg-white">
        Student's Portal
      </h1>
    <div className="p-8">


      {/* Questions Section */}
      <div className="flex flex-col items-center w-full">
        {questions.map((q, index) => (
          <div key={index} className="w-3/4 bg-gray-100 p-6 mb-6 shadow-md rounded-lg">
            <h2 className="text-lg font-semibold mb-2">{index + 1}. {q.question}</h2>
            <textarea
              onChange={(e) => handleAnswerChange(q.question, e.target.value)}
              value={answers[q.question] || ""}
              placeholder="Write your answer here..."
              className="w-full h-24 p-3 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => handleSubmit(q.question)}
              className="w-full mt-3 bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition"
            >
              Submit Answer
            </button>
            {feedbacks[q.question] && (
              <p className="mt-3 text-sm font-bold text-center text-green-500">{feedbacks[q.question]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default StudentPortal;
