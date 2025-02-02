"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Question {
  question: string;
  rubrics: string;
  marks: number;
}

const TeacherPortal: React.FC = () => {
  const [question, setQuestion] = useState<string>("");
  const [rubrics, setRubrics] = useState<string>("");
  const [marks, setMarks] = useState<number>(0);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const savedQuestions = localStorage.getItem("questions");
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newQuestion: Question = { question, rubrics, marks };
    const updatedQuestions = [...questions, newQuestion];
    setQuestions(updatedQuestions);
    setQuestion("");
    setRubrics("");
    setMarks(0);
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
  };

  const handleDelete = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
  };

  return (
    <div>
      <title>Faculty Portal</title>

      <div className="relative">
        <Link href="/">
          <button className="absolute top-3 right-4 bg-white text-black font-bold py-2 px-4 rounded hover:text-red-600">
            Log Out
          </button>
        </Link>
      </div>
      <h1 className="text-[2.8rem] font-bold mt-1 mb-10 text-center text-white bg-black shadow-lg hover:cursor-pointer hover:text-black hover:bg-white">
        Teacher's Portal
      </h1>

      <div className="min-h-screen bg-white flex items-start justify-center p-8 gap-8">
        
        {/* Left Section - Add Question */}
        <div className="w-1/2 bg-gray-100 p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-black">Add Question</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="question">
                Enter Question
              </label>
              <input
                type="text"
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What are the benefits of exercise?"
                required
                className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="rubrics">
                Enter Rubrics
              </label>
              <textarea
                id="rubrics"
                value={rubrics}
                onChange={(e) => setRubrics(e.target.value)}
                placeholder="Improves heart health → 2 marks (comma separated)"
                required
                className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="marks">
                Assign Marks
              </label>
              <input
                type="number"
                id="marks"
                value={marks}
                onChange={(e) => setMarks(Number(e.target.value))}
                placeholder="Enter marks (e.g., 5)"
                required
                className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800"
              >
                Add Question
              </button>
            </div>
          </form>
        </div>

        {/* Right Section - Questions List */}
        <div className="w-1/2">
          <h2 className="text-3xl font-bold mb-4 text-black">Questions List</h2>
          <ul>
            {questions.length === 0 ? (
              <p className="text-gray-600">No questions added yet.</p>
            ) : (
              questions.map((q, index) => (
                <li key={index} className="bg-gray-100 p-4 mb-2 rounded shadow flex justify-between items-center">
                  <div>
                    <strong>Question:</strong> {q.question} <br />
                    <strong>Rubrics:</strong> {q.rubrics} <br />
                    <strong>Marks:</strong> {q.marks}
                  </div>
                  <button
                    onClick={() => handleDelete(index)}
                    className="ml-4 bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-700"
                  >
                    &times;
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeacherPortal;
