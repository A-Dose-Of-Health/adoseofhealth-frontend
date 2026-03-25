/* eslint-disable */
// THIS FILE IS AUTO-GENERATED. DO NOT EDIT.
// Run: npm run content:index

export const HEALTH_LIBRARY_INDEX = {
  "topics": [
    {
      "slug": "womens-health",
      "title": "Women’s Health",
      "description": "Trusted guidance across reproductive health, pregnancy, contraception, menopause, and more.",
      "icon": "heart",
      "order": 1,
      "sections": [
        {
          "title": "Body & Anatomy",
          "subtopics": [
            "Body & Anatomy"
          ]
        }
      ],
      "counts": {
        "subtopics": 2,
        "articles": 2
      }
    },
    {
      "slug": "mental-health",
      "title": "Mental Health",
      "description": "Understand common conditions, find self-care steps, and learn when to seek support.",
      "icon": "brain",
      "order": 2,
      "sections": [
        {
          "title": "Common Topics",
          "subtopics": [
            "anxiety"
          ]
        }
      ],
      "counts": {
        "subtopics": 1,
        "articles": 1
      }
    }
  ],
  "subtopicsByTopic": {
    "mental-health": [
      {
        "slug": "anxiety",
        "title": "Anxiety",
        "articleCount": 1
      }
    ],
    "womens-health": [
      {
        "slug": "body-anatomy",
        "title": "Body Anatomy",
        "articleCount": 1
      },
      {
        "slug": "pregnancy",
        "title": "Pregnancy",
        "articleCount": 1
      }
    ]
  },
  "articles": [
    {
      "filePath": "src\\content\\health-library\\mental-health\\anxiety\\understanding-anxiety.mdx",
      "route": "/health-library/mental-health/anxiety/understanding-anxiety",
      "frontmatter": {
        "title": "Understanding Anxiety",
        "summary": "Learn what anxiety is, common symptoms, and practical self-care steps.",
        "topic": "mental-health",
        "subtopic": "anxiety",
        "slug": "understanding-anxiety",
        "updatedAt": "2026-03-05",
        "formats": [
          "text"
        ],
        "tags": [
          "anxiety",
          "mental-health"
        ]
      },
      "toc": []
    },
    {
      "filePath": "src\\content\\health-library\\womens-health\\body-anatomy\\body-anatomy.mdx",
      "route": "/health-library/womens-health/body-anatomy/body-anatomy",
      "frontmatter": {
        "title": "Body & Anatomy",
        "summary": "Body & Anatomy",
        "topic": "womens-health",
        "subtopic": "body-anatomy",
        "slug": "body-anatomy",
        "updatedAt": "2026-03-05",
        "formats": [
          "text"
        ],
        "tags": [
          "womens-health"
        ],
        "featured": true
      },
      "toc": [
        {
          "id": "the-vulva-external-anatomy",
          "text": "The Vulva — External Anatomy",
          "level": 2
        },
        {
          "id": "mons-pubis",
          "text": "Mons Pubis",
          "level": 3
        },
        {
          "id": "labia-majora-outer-lips",
          "text": "Labia Majora (Outer Lips)",
          "level": 3
        },
        {
          "id": "labia-minora-inner-lips",
          "text": "Labia Minora (Inner Lips)",
          "level": 3
        },
        {
          "id": "clitoris-the-full-structure",
          "text": "Clitoris — The Full Structure",
          "level": 3
        },
        {
          "id": "urethral-opening-meatus",
          "text": "Urethral Opening (Meatus)",
          "level": 3
        },
        {
          "id": "vaginal-opening-hymen",
          "text": "Vaginal Opening & Hymen",
          "level": 3
        },
        {
          "id": "bartholins-glands",
          "text": "Bartholin's Glands",
          "level": 3
        },
        {
          "id": "skenes-glands-paraurethral",
          "text": "Skene's Glands (Paraurethral)",
          "level": 3
        },
        {
          "id": "vulva-hygiene-daily-dos-donts",
          "text": "Vulva Hygiene: Daily Do's & Don'ts",
          "level": 2
        },
        {
          "id": "-do",
          "text": "✅ Do",
          "level": 3
        },
        {
          "id": "-never",
          "text": "🚫 Never",
          "level": 3
        },
        {
          "id": "common-vulvar-conditions",
          "text": "Common Vulvar Conditions",
          "level": 2
        },
        {
          "id": "the-vagina-internal-canal",
          "text": "The Vagina — Internal Canal",
          "level": 2
        },
        {
          "id": "the-three-layers-of-the-vaginal-wall",
          "text": "The Three Layers of the Vaginal Wall",
          "level": 3
        },
        {
          "id": "vaginal-infections-the-three-main-types",
          "text": "Vaginal Infections — The Three Main Types",
          "level": 2
        },
        {
          "id": "kenya-myth-busting-vaginal-health",
          "text": "Kenya Myth-Busting: Vaginal Health",
          "level": 2
        }
      ]
    },
    {
      "filePath": "src\\content\\health-library\\womens-health\\pregnancy\\prenatal-care.mdx",
      "route": "/health-library/womens-health/pregnancy/prenatal-care",
      "frontmatter": {
        "title": "Pregnancy & Prenatal Care",
        "summary": "Key guidance for prenatal health, what to expect, and when to seek help.",
        "topic": "womens-health",
        "subtopic": "pregnancy",
        "slug": "prenatal-care",
        "updatedAt": "2026-03-05",
        "formats": [
          "text"
        ],
        "lifeStages": [
          "reproductive-years"
        ],
        "tags": [
          "pregnancy",
          "prenatal"
        ],
        "featured": true
      },
      "toc": []
    }
  ]
} as const;
