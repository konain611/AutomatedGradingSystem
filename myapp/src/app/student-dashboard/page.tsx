"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question {
    question: string;
    rubrics: string;
    marks: number;
}

const StudentPortal: React.FC = () => {
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [feedback, setFeedback] = useState<string>('');
    const [questions, setQuestions] = useState<Question[]>(() => {
        // Load questions from local storage on initial render
        const savedQuestions = localStorage.getItem('questions');
        return savedQuestions ? JSON.parse(savedQuestions) : [];
    });

    const handleAnswerChange = (question: string, answer: string) => {
        setAnswers({ ...answers, [question]: answer });
    };

    const gradeAnswer = (answer: string, rubrics: string) => {
        const rubricLines = rubrics.split('\n');
        let totalMarks = 0;
        let feedback = '';

        rubricLines.forEach(line => {
            const [description, marks] = line.split('→').map(item => item.trim());
            if (answer.includes(description)) {
                totalMarks += Number(marks);
            } else {
                feedback += `Missing: ${description}\n`;
            }
        });

        return { totalMarks, feedback: feedback || 'All key elements present!' };
    };

    const handleSubmit = (question: string) => {
        const questionData = questions.find(q => q.question === question);
        if (questionData) {
            const { totalMarks, feedback } = gradeAnswer(answers[question], questionData.rubrics);
            setFeedback(`You scored: ${totalMarks} marks. ${feedback}`);
        }
    };

    return (
        <div>
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

            <h1 className="text-3xl font-bold mb-6 text-black">Student Portal</h1>
            {questions.map((q, index) => (
                <div key={index} className="mb-4">
                    <h2>{q.question}</h2>
                    <textarea
                        onChange={(e) => handleAnswerChange(q.question, e.target.value)}
                        placeholder="Write your answer here..."
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <button
                        onClick={() => handleSubmit(q.question)}
                        className="bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
                    >
                        Submit Answer
                    </button>
                </div>
            ))}
            {feedback && <p className="text-green-600">{feedback}</p>}
            </div>

    );
};

export default StudentPortal;