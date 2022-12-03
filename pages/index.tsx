import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  const categories = [
    '5 year old',
    'High School Student',
    'University Student',
    'Expert',
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [userInput, setUserInput] = useState('');

  const callGenerateEndpoint = async (e: any) => {
    e.preventDefault();
    setIsGenerating(true);

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput, selectedCategory }),
    });

    const data = await response.json();
    const { output } = data;

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  return (
    <div className="flex flex-col items-center justify-center pt-32">
      <Head>
        <title>ELI5</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-10 md:px-20 text-center">
        <h1 className="text-4xl font-bold w-full">explain to me like...</h1>
        <form onSubmit={callGenerateEndpoint}>
          <div className="flex items-center justify-center mt-8 flex-col space-y-3 md:flex-row md:space-y-0">
            Explain
            <input
              placeholder="start typing here"
              className="w-[20rem] border-2 border-black rounded-md md:mx-4 flex p-2 text-center md:text-left"
              value={userInput}
              onChange={(e) => {
                setUserInput(e.target.value);
              }}
            />
            to me like I am {selectedCategory === 'Expert' ? 'an' : 'a'}{' '}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ padding: '4px' }}
              className="border-2 border-black rounded-md mx-4 flex p-2 text-center md:text-left"
            >
              {categories.map((c) => (
                <option value={c} key={c}>
                  {c}
                </option>
              ))}
            </select>
            <button
              className="border-2 border-slate-500 rounded-md mx-4 flex p-2 text-white bg-slate-500"
              type="submit"
            >
              {isGenerating ? 'Loading...' : 'Teach me!'}
            </button>
          </div>
        </form>

        {apiOutput && (
          <div className="mt-8">
            <div className="text-center md:px-8">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
