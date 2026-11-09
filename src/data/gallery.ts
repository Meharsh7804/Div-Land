export type GalleryPiece = {
  id: string;
  title: string;
  medium: string;
  note: string;
  image?: string;
  art: "rangoli" | "detail" | "rhythm";
  accent: "rose" | "butter" | "lavender";
};

export const gallery = {
  eyebrow: "Chapter 06 · The Talent Gallery",
  title: "Chhota packet, bada dhamaka.",
  script: "a tiny exhibition for a person with too much talent",
  entrance: {
    kicker: "now showing",
    title: "Chhota packet, bada dhamaka.",
    note: "A small room built around the rangoli you shared. The lights are off. For now.",
    action: "step inside",
  },
  captions: {
    first: "Chhota packet. Bada dhamaka.",
    second: "Some people just have a little too much talent.",
  },
  credit:
    "Original decorative studies made for this room. The real rangoli is yours.",
  hint: "tap a frame to move it into the spotlight",
  back: "back to the centrepiece",
  pieces: [
    {
      id: "rangoli",
      title: "The centrepiece",
      medium: "the one you shared recently",
      note: "The reason this little room exists. This illustration is a tribute, not a photo.",
      art: "rangoli",
      accent: "rose",
    },
    {
      id: "petals",
      title: "Petal study",
      medium: "a decorative study",
      note: "Imagined in the margins of the gallery. Yours is the real thing.",
      art: "detail",
      accent: "butter",
    },
    {
      id: "rhythm",
      title: "Circle study",
      medium: "a decorative study",
      note: "Another small study, made only to keep the rangoli company.",
      art: "rhythm",
      accent: "lavender",
    },
  ] satisfies GalleryPiece[],
  // Drop real photos into public/gallery/ (e.g. artwork.webp) and add
  // `image: "/gallery/artwork.webp"` to a piece above. The frames are ready.
};

export const finale = {
  eyebrow: "Chapter 08 · The Grand Finale",
  title: "Happy Birthday, Sonuuu!",
  script: "the last chapter, and then the cake",
  candleHint: "Tap each candle to light it.",
  wishPrompt: "Make a wish, birthday girl.",
  holdPrompt: "Press and hold to blow them out.",
  blowPrompt: "Now blow out the candles.",
  blownPrompt: "Wish sent. Look up.",
  messageTitle: "Happy Birthday, Sonuuu!",
  message: [
    "For a year of full plates, long conversations, good food, and being exactly this much yourself.",
    "More meals, more reels, more rangoli, fewer spirals. And a year that lets you be both the baddie and the baby.",
  ],
  signature: "With all the good wishes, always.",
  giftLabel: "one last surprise",
  giftTitle: "A gift that never expires",
  giftKicker: "a lifetime supply of",
  giftLines: [
    "Unlimited coffee.",
    "Unlimited good food.",
    "Unlimited conversations.",
    "And a lifetime supply of pampering.",
  ],
  giftBody:
    "Unlimited coffee. Unlimited good food. Unlimited conversations. And a lifetime supply of pampering.",
  giftFooter:
    "Redeemable any day. Especially on the days you pretend you're fine.",
  closing: "Your little universe will always be here.",
  replay: "Replay this little universe",
  makeWishAgain: "Light the candles again",
};
