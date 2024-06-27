interface Quote {
  text: string;
}

const quotes: Quote[] = [
  {
    text: "The only limit to our realization of tomorrow is our doubts of today.",
  },
  {
    text: "Do not wait to strike till the iron is hot, but make it hot by striking.",
  },
  {
    text: "Great minds discuss ideas, average minds discuss events, small minds discuss people.",
  },
  { text: "Whether you think you can or think you can't, you're right." },
  { text: "The best way to predict the future is to invent it." },
  { text: "Life is 10% what happens to us and 90% how we react to it." },
  { text: "Your time is limited, don't waste it living someone else's life." },
  { text: "The only way to do great work is to love what you do." },
  { text: "You miss 100% of the shots you don't take." },
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  },
  { text: "Believe you can and you're halfway there." },
  { text: "The purpose of our lives is to be happy." },
  { text: "Turn your wounds into wisdom." },
  { text: "The best revenge is massive success." },
  { text: "To be the best, you must be able to handle the worst." },
];

export function getRandomQuote(): Quote {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
}
