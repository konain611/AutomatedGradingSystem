"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question {
    question: string;
    rubrics: string;
    marks: number;
}

const TeacherPortal: React.FC = () => {
    const [question, setQuestion] = useState<string>('');
    const [rubrics, setRubrics] = useState<string>('');
    const [marks, setMarks] = useState<number>(0);
    const [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        // Load questions from localStorage only on the client side
        const savedQuestions = localStorage.getItem('questions');
        if (savedQuestions) {
            setQuestions(JSON.parse(savedQuestions));
        }
    }, []); // Empty dependency array to run once when the component mounts

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newQuestion: Question = { question, rubrics, marks };
        const updatedQuestions = [...questions, newQuestion];
        setQuestions(updatedQuestions);
        setQuestion('');
        setRubrics('');
        setMarks(0);
        localStorage.setItem('questions', JSON.stringify(updatedQuestions));
    };

    const handleDelete = (index: number) => {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
        localStorage.setItem('questions', JSON.stringify(updatedQuestions));
    };

    return (
        <div>
            <title>Faculty Portal</title>

            <div className="relative">
                <Link href="/">
                    <button
                        type="button"
                        className="absolute top-4 right-4 bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                    >
                        Log Out
                    </button>
                </Link>
            </div>

            <div className="min-h-screen bg-white flex flex-col items-center p-8">
                <h1 className="text-3xl font-bold mb-6 text-black">Teacher Portal</h1>
                <form onSubmit={handleSubmit} className="w-full max-w-lg bg-gray-100 p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="question">
                            Enter Question
                        </label>
                        <input
                            type="text"
                            id="question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="What are the benefits of exercise?"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rubrics">
                            Enter Rubrics
                        </label>
                        <textarea
                            id="rubrics"
                            value={rubrics}
                            onChange={(e) => setRubrics(e.target.value)}
                            placeholder="Improves heart health → 2 marks (comma separated)"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="marks">
                            Assign Marks
                        </label>
                        <input
                            type="number"
                            id="marks"
                            value={marks}
                            onChange={(e) => setMarks(Number(e.target.value))}
                            placeholder="Enter marks (e.g., 5)"
                            required
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="flex justify-center items-center">
                        <button
                            type="submit"
                            className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                        >
                            Add Question
                        </button>
                    </div>
                </form>

                <h2 className="text-2xl font-bold mt-8 text-black">Questions List</h2>
                <ul className="mt-4 w-full max-w-lg">
                    {questions.map((q, index) => (
                        <li key={index} className="bg-gray-100 p-4 mb-2 rounded shadow flex justify-between items-center">
                            <div>
                                <strong>Question:</strong> {q.question} <br />
                                <strong>Rubrics:</strong> {q.rubrics} <br />
                                <strong>Marks:</strong> {q.marks}
                            </div>
                            <button
                                onClick={() => handleDelete(index)}
                                className="ml-4 bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
                            >
                                &times; {/* Cross icon */}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TeacherPortal;