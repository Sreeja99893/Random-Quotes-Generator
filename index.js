// Sample quotes categorized by theme
const quotesByTheme = {
  life: [
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "Get busy living or get busy dying.", author: "Stephen King" },
    {text:"The purpose of our lives is to be happy.", author: "Dalai Lama"},
    {text: "Life is really simple, but we insist on making it complicated.",author: "Confucius"}
  ],
  success: [
    { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
    { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller" }
  ],
  time: [
    { text: "Time is money.", author: "Benjamin Franklin" },
    { text: "The two most powerful warriors are patience and time.", author: "Leo Tolstoy" }
  ],
  funny: [
    { text: "I used to think I was indecisive, but now I'm not so sure.", author: "Unknown" },
    { text: "I'm on a seafood diet. I see food and I eat it.", author: "Anonymous" }
  ]
};

// Utility to get a random quote from selected theme
function getRandomQuote(theme) {
  let quotes = [];

  if (theme === "all") {
    for (let t in quotesByTheme) {
      quotes = quotes.concat(quotesByTheme[t]);
    }
  } else {
    quotes = quotesByTheme[theme] || [];
  }

  const random = quotes[Math.floor(Math.random() * quotes.length)];
  return random;
}

// Function to show quote with fade effect
function displayQuote(quote) {
  $("#quote-text").fadeOut(200, function () {
    $(this).text(`"${quote.text}"`).fadeIn(400);
  });

  $("#quote-author").fadeOut(200, function () {
    $(this).text(`– ${quote.author}`).fadeIn(400);
  });
}

// Function to speak the quote using Web Speech API
function speakQuote(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.cancel(); // Cancel any current speech
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser doesn't support text-to-speech.");
  }
}

// jQuery DOM Ready
$(document).ready(function () {
  // Load initial quote
  const initialQuote = getRandomQuote("all");
  displayQuote(initialQuote);

  // New quote button
  $("#new-quote").on("click", function () {
    const theme = $("#theme-select").val();
    const quote = getRandomQuote(theme);
    displayQuote(quote);
  });

  // On theme change
  $("#theme-select").on("change", function () {
    const theme = $(this).val();
    const quote = getRandomQuote(theme);
    displayQuote(quote);
  });

  // Play audio
  $("#play-audio").on("click", function () {
    const quoteText = $("#quote-text").text();
    const authorText = $("#quote-author").text();
    speakQuote(`${quoteText} ${authorText}`);
  });
});
