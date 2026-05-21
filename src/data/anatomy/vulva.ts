export type VulvaPart = {
  id: string;
  label: string;
  /** Default fill colour */
  color: string;
  /** Fill colour when active */
  activeColor: string;
  description: string;
};

export const vulvaParts: VulvaPart[] = [
  {
    id: "clitoris",
    label: "Clitoris",
    color: "#FBCFE8",
    activeColor: "#EC4899",
    description:
      "The primary organ of sexual pleasure. Only the glans (tip) is visible externally — the full structure is wishbone-shaped and extends several centimetres internally. Contains roughly 8,000 nerve endings — more than any other human structure.",
  },
  {
    id: "labia-majora",
    label: "Labia Majora",
    color: "#FECACA",
    activeColor: "#F87171",
    description:
      "The outer folds of skin that protect the more sensitive inner structures. They contain fatty tissue and sweat/oil glands, and are covered in pubic hair after puberty. The female homologue of the scrotum.",
  },
  {
    id: "labia-minora",
    label: "Labia Minora",
    color: "#FED7AA",
    activeColor: "#FB923C",
    description:
      "The inner folds of skin surrounding the vaginal and urethral openings. Made of erectile tissue — they swell and darken during arousal. Asymmetry between sides is completely normal. They split at the top to form the clitoral hood.",
  },
  {
    id: "urethral-opening",
    label: "Urethral Opening",
    color: "#BBF7D0",
    activeColor: "#10B981",
    description:
      "The small opening through which urine exits — separate from the vaginal opening and not involved in reproduction. The female urethra is only ~4 cm long, which is why women are far more prone to UTIs than men.",
  },
  {
    id: "vaginal-opening",
    label: "Vaginal Opening",
    color: "#BFDBFE",
    activeColor: "#3B82F6",
    description:
      "The entrance to the vaginal canal. It is the passage for menstrual blood, sexual intercourse, and childbirth. Surrounded by the hymen — a thin, stretchy membrane that varies enormously between individuals.",
  },
  {
    id: "perineum",
    label: "Perineum",
    color: "#DDD6FE",
    activeColor: "#8B5CF6",
    description:
      "The area of skin between the vaginal opening and the anus. Contains important pelvic floor muscles that support the bladder, uterus and rectum. Can tear during childbirth.",
  },
];