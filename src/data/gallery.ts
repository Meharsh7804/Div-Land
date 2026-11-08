export type GalleryPiece = {
  id: string;
  title: string;
  medium: string;
  note: string;
  image?: string;
  art: "rangoli" | "painting" | "drawing" | "crafts";
  accent: "rose" | "butter" | "lavender";
};

export const gallery = {
  eyebrow: "Chapter 06 · The Talent Gallery",
  title: "Chhota packet, bada dhamaka.",
  script: "a small exhibition for a person with too many gifts",
  message:
    "Most people pick one thing. You seem to have collected a whole shelf.",
  body: "For the girl who turns powder and patience into rangoli, blank canvas into colour, and paper into portraits — then somehow still has energy to fuss over everyone else.",
  note: "The centrepiece is rangoli. The rest is proof she doesn't stop there.",
  pieces: [
    {
      id: "rangoli",
      title: "Rangoli",
      medium: "powder, patience, steady hands",
      note: "The one you made recently. Too good to be temporary.",
      art: "rangoli",
      accent: "rose",
    },
    {
      id: "painting",
      title: "Painting",
      medium: "colour, canvas, instinct",
      note: "Colour just behaves around her. It's honestly a little unfair.",
      art: "painting",
      accent: "butter",
    },
    {
      id: "drawing",
      title: "Drawing",
      medium: "pencil, paper, patience",
      note: "Give her a pencil and a blank page, and she'll fill it before you finish your coffee.",
      art: "drawing",
      accent: "lavender",
    },
    {
      id: "creations",
      title: "Things she makes",
      medium: "craft, creativity, handmade",
      note: "Handmade, one of a kind, and impossible to buy anywhere.",
      art: "crafts",
      accent: "rose",
    },
  ] satisfies GalleryPiece[],
  // Drop real photos into public/gallery/ (e.g. artwork.webp) and add
  // `image: "/gallery/artwork.webp"` to a piece above. The frames are ready.
};

export const finale = {
  eyebrow: "Chapter 08 · The Grand Finale",
  title: "Happy Birthday, Sonuuu!",
  script: "the last chapter, and then the cake",
  wishPrompt: "Make a wish, birthday girl.",
  blowPrompt: "Now blow out the candles.",
  blownPrompt: "Wish noted. Now, cake.",
  messageTitle: "For your next year",
  message: [
    "of full plates, long conversations, art worth framing, and being exactly this much yourself.",
    "More meals, more reels, more rangoli, more paint, fewer spirals. And a year that lets you be both the baddie and the baby.",
  ],
  signature: "Happy Birthday, Divya! \ud83c\udf80",
  giftLabel: "one last surprise",
  giftTitle: "A gift that never expires",
  giftBody:
    "Coffee, food, time to talk, and as much pampering as you'll allow. No expiry date.",
  giftFooter: "Redeemable any day. Especially on the days you pretend you're fine.",
  replay: "Replay the whole world",
  makeWishAgain: "Light the candles again",
};
