// --- Dummy Data ---
export const leaderboardData = [
  { rank: 1, name: 'Luna', score: 12500, avatar: 'https://placehold.co/80x80/6366F1/FFFFFF?text=L' },
  { rank: 2, name: 'Orion', score: 11800, avatar: 'https://placehold.co/80x80/EC4899/FFFFFF?text=O' },
  { rank: 3, name: 'Stella', score: 11250, avatar: 'https://placehold.co/80x80/F59E0B/FFFFFF?text=S' },
  { rank: 4, name: 'Leo', score: 10500, avatar: 'https://placehold.co/40x40/10B981/FFFFFF?text=L' },
  { rank: 5, name: 'Nova', score: 9800, avatar: 'https://placehold.co/40x40/3B82F6/FFFFFF?text=N' },
  { rank: 6, name: 'Apollo', score: 9200, avatar: 'https://placehold.co/40x40/8B5CF6/FFFFFF?text=A' },
  { rank: 7, name: 'Celeste', score: 8750, avatar: 'https://placehold.co/40x40/EF4444/FFFFFF?text=C' },
  { rank: 8, name: 'Jasper', score: 8200, avatar: 'https://placehold.co/40x40/F97316/FFFFFF?text=J' },
  { rank: 9, name: 'Iris', score: 7800, avatar: 'https://placehold.co/40x40/D946EF/FFFFFF?text=I' },
  { rank: 10, name: 'Kai', score: 7500, avatar: 'https://placehold.co/40x40/14B8A6/FFFFFF?text=K' },
];

export const quizData = {
    beginner: {
        title: "Beginner",
        questions: [
            { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
            { question: "What is the largest mammal?", options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"], answer: "Blue Whale" },
            { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
            { question: "How many continents are there?", options: ["5", "6", "7", "8"], answer: "7" },
            { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Cell Wall"], answer: "Mitochondria" }
        ],
    },
    intermediate: {
        title: "Intermediate",
        questions: [
            { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], answer: "William Shakespeare" },
            { question: "What is the chemical symbol for gold?", options: ["Ag", "Go", "Au", "Gd"], answer: "Au" },
            { question: "In which year did the Titanic sink?", options: ["1905", "1912", "1918", "1923"], answer: "1912" },
            { question: "What is the hardest natural substance on Earth?", options: ["Quartz", "Gold", "Iron", "Diamond"], answer: "Diamond" },
            { question: "Which country is known as the Land of the Rising Sun?", options: ["China", "India", "Japan", "Thailand"], answer: "Japan" }
        ],
    },
    expert: {
        title: "Expert",
        questions: [
            { question: "What is the most abundant gas in the Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], answer: "Nitrogen" },
            { question: "Who is credited with discovering penicillin?", options: ["Marie Curie", "Albert Einstein", "Isaac Newton", "Alexander Fleming"], answer: "Alexander Fleming" },
            { question: "What is the smallest prime number?", options: ["0", "1", "2", "3"], answer: "2" },
            { question: "The Great Barrier Reef is located off the coast of which country?", options: ["Brazil", "Australia", "India", "South Africa"], answer: "Australia" },
            { question: "What is the main component of the sun?", options: ["Oxygen", "Helium", "Hydrogen", "Carbon"], answer: "Hydrogen" }
        ]
    }
};
