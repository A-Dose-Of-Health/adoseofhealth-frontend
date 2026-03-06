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
          "title": "Reproductive Health",
          "subtopics": [
            "pregnancy"
          ]
        },
        {
          "title": "Other",
          "subtopics": []
        }
      ],
      "counts": {
        "subtopics": 1,
        "articles": 1
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
