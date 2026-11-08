export type Thought = {
  id: string;
  text: string;
  special?: boolean;
};

export const thoughts: Thought[] = [
  {
    id: "talented",
    text: "The rangoli, the paintings, the drawings — none of that is small. You know that, right?",
  },
  {
    id: "exist",
    text: "There are people whose day gets better when you text them. Mine included.",
  },
  {
    id: "art",
    text: "Your art belongs in an exhibition, not just an Instagram story.",
  },
  {
    id: "littlebaby",
    text: "You don't always have to be strong. You're allowed to be someone's little baby too.",
  },
  {
    id: "ordinary",
    text: "A normal day with you somehow includes three side stories and one snack run.",
  },
  {
    id: "care",
    text: "You're the one who notices when someone's off. Let someone notice you too.",
  },
  {
    id: "enough",
    text: "You don't have to earn your place with people. You're already in.",
  },
  {
    id: "future",
    text: "There are still paintings to finish, rangolis to make, meals to try, and people who haven't heard your side stories yet.",
  },
  {
    id: "badday",
    text: "You're allowed to have a bad day without turning it into a whole investigation.",
  },
  {
    id: "goodthings",
    text: "A good meal, an unhurried conversation, and a day that goes your way. That's the whole wish.",
  },
  {
    id: "banned",
    text: "Negative overthinking is banned here. Only positive overthinking allowed, madam.",
    special: true,
  },
];

export const labCopy = {
  eyebrow: "Chapter 03 · The Positive Overthinking Centre",
  title: "A better use of your overthinking.",
  script: "for the girl who thinks about everything",
  intro:
    "A tiny machine for when your brain won't stop. No appointment, no waiting room, no charge for the good ones.",
  footnote: "walk-ins welcome · good thoughts only",
  button: "Give me a thought",
  again: "One more thought",
};
