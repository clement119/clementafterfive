/**
 * Learning Journal — content lives here.
 *
 * To add a new note, append an object to the `journal` array below.
 * Structure:
 *
 *   {
 *     dimension: "Content Creation",        // the tab / category
 *     title: "Note title",                  // shown as the note heading
 *     subtitle: "Optional one-liner",       // optional
 *     date: "2026-05-29",                   // optional, ISO date
 *     sections: [                           // collapsible groups
 *       {
 *         title: "Section name",
 *         items: [
 *           // An item can be any of these:
 *           "A prompt.",                    //  string  -> copyable prompt
 *           { prompt: "A prompt." },        //  prompt  -> copyable prompt
 *           { text: "A guide line." },      //  text    -> plain, NOT copyable
 *           { builder: { template, controls } }, // interactive prompt builder
 *         ]
 *       }
 *     ],
 *     footer: "Optional closing note."      // optional free text
 *   }
 *
 * That's it. Notes are grouped automatically by `dimension`.
 */

const journal = [
  {
    dimension: "Content Creation",
    title: "20 Claude Prompts to Grow Your Brand",
    subtitle: "Don't use all 20. Pick 2–3 per piece of content.",
    date: "2026-05-29",
    sections: [
      {
        title: "Strategy Foundation",
        pillar: "Strategic Planning",
        items: [
          "Act like a brand strategist. Break down my brand and tell me what feels weak.",
          "Give me 3 campaign ideas that would make this product impossible to ignore.",
          "Analyze my niche and tell me what most brands are doing wrong.",
          "Define a clear point of view for my brand that separates it from competitors.",
          "What emotional triggers should my content focus on to drive conversions?",
          "If my brand disappeared, what would people actually miss and what does that reveal?",
        ],
      },
      {
        title: "Content Ideas",
        pillar: "Strategic Planning",
        items: [
          "Give me 10 viral content ideas based on tension, not tips, in my niche.",
          "Turn this topic into 5 controversial takes that would spark engagement.",
          "Generate content ideas that make my audience feel seen, not just informed.",
          "What content angles would make people save and share this post?",
          "Give me content ideas that position me as an authority, not a creator.",
          "What content would make my ideal customer feel called out in a good way?",
        ],
      },
      {
        title: "Copy & Hooks",
        pillar: "Strategic Planning",
        items: [
          "Rewrite this hook to create more curiosity and tension.",
          "Give me 5 hook variations that feel premium, not clickbait.",
          "Turn this idea into a scroll-stopping first slide.",
          "Make this content sound more human and less AI-generated.",
          "Rewrite this caption to increase saves and shares, not just likes.",
          "Write hooks that sound like something people would say out loud, not something brands usually write.",
        ],
      },
      {
        title: "Optimization & Growth",
        pillar: "Strategic Planning",
        items: [
          "Analyze this post and tell me why people might scroll past it.",
          "Break down what's missing in this carousel to improve retention.",
          "What would make this content more share-worthy?",
          "Act like a critic and tell me what feels generic or predictable here.",
          "Give me 3 ways to improve this post without changing the core idea.",
          "Where does this content lose attention and how would you fix that specific moment?",
        ],
      },
      {
        title: "Instagram carousels with Claude",
        pillar: "Media Creation & Edit",
        items: [
          { text: "A 6-step pipeline for producing on-brand Instagram carousels in Claude Design — set up a design system once, then generate, tweak, and repurpose slides automatically. The whole pitch: AI slides that don't look like AI slides.", plain: true },
          {
            gallery: {
              caption: "The workflow as shown in the mobileeditingclub post — cover plus steps 1–4.",
              images: [
                { src: "assets/examples/carousel-cover.jpg", label: "Cover" },
                { src: "assets/examples/carousel-step1.jpg", label: "1 · Upload references" },
                { src: "assets/examples/carousel-step2.jpg", label: "2 · Approve system" },
                { src: "assets/examples/carousel-step3.jpg", label: "3 · Generate" },
                { src: "assets/examples/carousel-step4.jpg", label: "4 · Final adjustments" },
              ],
            },
          },
          { heading: "The 6-step pipeline" },
          { text: "1 · Upload reference images to Claude Design — feed it your brand: logo files, fonts, colour hexes, sample designs, and a written description of the visual style (e.g. “clean, editorial, Apple-style minimalism, off-white backgrounds, chrome/glass 3D hero imagery, warm orange accent used sparingly”). You can also link a GitHub repo or drop a .fig file.", plain: true },
          { text: "2 · Adjust and approve the design system — Claude generates a full design system from your input: colour tokens, font hierarchy, spacing, button sizes, and rules per media format. Review and lock it before generating anything.", plain: true },
          { text: "3 · Generate the carousel — give it a topic; it produces a complete set of on-brand slides using your locked system. Fully automated.", plain: true },
          { text: "4 · Make final adjustments — manually fix text, colours, positioning, rounded corners, overlays. The editor exposes typography controls (size, weight, leading, tracking, case), so you're nudging, not rebuilding.", plain: true },
          { text: "5 · Scale across platforms — Claude reformats the finished slides for other channels (e.g. a square Instagram carousel into a LinkedIn post) with automated resizing.", plain: true },
          { text: "6 · Export and publish.", plain: true },
          { text: "Key insight: the design system is the moat. Generation quality is downstream of how well you defined the system in steps 1–2. Garbage system in, generic slides out.", plain: true },
          { heading: "Building the system — the part that matters" },
          { text: "Give it negative constraints too — “never use drop shadows,” “no gradients on text,” “max 8 words per headline.” Claude follows guardrails better than vibes.", plain: true },
          { text: "Provide 3–5 real reference slides you genuinely like, not just colours — it learns layout rhythm from examples far better than from descriptions.", plain: true },
          { text: "Lock exact hex values and font weights. “Warm orange” is ambiguous; #E8721E is not.", plain: true },
          { heading: "Generation" },
          { text: "Define a slide archetype set up front — hook slide, problem slide, list slide, CTA slide — and ask Claude to assemble from those. More consistent than freestyling each carousel.", plain: true },
          { text: "Keep one idea per slide. Carousels die when slides try to do two things.", plain: true },
          { heading: "Consistency at scale" },
          { text: "Treat the design system as a versioned asset. When you tweak it, regenerate a test carousel to catch drift before it propagates.", plain: true },
          { text: "Treat the locked design system as a reusable config in your wider marketing system — the same primitive across every campaign — so a generated carousel slots into your content calendar instead of being a one-off.", plain: true },
          { heading: "Reality check" },
          { text: "The post is marketing, so it understates the manual cleanup. Step 4 usually takes longer than implied — expect to hand-fix text overflow, awkward line breaks, and contrast on busy backgrounds. The automation gets you to 80%; the last 20% is still you.", plain: true },
        ],
      },
      {
        "title": "Font Library — Carousel Type",
        "pillar": "Media Creation & Edit",
        "items": [
          {
            "text": "Browse the 25 fonts most used in viral IG/LinkedIn carousels and Chinese short-video captions (23 free + 2 paid stand-ins). Pick weight, case, and use-case, then copy a ready-to-paste style brief.",
            "plain": true
          },
          {
            "fontLibrary": {
              "spacingModes": [
                {
                  "key": "normal",
                  "label": "Normal",
                  "default": true
                },
                {
                  "key": "narrow",
                  "label": "Narrow"
                }
              ],
              "caseModes": [
                {
                  "key": "asTyped",
                  "label": "As typed",
                  "default": true
                },
                {
                  "key": "uppercase",
                  "label": "Uppercase"
                }
              ],
              "fonts": [
                {
                  "id": "montserrat-black",
                  "label": "Montserrat Black",
                  "family": "Montserrat",
                  "category": "sans",
                  "sample": "The best time to plant a tree was 20 years ago.",
                  "weights": [
                    {
                      "value": 700,
                      "label": "Bold (700)",
                      "phrase": "bold"
                    },
                    {
                      "value": 900,
                      "label": "Black (900)",
                      "phrase": "black",
                      "default": true
                    }
                  ],
                  "useCases": [
                    {
                      "key": "quote-card",
                      "label": "a quote-card carousel slide",
                      "default": true
                    },
                    {
                      "key": "hook-slide",
                      "label": "a scroll-stopping hook slide"
                    },
                    {
                      "key": "cta",
                      "label": "a bold CTA slide"
                    }
                  ],
                  "allowCustomUseCase": true
                },
                {
                  "id": "poppins-extrabold",
                  "label": "Poppins ExtraBold",
                  "family": "Poppins",
                  "category": "sans",
                  "sample": "The best time to plant a tree was 20 years ago.",
                  "weights": [
                    {
                      "value": 600,
                      "label": "SemiBold (600)",
                      "phrase": "semibold"
                    },
                    {
                      "value": 800,
                      "label": "ExtraBold (800)",
                      "phrase": "extrabold",
                      "default": true
                    }
                  ],
                  "useCases": [
                    {
                      "key": "canva-template",
                      "label": "a Canva-style carousel template",
                      "default": true
                    },
                    {
                      "key": "quote-card",
                      "label": "a quote-card carousel slide"
                    },
                    {
                      "key": "cta",
                      "label": "a bold CTA slide"
                    }
                  ],
                  "allowCustomUseCase": true
                },
                {
                  "id": "bebas-neue",
                  "label": "Bebas Neue",
                  "family": "Bebas Neue",
                  "category": "condensed-caps",
                  "sample": "THE BEST TIME TO PLANT A TREE",
                  "caseToggleApplicable": false,
                  "useCases": [
                    {
                      "key": "slide-header",
                      "label": "a tall, bold slide header",
                      "default": true
                    },
                    {
                      "key": "hook-slide",
                      "label": "a scroll-stopping hook slide"
                    }
                  ],
                  "allowCustomUseCase": true
                },
                {
                  "id": "anton",
                  "label": "Anton",
                  "family": "Anton",
                  "category": "condensed-caps",
                  "sample": "STOP SCROLLING",
                  "caseToggleApplicable": false,
                  "useCases": [
                    {
                      "key": "hook-slide",
                      "label": "an ultra-bold hook slide",
                      "default": true
                    },
                    {
                      "key": "slide-header",
                      "label": "a tall, bold slide header"
                    }
                  ],
                  "allowCustomUseCase": true
                },
                {
                  "id": "archivo-black",
                  "label": "Archivo Black",
                  "family": "Archivo Black",
                  "category": "sans-heavy",
                  "sample": "The best time to plant a tree was 20 years ago.",
                  "useCases": [
                    {
                      "key": "thought-leadership",
                      "label": "a LinkedIn thought-leadership carousel",
                      "default": true
                    },
                    {
                      "key": "quote-card",
                      "label": "a quote-card carousel slide"
                    }
                  ],
                  "allowCustomUseCase": true
                },
                {
                  "id": "playfair-display-black",
                  "label": "Playfair Display Black",
                  "family": "Playfair Display",
                  "category": "serif",
                  "sample": "The best time to plant a tree was 20 years ago.",
                  "weights": [
                    {
                      "value": 700,
                      "label": "Bold (700)",
                      "phrase": "bold"
                    },
                    {
                      "value": 900,
                      "label": "Black (900)",
                      "phrase": "black",
                      "default": true
                    }
                  ],
                  "useCases": [
                    {
                      "key": "editorial",
                      "label": "an editorial, aesthetic quote carousel",
                      "default": true
                    },
                    {
                      "key": "quote-card",
                      "label": "a quote-card carousel slide"
                    }
                  ],
                  "allowCustomUseCase": true
                },
                {
                  "id": "inter-black",
                  "label": "Inter Black",
                  "family": "Inter",
                  "category": "sans",
                  "sample": "The best time to plant a tree was 20 years ago.",
                  "weights": [
                    {
                      "value": 700,
                      "label": "Bold (700)",
                      "phrase": "bold"
                    },
                    {
                      "value": 900,
                      "label": "Black (900)",
                      "phrase": "black",
                      "default": true
                    }
                  ],
                  "useCases": [
                    {
                      "key": "saas",
                      "label": "a clean, minimalist SaaS/startup carousel",
                      "default": true
                    },
                    {
                      "key": "quote-card",
                      "label": "a quote-card carousel slide"
                    }
                  ],
                  "allowCustomUseCase": true
                },
                {
                  "id": "caveat",
                  "label": "Caveat",
                  "family": "Caveat",
                  "category": "script",
                  "sample": "The best time to plant a tree was 20 years ago.",
                  "weights": [
                    {
                      "value": 600,
                      "label": "SemiBold (600)",
                      "phrase": "semibold"
                    },
                    {
                      "value": 700,
                      "label": "Bold (700)",
                      "phrase": "bold",
                      "default": true
                    }
                  ],
                  "useCases": [
                    {
                      "key": "annotation",
                      "label": "a handwritten annotation or highlight on a slide",
                      "default": true
                    },
                    {
                      "key": "accent",
                      "label": "a casual accent line"
                    }
                  ],
                  "allowCustomUseCase": true
                },
                {
                  "id": "dancing-script",
                  "label": "Dancing Script",
                  "family": "Dancing Script",
                  "category": "script",
                  "sample": "The best time to plant a tree",
                  "weights": [
                    {
                      "value": 600,
                      "label": "SemiBold (600)",
                      "phrase": "semibold"
                    },
                    {
                      "value": 700,
                      "label": "Bold (700)",
                      "phrase": "bold",
                      "default": true
                    }
                  ],
                  "useCases": [
                    {
                      "key": "cursive-accent",
                      "label": "a flowing cursive accent on a carousel slide",
                      "default": true
                    },
                    {
                      "key": "quote-card",
                      "label": "a quote-card carousel slide"
                    }
                  ],
                  "allowCustomUseCase": true
                },
                {
                  "id": "pacifico",
                  "label": "Pacifico",
                  "family": "Pacifico",
                  "category": "script",
                  "sample": "The best time to plant a tree",
                  "useCases": [
                    {
                      "key": "retro-brand",
                      "label": "a retro, friendly brand carousel",
                      "default": true
                    },
                    {
                      "key": "accent",
                      "label": "a casual accent line"
                    }
                  ],
                  "allowCustomUseCase": true
                },
                {
                  "id": "great-vibes",
                  "label": "Great Vibes",
                  "family": "Great Vibes",
                  "category": "script",
                  "sample": "The best time to plant a tree",
                  "useCases": [
                    {
                      "key": "luxury",
                      "label": "an elegant, luxury quote slide",
                      "default": true
                    },
                    {
                      "key": "editorial",
                      "label": "an editorial, aesthetic quote carousel"
                    }
                  ],
                  "allowCustomUseCase": true
                },
                {
                  "id": "sacramento",
                  "label": "Sacramento",
                  "family": "Sacramento",
                  "category": "script",
                  "sample": "The best time to plant a tree",
                  "useCases": [
                    {
                      "key": "minimalist",
                      "label": "a thin, delicate, minimalist-aesthetic carousel",
                      "default": true
                    },
                    {
                      "key": "accent",
                      "label": "a casual accent line"
                    }
                  ],
                  "allowCustomUseCase": true
                },
                {
                  "id": "satisfy",
                  "label": "Satisfy",
                  "family": "Satisfy",
                  "category": "script",
                  "sample": "The best time to plant a tree",
                  "useCases": [
                    {
                      "key": "wellness",
                      "label": "a casual, lifestyle/wellness carousel accent",
                      "default": true
                    },
                    {
                      "key": "accent",
                      "label": "a casual accent line"
                    }
                  ],
                  "allowCustomUseCase": true
                },
                {
                  "id": "alex-brush",
                  "label": "Alex Brush",
                  "family": "Alex Brush",
                  "category": "script",
                  "sample": "The best time to plant a tree",
                  "useCases": [
                    {
                      "key": "signature",
                      "label": "a bold, brush-pen, signature-style highlight",
                      "default": true
                    },
                    {
                      "key": "accent",
                      "label": "a casual accent line"
                    }
                  ],
                  "allowCustomUseCase": true
                },
                {
                  "id": "parisienne",
                  "label": "Parisienne",
                  "family": "Parisienne",
                  "category": "script",
                  "sample": "The best time to plant a tree",
                  "useCases": [
                    {
                      "key": "fashion-editorial",
                      "label": "a narrow, romantic, editorial/fashion carousel",
                      "default": true
                    },
                    {
                      "key": "luxury",
                      "label": "an elegant, luxury quote slide"
                    }
                  ],
                  "allowCustomUseCase": true
                },
                {
                  "id": "gotham-bold",
                  "label": "Gotham Bold",
                  "family": null,
                  "category": "sans-heavy",
                  "sample": "The best time to plant a tree was 20 years ago.",
                  "weights": [
                    {
                      "value": 800,
                      "label": "Bold (800)",
                      "phrase": "bold",
                      "default": true
                    }
                  ],
                  "useCases": [
                    {
                      "key": "quote-card",
                      "label": "a quote-card carousel slide",
                      "default": true
                    },
                    {
                      "key": "thought-leadership",
                      "label": "a LinkedIn thought-leadership carousel"
                    }
                  ],
                  "allowCustomUseCase": true,
                  "paid": {
                    "trueName": "Gotham Bold",
                    "categoryDescriptor": "heavy geometric sans-serif",
                    "standInFamily": "Montserrat",
                    "standInWeight": 800,
                    "note": "Shown here in Montserrat as a stand-in for layout only — this is NOT Gotham. Real Gotham requires Adobe Fonts (Creative Cloud) or Hoefler&Co license."
                  }
                },
                {
                  "id": "futura-pt-bold",
                  "label": "Futura PT Bold",
                  "family": null,
                  "category": "sans",
                  "sample": "The best time to plant a tree was 20 years ago.",
                  "weights": [
                    {
                      "value": 700,
                      "label": "Bold (700)",
                      "phrase": "bold",
                      "default": true
                    }
                  ],
                  "useCases": [
                    {
                      "key": "quote-card",
                      "label": "a quote-card carousel slide",
                      "default": true
                    },
                    {
                      "key": "cta",
                      "label": "a bold CTA slide"
                    }
                  ],
                  "allowCustomUseCase": true,
                  "paid": {
                    "trueName": "Futura PT Bold",
                    "categoryDescriptor": "clean geometric sans-serif",
                    "standInFamily": "Poppins",
                    "standInWeight": 700,
                    "note": "Shown here in Poppins as a stand-in for layout only — this is NOT Futura PT. Real Futura PT requires Adobe Fonts or URW++ license."
                  }
                },
                {
                  "id": "permanent-marker",
                  "label": "Permanent Marker",
                  "family": "Permanent Marker",
                  "category": "marker",
                  "sample": "The best time to plant a tree was 20 years ago.",
                  "useCases": [
                    {
                      "key": "hook-slide",
                      "label": "a bold, attention-grabbing hook slide",
                      "default": true
                    },
                    {
                      "key": "cta",
                      "label": "a punchy CTA callout"
                    }
                  ],
                  "allowCustomUseCase": true
                },
                {
                  "id": "short-stack",
                  "label": "Short Stack",
                  "family": "Short Stack",
                  "category": "script",
                  "sample": "The best time to plant a tree was 20 years ago.",
                  "useCases": [
                    {
                      "key": "annotation",
                      "label": "a casual handwritten annotation on a slide",
                      "default": true
                    },
                    {
                      "key": "accent",
                      "label": "a friendly accent line"
                    }
                  ],
                  "allowCustomUseCase": true
                },
                {
                  "id": "kalam",
                  "label": "Kalam",
                  "family": "Kalam",
                  "category": "script",
                  "sample": "The best time to plant a tree was 20 years ago.",
                  "weights": [
                    {
                      "value": 300,
                      "label": "Light (300)",
                      "phrase": "light",
                      "default": true
                    },
                    {
                      "value": 700,
                      "label": "Bold (700)",
                      "phrase": "bold"
                    }
                  ],
                  "useCases": [
                    {
                      "key": "annotation",
                      "label": "a light, personal-feeling annotation",
                      "default": true
                    },
                    {
                      "key": "quote-card",
                      "label": "a quote-card carousel slide"
                    }
                  ],
                  "allowCustomUseCase": true
                },
                {
                  "id": "patrick-hand",
                  "label": "Patrick Hand",
                  "family": "Patrick Hand",
                  "category": "script",
                  "sample": "The best time to plant a tree was 20 years ago.",
                  "useCases": [
                    {
                      "key": "annotation",
                      "label": "a clean handwritten note or label",
                      "default": true
                    },
                    {
                      "key": "accent",
                      "label": "a friendly accent line"
                    }
                  ],
                  "allowCustomUseCase": true
                },
                {
                  "id": "zcool-kuaile",
                  "label": "ZCOOL KuaiLe (站酷快乐体)",
                  "family": "ZCOOL KuaiLe",
                  "category": "script",
                  "sample": "种树最好的时间是十年前，其次是现在。",
                  "caseToggleApplicable": false,
                  "useCases": [
                    {
                      "key": "social-title",
                      "label": "a playful Chinese social video title card",
                      "default": true
                    },
                    {
                      "key": "caption",
                      "label": "a lighthearted caption for a lifestyle post"
                    }
                  ],
                  "allowCustomUseCase": true,
                  "template": "Use {family} (站酷快乐体), a playful, rounded Chinese brush-style font, for {useCase}."
                },
                {
                  "id": "stxingkai",
                  "label": "STXingkai (华文行楷)",
                  "family": "STXingkai",
                  "familyCSS": "'STXingkai', 华文行楷, cursive",
                  "category": "script",
                  "sample": "种树最好的时间是十年前，其次是现在。",
                  "caseToggleApplicable": false,
                  "useCases": [
                    {
                      "key": "brush-title",
                      "label": "a classic brush-calligraphy title",
                      "default": true
                    },
                    {
                      "key": "quote-card",
                      "label": "an elegant Chinese quote card"
                    }
                  ],
                  "allowCustomUseCase": true,
                  "template": "Use {family} (华文行楷), a classic Chinese brush cursive font, for {useCase}.",
                  "note": "System font — renders as the real thing on Mac/iOS if installed; other devices will show a fallback font here, but the prompt above still names the real font for your AI tool."
                },
                {
                  "id": "unbounded",
                  "label": "Unbounded",
                  "family": "Unbounded",
                  "category": "sans-heavy",
                  "sample": "The best time to plant a tree was 20 years ago.",
                  "weights": [
                    {
                      "value": 900,
                      "label": "Black (900)",
                      "phrase": "black",
                      "default": true
                    }
                  ],
                  "useCases": [
                    {
                      "key": "brand-headline",
                      "label": "a bold display headline for a modern brand carousel",
                      "default": true
                    },
                    {
                      "key": "title-card",
                      "label": "a heavy geometric title card"
                    }
                  ],
                  "allowCustomUseCase": true
                },
                {
                  "id": "bodoni-moda-italic",
                  "label": "Bodoni Moda Italic",
                  "family": "Bodoni Moda",
                  "fontStyle": "italic",
                  "category": "serif",
                  "sample": "The best time to plant a tree was 20 years ago.",
                  "weights": [
                    {
                      "value": 700,
                      "label": "Bold (700)",
                      "phrase": "bold",
                      "default": true
                    }
                  ],
                  "useCases": [
                    {
                      "key": "editorial-quote",
                      "label": "an elegant Didone-style editorial quote card",
                      "default": true
                    },
                    {
                      "key": "fashion-headline",
                      "label": "a high-fashion magazine-style headline"
                    }
                  ],
                  "allowCustomUseCase": true,
                  "template": "Use {family} italic, a high-contrast Didone serif, for {useCase}."
                }
              ],
              "categoryTemplates": {
                "default": "Use {family}{weightClause}, for {useCase}{caseClause}.",
                "sans": "Use {family}{weightClause}, a clean sans-serif, for {useCase}{caseClause}.",
                "sans-heavy": "Use {family}{weightClause}, a heavy geometric sans-serif, for {useCase}{caseClause}.",
                "condensed-caps": "Use {family}, an ultra-bold condensed display caps font with tight letter-spacing, for {useCase}.",
                "serif": "Use {family}{weightClause}, an editorial serif, for {useCase}{caseClause}.",
                "script": "Use {family}, a flowing handwritten script, for {useCase}{caseClause}.",
                "marker": "Use {family}, a bold, hand-drawn marker-style font, for {useCase}{caseClause}."
              },
              "paidTemplate": "Use {family} (or a similar {categoryDescriptor} if unavailable){weightClause}, for {useCase}."
            }
          }
        ]
      },
      {
        title: "Instagram Story Stickers",
        pillar: "Media Creation & Edit",
        items: [
          {
            text: "Fill in your own wording per sticker, or leave a field blank to let the AI invent something that fits your photo. The dark canvas below is just a preview aid — when you screenshot, crop tight to the sticker itself and drop it onto your real photo as a sticker layer in Instagram's story editor.",
            plain: true,
          },
          {
            gallery: {
              caption: "These stickers in an actual story — Notes card, Reminder dialog + floating labels, Banner + Notes card, Chat bubbles, and Collaborator cursors.",
              images: [
                { src: "assets/examples/sticker-example-notes.jpg", label: "Notes app card" },
                { src: "assets/examples/sticker-example-reminder-labels.jpg", label: "Reminder dialog + floating labels" },
                { src: "assets/examples/sticker-example-banner-notes.jpg", label: "Text banner + Notes card" },
                { src: "assets/examples/sticker-example-chat-bubble.jpg", label: "Chat bubbles" },
                { src: "assets/examples/sticker-example-collab-cursor.jpg", label: "Collaborator cursors" },
              ],
            },
          },
          {
            stickerLibrary: {
              sharedStyle: `
                :root{
                  --ink:#1c1c1e;
                  --paper:#ffffff;
                  --canvas:#0e0e10;
                  --accent:#ffd60a;
                }
                *{box-sizing:border-box;}
                body{
                  margin:0;
                  background:var(--canvas);
                  font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text',Helvetica,Arial,sans-serif;
                  color:#fff;
                  display:flex;
                  align-items:center;
                  justify-content:center;
                  min-height:100vh;
                  padding:20px;
                }
                .stage{
                  position:relative;
                  width:280px;
                  min-height:340px;
                  height:auto;
                  border-radius:20px;
                  background:linear-gradient(160deg,#3a3a3c,#111);
                  overflow:hidden;
                  display:flex;
                  align-items:center;
                  justify-content:center;
                }
                .stage.dark{background:linear-gradient(150deg,#2c2c2e,#050505);}

                /* Export target: only this element (not .stage) gets rasterized
                   into the downloadable/copyable sticker PNG, so the dark/light
                   phone canvas above never ends up in the exported image. The
                   padding keeps decorative bits that render slightly outside
                   their own box (banner tag-ends, bubble tail) from clipping. */
                .sticker-capture{display:inline-block;padding:10px;}
                .sticker-capture--canvas{position:relative;width:260px;height:320px;padding:0;}

                /* ---------- 1. Notes app card ---------- */
                .notes-card{
                  width:230px;
                  background:var(--paper);
                  color:var(--ink);
                  border-radius:16px;
                  padding:16px 16px 18px;
                  box-shadow:0 18px 40px rgba(0,0,0,.45);
                  transform:rotate(-1.5deg);
                }
                .notes-card .nav{
                  display:flex;
                  justify-content:space-between;
                  align-items:center;
                  font-size:13px;
                  color:#ff9500;
                  margin-bottom:10px;
                }
                .notes-card .nav span:first-child::before{content:"‹ ";}
                .notes-card h4{
                  margin:0 0 10px;
                  font-size:17px;
                  font-weight:700;
                }
                .notes-card ul{
                  list-style:none;
                  margin:0;
                  padding:0;
                  font-size:14px;
                  line-height:1.9;
                }
                .notes-card ul.bullet li::before{
                  content:"• ";
                  color:#8e8e93;
                }
                .notes-card ul.checklist li::before{
                  content:"☐ ";
                  color:#8e8e93;
                }

                /* ---------- 2. Flag / highlight text banner ---------- */
                .flag-banner{
                  position:relative;
                  display:inline-block;
                  max-width:220px;
                  background:var(--accent);
                  color:#1c1c1e;
                  font-weight:600;
                  font-size:15px;
                  padding:6px 14px;
                  border-radius:2px;
                  white-space:pre-wrap;
                  overflow-wrap:break-word;
                }
                .flag-banner::before,.flag-banner::after{
                  content:"";
                  position:absolute;
                  top:50%;
                  transform:translateY(-50%);
                  width:8px;
                  height:8px;
                  background:#1c1c1e;
                  border-radius:50%;
                }
                .flag-banner::before{left:-4px;}
                .flag-banner::after{right:-4px;}

                /* ---------- 3. Reminder / system alert dialog ---------- */
                .alert{
                  width:240px;
                  background:rgba(250,250,250,.92);
                  backdrop-filter:blur(6px);
                  color:var(--ink);
                  border-radius:14px;
                  overflow:hidden;
                  box-shadow:0 20px 45px rgba(0,0,0,.5);
                  text-align:center;
                }
                .alert .body{padding:18px 16px 14px;}
                .alert .title{font-size:15px;font-weight:700;margin-bottom:6px;}
                .alert .msg{font-size:12.5px;line-height:1.5;color:#333;white-space:pre-wrap;overflow-wrap:break-word;}
                .alert .actions{
                  display:flex;
                  border-top:1px solid rgba(0,0,0,.15);
                }
                .alert .actions button{
                  flex:1;
                  border:none;
                  background:transparent;
                  padding:11px 0;
                  font-size:14px;
                  color:#c0392b;
                  font-weight:400;
                }
                .alert .actions button:first-child{
                  border-right:1px solid rgba(0,0,0,.15);
                }
                .alert .actions button:last-child{font-weight:700;}

                /* ---------- 4. Floating emoji labels ---------- */
                .label-field{position:relative;width:100%;height:100%;}
                .float-label{
                  position:absolute;
                  color:#fff;
                  font-size:14px;
                  font-weight:600;
                  text-shadow:0 1px 6px rgba(0,0,0,.6);
                }
                .float-label.a{top:22%; left:12%;}
                .float-label.b{top:38%; right:10%;}
                .float-label.c{bottom:30%; left:16%;}
                .float-label.d{bottom:14%; right:14%;}

                /* ---------- 5. Chat / message bubble ---------- */
                .chat-bubble{
                  position:relative;
                  display:inline-block;
                  max-width:210px;
                  background:var(--paper);
                  color:var(--ink);
                  font-size:14px;
                  line-height:1.4;
                  padding:10px 14px;
                  border-radius:18px;
                  box-shadow:0 10px 24px rgba(0,0,0,.4);
                  word-wrap:break-word;
                  overflow-wrap:break-word;
                  white-space:pre-wrap;
                }
                .chat-bubble::after{
                  content:"";
                  position:absolute;
                  bottom:-6px;
                  left:18px;
                  width:14px;
                  height:14px;
                  background:var(--paper);
                  clip-path:polygon(0 0, 100% 0, 0 100%);
                  border-radius:0 0 0 5px;
                }

                /* ---------- 6. Coding window panel ---------- */
                .term-panel{
                  width:240px;
                  border-radius:12px;
                  overflow:hidden;
                  font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;
                }
                .term-panel.term-dark{ background:#161b22; color:#c9d1d9; box-shadow:0 18px 40px rgba(0,0,0,.45); }
                .term-panel.term-light{ background:#ffffff; color:#1c1c1e; box-shadow:0 18px 40px rgba(0,0,0,.25); }
                .term-header{
                  display:flex;
                  align-items:center;
                  gap:8px;
                  padding:10px 12px;
                  border-bottom:1px solid rgba(127,127,127,.25);
                }
                .term-dot{width:11px;height:11px;border-radius:50%;flex:none;}
                .term-dot--red{background:#ff5f56;}
                .term-dot--yellow{background:#ffbd2e;}
                .term-dot--green{background:#27c93f;}
                .term-title{
                  flex:1;
                  text-align:center;
                  font-size:12px;
                  font-weight:600;
                  font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text',Helvetica,Arial,sans-serif;
                  opacity:.7;
                  overflow:hidden;
                  text-overflow:ellipsis;
                  white-space:nowrap;
                }
                .term-body{
                  padding:16px 14px;
                  font-size:13px;
                  line-height:1.6;
                  white-space:pre-wrap;
                  overflow-wrap:break-word;
                }

                /* ---------- 7. Windows 95 right-click menu ---------- */
                /* Classic double bevel: an outer ring (white top-left,
                   black bottom-right) over an inner ring (#dfdfdf / #808080)
                   is what gives the panel its raised 3D edge. */
                .w95-menu{
                  width:212px;
                  background:#c0c0c0;
                  color:#000;
                  padding:2px;
                  border:2px solid;
                  border-color:#ffffff #000000 #000000 #ffffff;
                  box-shadow:inset 1px 1px 0 #dfdfdf, inset -1px -1px 0 #808080, 0 14px 34px rgba(0,0,0,.5);
                  font-family:Tahoma,'MS Sans Serif','Microsoft Sans Serif',Geneva,Verdana,sans-serif;
                  font-size:15px;
                  line-height:1.25;
                  text-align:left;
                }
                .w95-row{
                  position:relative;
                  padding:5px 26px 5px 18px;
                  white-space:pre-wrap;
                  overflow-wrap:break-word;
                  min-height:1.25em;
                }
                .w95-row--sel{ background:#000080; color:#ffffff; }
                .w95-sep{
                  height:0;
                  margin:4px 2px;
                  border-top:1px solid #808080;
                  border-bottom:1px solid #ffffff;
                }
                /* Sits inside the selected row, tip up-left, kept within the
                   menu's own bounds so nothing clips at the capture edge. */
                .w95-cursor{
                  position:absolute;
                  right:11px;
                  top:46%;
                  width:15px;
                  height:22px;
                  display:block;
                  pointer-events:none;
                }

                /* ---------- 8. Collaborator cursor ---------- */
                .cursor-sticker{
                  display:inline-flex;
                  flex-direction:column;
                  align-items:flex-start;
                }
                .cursor-arrow{
                  width:38px;
                  height:auto;
                  display:block;
                  filter:drop-shadow(0 3px 6px rgba(0,0,0,.35));
                }
                /* Mirror rather than rotate — the arrow keeps its crisp
                   vertical/horizontal edges in every direction. */
                .cursor-arrow.dir-ur{ transform:scaleX(-1); }
                .cursor-arrow.dir-dl{ transform:scaleY(-1); }
                .cursor-arrow.dir-dr{ transform:scale(-1,-1); }
                .cursor-label{
                  margin:-4px 0 0 28px;
                  padding:6px 14px;
                  border-radius:7px;
                  color:#fff;
                  font-size:19px;
                  font-weight:700;
                  letter-spacing:.01em;
                  line-height:1.25;
                  white-space:pre-wrap;
                  overflow-wrap:break-word;
                  max-width:230px;
                  box-shadow:0 3px 10px rgba(0,0,0,.28);
                }
                /* The label tucks under the arrow's tail, so it swaps to the
                   other side when the arrow mirrors horizontally. */
                .cursor-sticker.dir-ur, .cursor-sticker.dir-dr{ align-items:flex-end; }
                .cursor-sticker.dir-ur .cursor-label,
                .cursor-sticker.dir-dr .cursor-label{ margin:-4px 28px 0 0; }
                .cursor-sticker.dir-dl, .cursor-sticker.dir-dr{ flex-direction:column-reverse; }
                .cursor-sticker.dir-dl .cursor-label{ margin:0 0 -4px 28px; }
                .cursor-sticker.dir-dr .cursor-label{ margin:0 28px -4px 0; }
              `,
              stickers: [
                {
                  id: "notes-card",
                  label: "Notes app card",
                  fields: [
                    { key: "headline", label: "Headline", type: "text", default: "I was and still am…" },
                    { key: "items", label: "Bullet lines (one per line)", type: "list", default: ["Introverted", "Very private", "Not natural at photos", "Shy on camera"] },
                    { key: "bulletStyle", label: "Bullet style", type: "choice", choices: [{ value: "bullet", label: "Bullet" }, { value: "checkbox", label: "Checklist" }], default: "bullet" },
                  ],
                  buildHtml: function (v, esc) {
                    const items = (v.items || []).map((i) => `<li>${esc(i)}</li>`).join("");
                    const listClass = v.bulletStyle === "checkbox" ? "checklist" : "bullet";
                    return `<div class="stage"><div class="sticker-capture"><div class="notes-card"><div class="nav"><span>Notes</span><span>⋯</span></div><h4>${esc(v.headline)}</h4><ul class="${listClass}">${items}</ul></div></div></div>`;
                  },
                  buildPrompt: function (v) {
                    const isChecklist = v.bulletStyle === "checkbox";
                    const listWord = isChecklist ? "checklist" : "bulleted list";
                    const headlineClause = v.headline
                      ? `the bold headline "${v.headline}"`
                      : "a short personal headline that fits the photo's mood (invent fitting wording)";
                    const itemsClause = v.items && v.items.length
                      ? `a ${listWord} reading: ${v.items.join("; ")}`
                      : `3-4 ${isChecklist ? "checklist items" : "bullet points"} that fit the photo's story (invent fitting wording)`;
                    return `Overlay a fake iOS Notes app screenshot sticker onto the photo — a white rounded card tilted slightly, with an orange "Notes" nav bar, ${headlineClause}, and ${itemsClause}.`;
                  },
                },
                {
                  id: "flag-banner",
                  label: "Text highlight banner",
                  fields: [
                    { key: "text", label: "Banner text", type: "paragraph", default: "But I was the total opposite…" },
                  ],
                  buildHtml: function (v, esc) {
                    return `<div class="stage dark"><div class="sticker-capture"><span class="flag-banner">${esc(v.text)}</span></div></div>`;
                  },
                  buildPrompt: function (v) {
                    const textClause = v.text
                      ? `reading "${v.text}"`
                      : "with a short, punchy line that continues or contrasts the photo's story (invent fitting wording)";
                    return `Overlay a solid-color flag/pennant-shaped text banner (a rounded pill with two small circular tag-ends) onto the photo, ${textClause}.`;
                  },
                },
                {
                  id: "reminder-dialog",
                  label: "Reminder dialog",
                  fields: [
                    { key: "title", label: "Title", type: "text", default: "Reminder" },
                    { key: "message", label: "Message", type: "paragraph", default: "I want to be confident in myself. I wanted to prove to others and myself that you can be strong and fit, even if you've always been told something else." },
                  ],
                  buildHtml: function (v, esc) {
                    return `<div class="stage"><div class="sticker-capture"><div class="alert"><div class="body"><div class="title">${esc(v.title)}</div><div class="msg">${esc(v.message)}</div></div><div class="actions"><button>Okay</button><button>Got It!</button></div></div></div></div>`;
                  },
                  buildPrompt: function (v) {
                    const titleClause = v.title
                      ? `titled "${v.title}"`
                      : 'titled "Reminder" (or a similarly short system-alert title)';
                    const msgClause = v.message
                      ? `with the message "${v.message}"`
                      : "with a short first-person reminder message that fits the photo's context (invent fitting wording)";
                    return `Overlay a fake iOS system-alert "reminder" dialog onto the photo — a rounded white popup ${titleClause} ${msgClause}, and a two-button footer reading "Okay" / "Got It!".`;
                  },
                },
                {
                  id: "floating-labels",
                  label: "Floating emoji labels",
                  fields: [
                    { key: "labels", label: "Labels (one per line, up to 4)", type: "list", default: ["I am STRONG 💪", "I am BEAUTIFUL 🌷", "I am FIT 🏃", "I am HEALTHY ⭐"] },
                  ],
                  buildHtml: function (v, esc) {
                    const labels = v.labels || [];
                    const classes = ["a", "b", "c", "d"];
                    const spans = classes.map((c, i) => `<span class="float-label ${c}">${esc(labels[i] || "")}</span>`).join("");
                    return `<div class="stage dark"><div class="sticker-capture sticker-capture--canvas"><div class="label-field">${spans}</div></div></div>`;
                  },
                  buildPrompt: function (v) {
                    const labelsClause = v.labels && v.labels.length
                      ? `reading: ${v.labels.join("; ")}`
                      : "with 4 short affirming label+emoji pairs scattered around the photo (invent fitting wording and matching emoji)";
                    return `Overlay small floating text+emoji labels scattered around the photo (drop-shadow text only, no background), ${labelsClause}.`;
                  },
                },
                {
                  id: "chat-bubble",
                  label: "Chat bubble",
                  fields: [
                    { key: "text", label: "Bubble text", type: "paragraph", default: "Here, I used to get comments about how skinny I looked all the time." },
                  ],
                  buildHtml: function (v, esc) {
                    return `<div class="stage"><div class="sticker-capture"><span class="chat-bubble">${esc(v.text)}</span></div></div>`;
                  },
                  buildPrompt: function (v) {
                    const textClause = v.text
                      ? `reading "${v.text}"`
                      : "with a short caption line that fits the photo's story (invent fitting wording)";
                    return `Overlay a white rounded message/chat-bubble text sticker (with a small speech-bubble tail at the bottom-left) onto the photo — sized to fit its text and wrapping onto multiple lines rather than stretching wide, ${textClause}.`;
                  },
                },
                {
                  id: "coding-window",
                  label: "Coding window panel",
                  fields: [
                    { key: "header", label: "Panel header", type: "text", default: "claude code flags setup" },
                    { key: "body", label: "Code / message", type: "paragraph", default: "$ claude --chrome --dangerously-skip-permissions" },
                    { key: "bg", label: "Panel background", type: "choice", choices: [{ value: "dark", label: "Black" }, { value: "light", label: "White" }], default: "dark" },
                  ],
                  buildHtml: function (v, esc) {
                    const bgClass = v.bg === "light" ? "term-light" : "term-dark";
                    return `<div class="stage"><div class="sticker-capture"><div class="term-panel ${bgClass}"><div class="term-header"><span class="term-dot term-dot--red"></span><span class="term-dot term-dot--yellow"></span><span class="term-dot term-dot--green"></span><span class="term-title">${esc(v.header)}</span></div><div class="term-body">${esc(v.body)}</div></div></div></div>`;
                  },
                  buildPrompt: function (v) {
                    const headerClause = v.header
                      ? `titled "${v.header}"`
                      : "titled with a short descriptive label that fits the photo's context (invent fitting wording)";
                    const bodyClause = v.body
                      ? `showing the code/command text: ${v.body}`
                      : "showing a short code snippet or terminal command that fits the photo's context (invent fitting content)";
                    const bgClause = v.bg === "light" ? "a white background" : "a black background";
                    return `Overlay a fake code-editor/terminal window sticker onto the photo — a rounded panel with three macOS-style traffic-light dots in the header, ${bgClause}, ${headerClause}, ${bodyClause}.`;
                  },
                },
                {
                  id: "win95-menu",
                  label: "Windows 95 right-click menu",
                  fields: [
                    { key: "rows", label: "Menu rows — one per line, --- for a divider", type: "list", default: ["Open...", "Step Backward", "Copy", "Claude Fable 5", "---", "File Info", "Print...", "---", "Exit"] },
                    { key: "selected", label: "Selected row", type: "rowChoice", from: "rows", default: 3 },
                  ],
                  buildHtml: function (v, esc) {
                    const rows = v.rows || [];
                    // White arrow with a black outline — inline SVG rather than a
                    // background image so it stays crisp at the exporter's 3x
                    // pixelRatio and rasterizes reliably into the PNG.
                    const cursor = '<svg class="w95-cursor" viewBox="0 0 15 22" xmlns="http://www.w3.org/2000/svg"><path d="M1 1v17.5l4.2-4.2 2.6 6.1 3-1.3-2.6-6h5.6z" fill="#fff" stroke="#000" stroke-width="1.4" stroke-linejoin="round"/></svg>';
                    const body = rows.map(function (label, i) {
                      if (String(label).trim() === "---") return '<div class="w95-sep"></div>';
                      const sel = i === v.selected;
                      return `<div class="w95-row${sel ? " w95-row--sel" : ""}">${esc(label)}${sel ? cursor : ""}</div>`;
                    }).join("");
                    return `<div class="stage"><div class="sticker-capture"><div class="w95-menu">${body}</div></div></div>`;
                  },
                  buildPrompt: function (v) {
                    const rows = (v.rows || []).map(function (r) { return String(r).trim(); }).filter(function (r) { return r && r !== "---"; });
                    const rowsClause = rows.length
                      ? `with the menu items: ${rows.join("; ")}`
                      : "with 6-8 short menu items that fit the photo's story (invent fitting wording)";
                    const picked = v.selected == null ? "" : String((v.rows || [])[v.selected] || "").trim();
                    const selClause = v.selected == null
                      ? ""
                      : ` ${picked ? `The row "${picked}" is` : "One of the middle rows is"} highlighted with a solid navy-blue bar and white text, as if the mouse is hovering it, with a classic white arrow cursor sitting on that row.`;
                    return `Overlay a retro Windows 95 right-click context menu onto the photo — a grey panel with a raised 3D beveled border and pixel-era UI text, ${rowsClause}.${selClause}`;
                  },
                },
                {
                  id: "collab-cursor",
                  label: "Collaborator cursor",
                  fields: [
                    { key: "text", label: "Label", type: "paragraph", default: "Strategy" },
                    { key: "color", label: "Color", type: "choice", default: "#F5A524", choices: [
                      { label: "Amber", value: "#F5A524", swatch: "#F5A524" },
                      { label: "Pink", value: "#E0219B", swatch: "#E0219B" },
                      { label: "Blue", value: "#3B9EF5", swatch: "#3B9EF5" },
                      { label: "Green", value: "#16A34A", swatch: "#16A34A" },
                      { label: "Purple", value: "#8B5CF6", swatch: "#8B5CF6" },
                      { label: "Red", value: "#EF4444", swatch: "#EF4444" },
                      { label: "Black", value: "#1C1C1E", swatch: "#1C1C1E" },
                    ] },
                    { key: "dir", label: "Arrow direction", type: "choice", default: "ul", choices: [
                      { label: "Up-left", value: "ul" },
                      { label: "Up-right", value: "ur" },
                      { label: "Down-left", value: "dl" },
                      { label: "Down-right", value: "dr" },
                    ] },
                  ],
                  buildHtml: function (v, esc) {
                    const dir = ["ul", "ur", "dl", "dr"].indexOf(v.dir) >= 0 ? v.dir : "ul";
                    const color = v.color || "#F5A524";
                    const arrow = `<svg class="cursor-arrow dir-${dir}" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg"><path d="M1.2 1.2 22.8 9.3 13.9 13.9 10.2 23.6Z" fill="${esc(color)}" stroke="#ffffff" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round" paint-order="stroke"/></svg>`;
                    const label = `<span class="cursor-label" style="background:${esc(color)}">${esc(v.text)}</span>`;
                    return `<div class="stage"><div class="sticker-capture"><div class="cursor-sticker dir-${dir}">${arrow}${label}</div></div></div>`;
                  },
                  buildPrompt: function (v) {
                    const names = { "#F5A524": "amber orange", "#E0219B": "hot pink", "#3B9EF5": "bright blue", "#16A34A": "green", "#8B5CF6": "purple", "#EF4444": "red", "#1C1C1E": "black" };
                    const color = names[v.color] || "amber orange";
                    const dirs = { ul: "up and to the left", ur: "up and to the right", dl: "down and to the left", dr: "down and to the right" };
                    const dir = dirs[v.dir] || dirs.ul;
                    const textClause = v.text
                      ? `reading "${v.text}"`
                      : "with a short role or name label that fits the photo (invent fitting wording)";
                    return `Overlay a Figma-style multiplayer collaboration cursor onto the photo — a solid ${color} mouse arrow with a thin white outline pointing ${dir}, with a matching ${color} rounded name-tag pill in white bold text tucked just beneath its tail, ${textClause}.`;
                  },
                },
              ],
            },
          },
          {
            text: "Star stickers + outlined \"Neon\" script text aren't rebuildable HTML — that's Instagram's own native sticker tray and text-style tool. Just use IG's own text tool and sticker tray for those.",
            plain: true,
          },
        ],
      },
      {
        title: "Claude Logo — Icon Preview",
        pillar: "Media Creation & Edit",
        items: [
          {
            text: "Preview Claude's logo in mono, color, and wordmark styles, then download whichever format you need. Various modes and formats for icon download are provided below.",
            plain: true,
          },
          {
            iconPreview: {
              brand: "Claude",
              basePath: "assets/icons/claude/",
              credit: "Assets via @lobehub/icons — lobehub.com/icons/claude",
              modes: [
                {
                  key: "mono",
                  label: "Mono",
                  slug: "claude",
                  previewSize: "84px",
                  markup: `<svg fill="currentColor" fill-rule="evenodd" height="1em" style="flex:none;line-height:1" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg"><title>Claude</title><path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z"></path></svg>`,
                },
                {
                  key: "color",
                  label: "Color",
                  slug: "claude-color",
                  previewSize: "84px",
                  markup: `<svg height="1em" style="flex:none;line-height:1" viewBox="0 0 24 24" width="1em" xmlns="http://www.w3.org/2000/svg"><title>Claude</title><path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" fill="#D97757" fill-rule="nonzero"></path></svg>`,
                },
                {
                  key: "text",
                  label: "Wordmark",
                  slug: "claude-text",
                  previewSize: "38px",
                  markup: `<svg fill="currentColor" fill-rule="nonzero" height="1em" style="flex:none;line-height:1" viewBox="0 0 97 24" xmlns="http://www.w3.org/2000/svg"><title>Claude</title><path d="M13.623 20.222c-3.417 0-5.753-1.901-6.855-4.827a12.992 12.992 0 01-.838-4.772c0-4.907 2.206-8.315 7.08-8.315 3.275 0 5.297 1.425 6.448 4.826h1.402l-.19-4.69C18.709 1.18 16.258.543 13.276.543c-4.2 0-7.775 1.874-9.763 5.254a11.357 11.357 0 00-1.511 5.872c0 3.753 1.777 7.08 5.113 8.926a11.95 11.95 0 005.943 1.398c3.254 0 5.835-.617 8.122-1.697l.593-5.172h-1.43c-.858 2.362-1.88 3.78-3.574 4.534-.831.373-1.88.564-3.146.564zm14.74-17.914L28.499 0h-.967L23.23 1.29v.699l1.907.882v16.142c0 1.1-.565 1.344-2.043 1.528v1.18h7.319v-1.18c-1.484-.184-2.042-.428-2.042-1.528V2.315l-.007-.007zm29.104 19.685h.565l4.95-.937v-1.208l-.695-.054c-1.157-.109-1.457-.346-1.457-1.29V9.897l.137-2.763h-.783l-4.678.672v1.181l.457.082c1.266.183 1.64.536 1.64 1.419v7.67c-1.212.937-2.369 1.527-3.744 1.527-1.525 0-2.471-.774-2.471-2.58V9.905l.136-2.763h-.804l-4.684.672v1.181l.484.082c1.266.183 1.64.536 1.64 1.418v7.08c0 3 1.703 4.426 4.412 4.426 2.07 0 3.765-1.1 5.038-2.627L57.474 22l-.007-.007zm-13.602-9.55c0-3.836-2.043-5.309-5.733-5.309-3.254 0-5.616 1.344-5.616 3.57 0 .666.238 1.175.721 1.528l2.478-.326c-.109-.746-.163-1.201-.163-1.391 0-1.263.674-1.901 2.042-1.901 2.022 0 3.044 1.419 3.044 3.7v.746l-5.106 1.527c-1.702.462-2.67.863-3.316 1.8a3.386 3.386 0 00-.476 1.9c0 2.172 1.497 3.706 4.057 3.706 1.852 0 3.493-.835 4.922-2.416.51 1.581 1.294 2.416 2.69 2.416 1.13 0 2.15-.455 3.063-1.344l-.272-.937a4.363 4.363 0 01-1.178.163c-.783 0-1.157-.617-1.157-1.826v-5.607zm-6.536 7.378c-1.396 0-2.26-.808-2.26-2.226 0-.964.456-1.528 1.43-1.854l4.139-1.31v3.965c-1.321.997-2.097 1.425-3.31 1.425zm43.095 1.235v-1.208l-.701-.054c-1.158-.109-1.45-.346-1.45-1.29V2.308L78.409 0h-.974l-4.302 1.29v.699l1.906.882V8.18a6.024 6.024 0 00-3.656-1.046c-4.276 0-7.612 3.245-7.612 8.098 0 3.998 2.397 6.761 6.346 6.761 2.042 0 3.819-.99 4.922-2.525l-.136 2.525h.571l4.95-.937zm-8.96-12.313c2.043 0 3.575 1.181 3.575 3.353v6.11a4.91 4.91 0 01-3.547 1.425c-2.928 0-4.412-2.308-4.412-5.39 0-3.462 1.695-5.498 4.385-5.498zm19.424 3.055c-.381-1.792-1.484-2.81-3.016-2.81-2.288 0-3.874 1.717-3.874 4.18 0 3.646 1.934 6.008 5.059 6.008a5.858 5.858 0 005.03-2.953l.913.245c-.408 3.163-3.281 5.525-6.808 5.525-4.14 0-6.992-3.054-6.992-7.399 0-4.378 3.098-7.46 7.237-7.46 3.09 0 5.27 1.853 5.97 5.07l-10.783 3.3V14.05l7.264-2.247v-.006z"></path></svg>`,
                },
              ],
              formats: [
                { key: "svg", label: "SVG", dir: "svg", ext: "svg" },
                { key: "png-light", label: "PNG · light", dir: "png/light", ext: "png" },
                { key: "png-dark", label: "PNG · dark", dir: "png/dark", ext: "png" },
                { key: "webp-light", label: "WebP · light", dir: "webp/light", ext: "webp" },
                { key: "webp-dark", label: "WebP · dark", dir: "webp/dark", ext: "webp" },
              ],
            },
          },
        ],
      },
      {
        title: "Segmented Progress Bar",
        pillar: "Media Creation & Edit",
        items: [
          {
            text: "A segmented progress bar / topic navigation bar for carousels — it shows readers exactly where they are in your sequence while previewing everything else the post covers. Edit the labels, pick the active section, adjust colors and sizes, then copy the SVG straight into your carousel file.",
            plain: true,
          },
          {
            progressBarBuilder: {
              title: "Segmented Progress Bar",
              defaults: {
                labels: ["Brand Design", "Photography", "Illustration", "Motion Design", "3D Modelling"],
                activeIndex: 1,
                width: 600,
                height: 60,
                barThickness: 6,
                fontSize: 11,
                accentColor: "#2B1E1A",
                trackColor: "#E2E2E2",
                bracketColor: "#CCCCCC",
                inactiveColor: "#777777",
              },
            },
          },
        ],
      },
    ],
    footer:
      "Pick 2–3 per piece of content. That's enough to sharpen thinking, improve clarity, and increase performance.",
  },

  {
    dimension: "Working with AI Agents",
    title: "Break Big Tasks Into Sequential Steps",
    subtitle:
      "Don't hand an agent one mega-task. Chunk it, pause to review, then proceed.",
    date: "2026-05-29",
    sections: [
      {
        title: "The trap",
        items: [
          { text: "A single huge task — even with lots of context — makes the agent burn time and tokens just figuring out how to break it down, often running out of credits before it delivers." },
          { text: "Sites with anti-crawl blockers quietly defeat any \"do it all at once\" attempt." },
        ],
      },
      {
        title: "Do this instead",
        items: [
          { text: "Split the work into small, sequential steps." },
          { text: "Add a checkpoint after each step — review the output and confirm before continuing." },
          { text: "End with one step that integrates all the pieces into a single result." },
        ],
      },
      {
        title: "Example — scraping 400+ URLs",
        items: [
          { text: "First, ask the agent to extract only the list of sub-section URLs (~400)." },
          { text: "Then process them in batches, pausing every 50 to verify the output is correct." },
          { text: "Once all 400 are done, ask it to merge every batch into one integrated document." },
        ],
      },
      {
        title: "Kick it off — copy this prompt",
        items: [
          {
            prompt:
              "I have a large task for you. Don't start it yet. First, brainstorm and think through how this task should be broken down into smaller, sequential sub-tasks. Give me the breakdown as a numbered plan, flag any steps that might hit blockers or should run in batches, and wait for my confirmation before you begin step one. Here's the task: [describe your task].",
          },
        ],
      },
    ],
    footer:
      "Smaller steps give the agent more context, fewer dead ends, and far less wasted time and spend.",
  },

  {
    dimension: "Systemize Your Work",
    title: "Audit, Standardize, Automate",
    subtitle:
      "Study the process first: what can be automated, what to keep manual, what to turn into an SOP.",
    date: "2026-05-30",
    sections: [
      {
        title: "1 — One-hour workflow audit",
        items: [
          {
            prompt:
              "I am a [your job]. Audit my full workflow and show me how to use Claude to finish in 1 hour what normally takes me much longer. Break it into:\n- tasks Claude can do now\n- tasks I should still do myself\n- the best order to do the work\n- the exact prompts to use at each step\n- one simple workflow I can repeat every week\nKeep it practical and specific to my field.",
          },
        ],
      },
      {
        title: "2 — Repetitive task killer",
        items: [
          {
            prompt:
              "I do these tasks again and again: [list tasks]. Turn them into a Claude system. For each task, give me:\n- the goal\n- the input I need to provide\n- the best prompt\n- the output format\n- how to check quality fast\nMake this feel like a simple playbook.",
          },
        ],
      },
      {
        title: "3 — SOP builder",
        items: [
          {
            prompt:
              "I want to turn this messy process into a clean SOP: [describe process]. Create:\n- a simple step by step SOP\n- a Claude prompt for each step\n- a quality checklist\n- common mistakes to avoid\n- a version I can hand to a teammate or assistant\nUse plain English.",
          },
        ],
      },
    ],
    footer:
      "Run them in order: audit to see the whole picture, kill the repetitive work, then lock it in as an SOP you can hand off.",
  },

  {
    dimension: "Digital Asset Generation",
    title: "Digital Asset Generation",
    subtitle:
      "Builders for generating image and video assets — pick your settings, copy the prompt.",
    date: "2026-05-31",
    sections: [
      {
        title: "Image Generation",
        tips: [
          {
            title: "Doodle Icon Sheet",
            open: true,
            items: [
              { text: "A loose, hand-drawn icon set. Choose the ink color and fill, then either use an uploaded image or describe the object yourself." },
              {
                compare: {
                  before: "assets/examples/doodle-icon-before.png",
                  after: "assets/examples/doodle-icon-after.png",
                  caption: "Original photo → hand-drawn doodle icon sheet",
                },
              },
              {
                builder: {
                  template:
                    "Minimalist hand-drawn doodle icon sticker sheet of {subject} in {color} ink line art, single color, loose imperfect hand-drawn strokes, {fill}, each icon separated with whitespace, transparent white background",
                  controls: [
                    {
                      id: "subject",
                      label: "Source",
                      choices: [
                        { label: "From uploaded image", value: "the object in the uploaded image" },
                        { label: "Describe an object", value: "{object}" },
                      ],
                    },
                    {
                      id: "object",
                      label: "Object to draw",
                      type: "input",
                      placeholder: "e.g. a coffee cup, a bicycle, a potted plant",
                      fallback: "[object]",
                      showWhen: { subject: 1 },
                    },
                    {
                      id: "color",
                      label: "Ink color",
                      choices: [
                        { label: "Black", value: "black" },
                        { label: "Blue", value: "blue" },
                        { label: "Red", value: "red" },
                        { label: "Green", value: "green" },
                        { label: "Orange", value: "orange" },
                        { label: "Purple", value: "purple" },
                      ],
                    },
                    {
                      id: "fill",
                      label: "Fill",
                      choices: [
                        { label: "Outline only", value: "no fill, outline only" },
                        { label: "Filled", value: "solid color fill" },
                      ],
                    },
                  ],
                },
              },
            ],
          },
          {
            title: "Folk Flat Illustration",
            items: [
              { text: "Turns any photo into a cute, childlike folk illustration — clean flat hand-drawn shapes with playful doodle accents, as if drawn on white paper. Upload your photo, then copy the prompt.", plain: true },
              {
                compare: {
                  before: "assets/examples/folk-flat-before.jpg",
                  after: "assets/examples/folk-flat-after.jpg",
                  caption: "Original photo → Decorative Folk Flat Illustration",
                },
              },
              "Please transform the entire image into a single Decorative Folk Flat Illustration with Doodle elements. Use a bold and playful color palette, completely different from the original image. Simplify all details into clean, flat shapes with a handmade, slightly imperfect feel, as if drawn on a sheet of white paper. The overall style should look cute, childlike, and whimsical.",
            ],
          },
          {
            title: "Handwritten Photo Notes",
            items: [
              { text: "Annotates each item in a photo with cute, handwritten white notes — flavour, texture, mood — in a relaxed Instagram-story / diary style. Upload your photo, switch the prompt to your language, then copy.", plain: true },
              {
                compare: {
                  before: "assets/examples/photo-notes-before.jpg",
                  after: "assets/examples/photo-notes-after.jpg",
                  caption: "Original photo → handwritten diary-style annotations",
                },
              },
              {
                promptI18n: {
                  defaultLang: "zh",
                  zh: "請觀察照片中的元素，並為每個物件加上有意義的手繪風註解。\n\n【畫面內容】\n請填寫照片中的物品（例：冰奶茶、甜甜圈）\n\n【描寫規則】\n・使用像白色筆畫的細手繪線條\n・一筆畫風格，隨性、略帶不均勻感\n・沿著物件外圍加上描邊輪廓\n・用箭頭或虛線做出視線引導\n\n【文字規則】\n・手寫風格字體（偏日系可愛感）\n・句子簡短，像自言自語的小碎念\n・語氣偏日記感、帶一點情緒\n\n【註解生成規則】\n・飲料 → 味道、溫度、心情（例：清爽、微甜、剛剛好）\n・食物 → 口感、好吃程度（例：鬆軟、超好吃）\n・空間 → 氛圍（例：很放鬆、喜歡這種感覺）\n・整體 → 一句總結（例：今天有點幸福～）\n\n【裝飾】\n・適度加入熱氣、閃光、愛心、小表情等元素\n・不要過多，保留一些留白\n\n【完成風格】\n・像 Instagram 限時動態、雜誌隨手筆記風\n・自然、有質感、帶點慵懶感",
                  en: "Look at the elements in the photo and add a meaningful hand-drawn-style annotation to each object.\n\n【Scene content】\nFill in the items in the photo (e.g. iced milk tea, donut)\n\n【Drawing rules】\n・Use fine hand-drawn lines that look like white pen strokes\n・One-stroke style — casual, with a slightly uneven feel\n・Trace an outline along the edge of each object\n・Use arrows or dotted lines to guide the eye\n\n【Text rules】\n・Handwritten-style font (cute, Japanese-leaning)\n・Short sentences, like little murmurs to yourself\n・A diary-like tone with a touch of emotion\n\n【Annotation rules】\n・Drinks → taste, temperature, mood (e.g. refreshing, lightly sweet, just right)\n・Food → texture and how tasty (e.g. fluffy, so good)\n・Space → atmosphere (e.g. very relaxing, love this feeling)\n・Overall → a one-line summary (e.g. feeling a little happy today~)\n\n【Decoration】\n・Add elements like steam, sparkles, hearts, and small emoji in moderation\n・Don't overdo it — leave some white space\n\n【Finished style】\n・Like an Instagram Story or a casual magazine note\n・Natural, with nice texture and a slightly laid-back feel",
                },
              },
            ],
          },
          {
            title: "Product Showcase Grid",
            items: [
              { text: "Builds a clean, minimal MUJI-style catalog grid from your own product photos. Follow the steps in order — the whole grid is generated in one shot by a multi-image model (e.g. Gemini 2.5 Flash Image / GPT-image).", plain: true },
              { text: "[Living example image to be added here later.]", plain: true },

              { heading: "Step 1 · Get clean product shots" },
              { text: "Each product should sit on a plain white or transparent background. Already have clean cutouts? Skip to Step 2. If your photos are busy or poorly lit, run this once per product to clean it up:", plain: true },
              {
                prompt:
                  "Extract the product from the uploaded photo onto a pure white background. Remove all background clutter, reflections, and distractions; apply even, neutral studio lighting. Preserve the product's exact shape, colors, materials, and details. Output a clean, centered product cutout.",
                plain: true,
              },

              { heading: "Step 2 · Generate the grid" },
              { text: "Upload all your clean product images together, then run this prompt — pick the background, columns, labels, and format:", plain: true },
              {
                builder: {
                  template:
                    "Arrange the products from the uploaded images into a clean, minimal product showcase grid on a {bg} background. Extract each product and render it centered in its own cell with soft, even studio lighting and a single subtle drop shadow beneath it. Use identical scale, lighting, shadow, and spacing across all products so the set looks consistent. Preserve each product's exact shape, colors, materials, proportions, and details — do not redesign or restyle any product. Lay them out in a {cols} grid with generous whitespace and consistent gaps. {label}{format}Minimalist editorial, MUJI-inspired e-commerce catalog aesthetic; no borders, no props, no decorative elements.",
                  controls: [
                    {
                      id: "bg",
                      label: "Background",
                      choices: [
                        { label: "Warm gray #F0EFED", value: "warm light gray (#F0EFED)" },
                        { label: "Pure white", value: "pure white (#FFFFFF)" },
                        { label: "Soft beige", value: "soft beige (#EFE9E1)" },
                        { label: "Charcoal", value: "charcoal gray (#2A2A2A)" },
                      ],
                    },
                    {
                      id: "cols",
                      label: "Columns",
                      choices: [
                        { label: "3-column", value: "3-column" },
                        { label: "2-column", value: "2-column" },
                        { label: "4-column", value: "4-column" },
                      ],
                    },
                    {
                      id: "label",
                      label: "Labels",
                      choices: [
                        { label: "With name labels", value: "Label each product with its name centered below it in clean dark-gray sans-serif type. " },
                        { label: "No labels", value: "" },
                      ],
                    },
                    {
                      id: "format",
                      label: "Format",
                      choices: [
                        { label: "Square 1:1", value: "Output in square 1:1 format. " },
                        { label: "Portrait 4:5", value: "Output in portrait 4:5 format. " },
                        { label: "Landscape 3:2", value: "Output in landscape 3:2 format. " },
                      ],
                    },
                  ],
                },
              },

              { heading: "Step 3 · Refine (optional)" },
              { text: "Drop the generated grid into Canva or Figma to fine-tune spacing, gaps, and the name labels — that's where you get pixel-perfect control.", plain: true },
            ],
          },
          {
            title: "Anthropomorphic Cartoon Characters",
            items: [
              { text: "Retro 1930s rubber-hose cartoon characters — the style where everyday objects get faces, gloves, and bendy limbs. Pick your ink and paper colors, then either use an uploaded image or list the objects yourself." },
              {
                gallery: {
                  caption: "Made with this prompt — navy ink on cream, marching, starburst sparkles.",
                  images: [
                    { src: "assets/examples/cartoon-characters-example.jpg" },
                  ],
                },
              },
              {
                builder: {
                  template:
                    "A retro 1930s rubber hose cartoon illustration of happy anthropomorphic characters {action}. {subject} Monochromatic duotone color palette using only {ink} ink on a solid {paper} background. The characters have simple, cute smiling faces, thin flexible limbs, and wear white gloves and classic cartoon shoes. Shading is done entirely with vintage halftone dot patterns. Clean composition, flat vector style, minimalistic background with {backdrop}.",
                  controls: [
                    {
                      id: "subject",
                      label: "Source",
                      choices: [
                        { label: "From uploaded image", value: "Base the characters on the objects in the uploaded image." },
                        { label: "Describe the objects", value: "The characters include {objects}." },
                      ],
                    },
                    {
                      id: "objects",
                      label: "Objects to turn into characters",
                      type: "input",
                      placeholder: "e.g. a carton of french fries, an ice cream cone, a bowl of noodles",
                      fallback: "[list your objects]",
                      showWhen: { subject: 1 },
                    },
                    {
                      id: "ink",
                      label: "Ink color",
                      choices: [
                        { label: "Navy blue", value: "dark navy blue", swatch: "#1B3A6B" },
                        { label: "Charcoal", value: "deep charcoal black", swatch: "#22201E" },
                        { label: "Brick red", value: "brick red", swatch: "#B0402F" },
                        { label: "Forest green", value: "deep forest green", swatch: "#2C5545" },
                        { label: "Purple", value: "royal purple", swatch: "#4A3A78" },
                        { label: "Burnt orange", value: "burnt orange", swatch: "#C05621" },
                      ],
                    },
                    {
                      id: "paper",
                      label: "Background color",
                      choices: [
                        { label: "Cream", value: "cream-colored", swatch: "#F4EDDD" },
                        { label: "Off-white", value: "off-white", swatch: "#FAF8F3" },
                        { label: "Warm beige", value: "warm beige", swatch: "#EDE0CC" },
                        { label: "Pale mint", value: "pale mint green", swatch: "#E2EDE4" },
                        { label: "Dusty pink", value: "dusty pink", swatch: "#F5E4E2" },
                        { label: "Pale sky", value: "pale sky blue", swatch: "#E3EAF2" },
                      ],
                    },
                    {
                      id: "action",
                      label: "What they're doing",
                      choices: [
                        { label: "Marching", value: "marching together in a row" },
                        { label: "Group pose", value: "posing together for a group portrait" },
                        { label: "Dancing", value: "dancing joyfully together" },
                        { label: "Running", value: "running excitedly together" },
                      ],
                    },
                    {
                      id: "backdrop",
                      label: "Background elements",
                      choices: [
                        { label: "Starburst sparkles", value: "a few simple starburst sparkles" },
                        { label: "Confetti dots", value: "small scattered confetti dots and circles" },
                        { label: "Motion lines", value: "a few simple speed and motion lines" },
                        { label: "Stars & swirls", value: "tiny floating stars and light swirls" },
                        { label: "Nothing", value: "no extra elements at all" },
                      ],
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
      {
        title: "Video Generation",
        items: [
          { text: "Image to Life — turn any interior, exterior, or concept image into a faithful motion shot. Treat the image as a rigid reference; keep the move simple (wide → pan, focal point → push-in); the guardrails defend against morphing and artifacts." },
          {
            builder: {
              template:
                "Source: Animate the provided image. Treat it as the exact first frame and the only visual reference — reproduce every element faithfully and add nothing that isn't already in it.\n" +
                "Action: {pace} {motion}\n" +
                "Fidelity: Strictly preserve the original lighting, textures, colors, and structural geometry of the scene. Maintain a clean, high-resolution {style} with {lighting} throughout the entire motion.\n" +
                "Guardrails: The only change across the clip is camera movement — introduce no new objects, scenery, or elements. No morphing, warping, or melting of surfaces. No structural distortion, text overlays, watermarks{people}. {focus}",
              controls: [
                {
                  id: "motion",
                  label: "Camera move",
                  choices: [
                    { label: "Pan left → right", value: "horizontal camera pan from left to right." },
                    { label: "Pan right → left", value: "horizontal camera pan from right to left." },
                    { label: "Tilt up", value: "vertical camera tilt from bottom to top." },
                    { label: "Tilt down", value: "vertical camera tilt from top to bottom." },
                    { label: "Push in", value: "forward push-in (zoom) toward the focal point." },
                    { label: "Pull out", value: "backward pull-out (zoom) revealing the wider scene." },
                    { label: "Orbit left", value: "orbital arc curving to the left around the subject." },
                    { label: "Orbit right", value: "orbital arc curving to the right around the subject." },
                  ],
                },
                {
                  id: "pace",
                  label: "Pace",
                  choices: [
                    { label: "Slow & steady", value: "Slow, steady" },
                    { label: "Smooth moderate", value: "Smooth, moderate-speed" },
                    { label: "Dynamic", value: "Dynamic, brisk" },
                  ],
                },
                {
                  id: "style",
                  label: "Showcase style",
                  choices: [
                    { label: "Architectural", value: "architectural showcase style" },
                    { label: "Cinematic reveal", value: "cinematic reveal style" },
                    { label: "Product hero", value: "product hero style" },
                  ],
                },
                {
                  id: "lighting",
                  label: "Lighting",
                  choices: [
                    { label: "Keep as-is", value: "consistent illumination" },
                    { label: "Daylight", value: "consistent natural daylight" },
                    { label: "Night & mood", value: "consistent night and mood lighting" },
                  ],
                },
                {
                  id: "people",
                  label: "People",
                  choices: [
                    { label: "Exclude", value: ", or people" },
                    { label: "Allow", value: "" },
                  ],
                },
                {
                  id: "focus",
                  label: "Focus",
                  choices: [
                    { label: "Sharp everywhere", value: "Prevent any depth-of-field blurring; maintain sharp, crisp focus across all planes throughout the movement." },
                    { label: "Cinematic depth", value: "Allow a gentle, cinematic depth of field on the focal point while keeping all surfaces stable and undistorted." },
                  ],
                },
              ],
            },
          },
        ],
      },
      {
        title: "frame.md — design system for video",
        items: [
          { text: "frame.md — your design system, ready for video.", plain: true },
          { text: "Every brand has a design.md. None of them were written for a camera. frame.md is the missing translation layer: it takes your web-context design spec and inverts it for the frame — the same tokens, the same rules, rewritten so an AI agent can compose a promo video without guessing at scale or reaching for web chrome.", plain: true },
          { text: "The output is a DESIGN.md superset your whole toolchain can read. Atoms stay sacred. Composition stays free. Numbers come from the script.", plain: true },
          { text: "Make your own: paste your design.md into the tool and it translates it into a frame.md you can browse, remix, and drop into your video toolchain.", plain: true },
          { link: { href: "https://hyperframes.dev/design", label: "Build your frame.md at hyperframes.dev/design" } },
        ],
      },
      {
        title: "Posters",
        items: [
          {
            text: "Copy-paste poster prompts that don't look like AI made them. Type your subject/context, it fills the bracket, then copy the finished prompt. Swipe through the 5 styles below.",
            plain: true,
          },
          {
            posterLibrary: {
              posters: [
                {
                  id: "bauhaus",
                  label: "Bauhaus geometric",
                  category: "Primary shapes — flat color",
                  image: "assets/examples/poster-bauhaus.jpg",
                  bestFor: "Design events, workshops, and creative studios.",
                  template: "Create a poster for {subject}. STYLE: Bauhaus geometric. Bold primary colors — red, yellow, blue — with black, built from pure geometric shapes (circles, triangles, squares). Strong diagonal composition, heavy chunky type, flat color blocks. Constructivist, confident, playful yet precise.",
                  fallback: '[a graphic design workshop, "Shape School"]',
                  tip: 'Say "flat colors, no gradients" to keep it authentically Bauhaus.',
                },
                {
                  id: "grainy-gradient",
                  label: "Grainy gradient",
                  category: "Aurora — atmospheric",
                  image: "assets/examples/poster-grainy-gradient.jpg",
                  bestFor: "Conferences, tech brands, and modern startups.",
                  template: "Create a poster for {subject}. STYLE: modern grainy gradient. A smooth aurora-style gradient (deep purple into warm coral) overlaid with fine film-grain noise, minimal clean sans-serif type, lots of soft glowing space. Sleek, atmospheric, contemporary.",
                  fallback: '[a design conference, "Signal 2026"]',
                  tip: 'Name your two gradient colors — "gradient" alone drifts into rainbow.',
                },
                {
                  id: "torn-paper",
                  label: "Torn paper collage",
                  category: "Tactile — handmade",
                  image: "assets/examples/poster-torn-paper.jpg",
                  bestFor: "Music releases, artists, and handmade brands.",
                  template: "Create a poster for {subject}. STYLE: torn-paper collage. Layered pieces of hand-torn paper with rough, fibrous edges and visible grain, overlapping to build depth and soft shadows. Muted earthy paper tones with one warm accent color. Tactile, handmade — like a physical collage photographed under soft light.",
                  fallback: '[an indie album release, "Paper Skies"]',
                  tip: '"Photographed under soft light" is what gives the layers real shadow.',
                },
                {
                  id: "japanese-editorial",
                  label: "Japanese editorial",
                  category: "Minimal — vertical type",
                  image: "assets/examples/poster-japanese-editorial.jpg",
                  bestFor: "Tea, beauty, wellness, and minimalist products.",
                  template: "Create a poster for {subject}. STYLE: Japanese editorial minimalism. Vertical type running top-to-bottom, thin hairline rules dividing the space, generous negative space on muted off-white paper. Refined, quiet, elegant. Soft ink tones, one subtle accent, careful balance and lots of breathing room.",
                  fallback: '[a premium loose-leaf tea brand, "Kumo"]',
                  tip: "Keep to one accent (often a small red seal). More color breaks the calm.",
                },
                {
                  id: "fashion-minimal",
                  label: "Fashion minimal",
                  category: "Editorial — luxury",
                  image: "assets/examples/poster-fashion-minimal.jpg",
                  bestFor: "Fashion, luxury, and high-end brands.",
                  template: "Create a poster for {subject}. STYLE: modern high-fashion editorial minimalism. One striking photo or block of color, tiny helvetica captions placed in corners, quotation marks and technical labels as design elements, lots of stark white space. Cool, understated, luxury streetwear.",
                  fallback: '[a fashion drop, "SS26"]',
                  tip: "Keep the captions tiny — the white space is the design.",
                },
              ],
            },
          },
        ],
      },
    ],
    footer:
      "From one tab: generate icons and images, bring a still to life as video, or translate your design.md into a frame.md so an agent can compose the video.",
  },
  {
    dimension: "Cowork",
    title: "Cowork",
    subtitle:
      "Cowork tasks you set up once and let run on a schedule — they draft, you review and send. Works in Claude Cowork or Microsoft Copilot.",
    date: "2026-06-09",
    sections: [
      {
        title: "Set up a Cowork task",
        items: [
          { text: "Cowork tasks are recurring jobs that run on their own and leave the results waiting for you. Every task here is built the same way — set it up once, then it works in the background on the schedule you pick.", plain: true },
          { heading: "How to set one up" },
          { text: "1 · Open Cowork — either Claude Cowork or Microsoft Copilot's Cowork — and start a new task.", plain: true },
          { text: "2 · In Claude Cowork, set the model to Claude Opus 4.7. In Microsoft Copilot, use whichever model it offers.", plain: true },
          { text: "3 · Copy a task prompt from below and paste it in. The cadence is baked into the first line of the prompt, so the schedule travels with it.", plain: true },
          { text: "4 · Save it as a scheduled / recurring task and confirm the day and time match the prompt.", plain: true },
          { text: "5 · When it runs, review what it produced before acting on it.", plain: true },
          { heading: "The golden rule" },
          { text: "These tasks draft only — they never auto-send. Everything lands in your Drafts (plus a summary email) for you to read, edit, and send yourself. Nothing leaves your outbox without you hitting Send.", plain: true },
        ],
      },
      {
        title: "Scheduled tasks",
        tips: [
          {
            title: "Monday Follow-Up Nudges",
            open: true,
            items: [
              { heading: "What it does" },
              { text: "Tracks who still owes you a reply. It scans your Sent mail for asks that went unanswered, drafts a polite nudge in your own voice for each one, and emails you a single summary so you can review and send in a couple of minutes.", plain: true },
              { heading: "At a glance" },
              { text: "Platform — Claude Cowork or Microsoft Copilot", plain: true },
              { text: "Model — Claude Opus 4.7 (in Claude Cowork)", plain: true },
              { text: "Schedule — weekly (e.g. every Monday, 7:30 AM)", plain: true },
              { text: "Deliverable — a reply draft per unanswered thread, plus one summary email", plain: true },
              { heading: "The prompt" },
              { text: "Personalize the fields, then copy. Leave [date] and [N] as-is — Cowork fills those in each run.", plain: true },
              {
                builder: {
                  template:
                    "Schedule: Run automatically every {day} at {time}.\n\n" +
                    "Role: You are my proactive follow-up assistant. Find emails I sent where I asked someone for something and never heard back, then draft polite nudges in my voice so I can review and send them with one click.\n\n" +
                    "Step 1 — Scan: Look through my Sent folder from the last {window} business days. Flag messages where I asked a question, made a request, or clearly expected a reply AND the recipient has not yet responded. Ignore newsletters, automated mail, pure FYIs, and any thread that already got a reply or was resolved.\n\n" +
                    "Step 2 — Draft: For each unanswered ask, create a reply draft in the existing thread — do NOT send it. Keep it short, warm, and professional, matching the tone of my original email. Briefly reference the original request, give a gentle nudge, and make it easy for them to respond. Sign off as {name}.\n\n" +
                    "Step 3 — Summarize: When the drafts are ready, send me one summary email to {email} with the subject \"{day} Follow-Up Nudges — [date] ([N] drafts ready to send)\". List each person I'm following up with, what the original ask was, how many days it has been waiting, and a one-line preview of the draft.\n\n" +
                    "Rules: Never send anything automatically — every follow-up stays in Drafts for me to review and send. Never invent facts, commitments, or deadlines. If there is nothing to follow up on, just send me a short note saying the inbox is clear.",
                  controls: [
                    {
                      id: "day",
                      label: "Run day",
                      choices: [
                        { label: "Monday", value: "Monday" },
                        { label: "Tuesday", value: "Tuesday" },
                        { label: "Wednesday", value: "Wednesday" },
                        { label: "Thursday", value: "Thursday" },
                        { label: "Friday", value: "Friday" },
                      ],
                    },
                    {
                      id: "time",
                      label: "Run time",
                      type: "input",
                      placeholder: "7:30 AM",
                      fallback: "7:30 AM",
                    },
                    {
                      id: "window",
                      label: "Look back (business days)",
                      type: "input",
                      placeholder: "5",
                      fallback: "5",
                    },
                    {
                      id: "name",
                      label: "Sign-off name",
                      type: "input",
                      placeholder: "Your name",
                      fallback: "[Your Name]",
                    },
                    {
                      id: "email",
                      label: "Summary email to",
                      type: "input",
                      placeholder: "you@email.com",
                      fallback: "[your email]",
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    ],
    footer:
      "One tab for set-and-forget Cowork tasks — in Claude Cowork or Microsoft Copilot. They draft on a schedule; you stay the one who hits Send.",
  },

  {
    dimension: "Investment",
    title: "The Holy Grail of Investing",
    subtitle:
      "Aim for ~15 good, uncorrelated, risk-balanced bets — then engineer the risk. Educational notes, not financial advice.",
    date: "2026-06-15",
    sections: [
      {
        title: "The principle — 15 uncorrelated bets",
        items: [
          { text: "Hold a diversified portfolio of only your most confident, uncorrelated bets and engineer it to the risk level you want. That beats a concentrated bet on a return-to-risk basis — and you can lever it up for higher returns at the same risk. This isn't an opinion; it's a mathematical certainty.", plain: true },
          { text: "The more risk is concentrated in one area of the market, the more you should diversify — especially when the market is driven by a revolutionary new technology, which inherently produces great uncertainty.", plain: true },
          { heading: "The math" },
          { text: "One bet generally assumed for equities: ~6% return with an 18% standard deviation — a 0.3 return-to-risk ratio. Keep the same 6% return but spread it across 5, 10, or 15 good uncorrelated bets and the risk falls to roughly 8%, 6%, and 5% standard deviation. With 15, the ratio climbs from 0.3 to ~1.29 — about a 4.3x improvement in return for the risk taken.", plain: true },
          { heading: "Diversification calculator" },
          { text: "Pick a number of good, uncorrelated bets and see what happens to the same 6% expected return. Then copy the line.", plain: true },
          {
            builder: {
              template: "With {scenario}",
              controls: [
                {
                  id: "scenario",
                  label: "Number of uncorrelated bets",
                  choices: [
                    { label: "1 bet", value: "1 bet at a 0.3 return-to-risk ratio (6% expected return, 18% standard deviation), you carry the full 18% of risk for that 6% return." },
                    { label: "5 bets", value: "5 good uncorrelated bets, the same 6% expected return comes with only ~8% standard deviation — a ~0.75 return-to-risk ratio, more than double a single bet." },
                    { label: "10 bets", value: "10 good uncorrelated bets, the same 6% expected return comes with only ~6% standard deviation — a ~1.0 return-to-risk ratio." },
                    { label: "15 bets", value: "15 good uncorrelated bets, the same 6% expected return comes with only ~5% standard deviation — a ~1.29 return-to-risk ratio, a 4.3x improvement over a single bet (which you can then lever up for higher returns at the same risk)." },
                  ],
                },
              ],
            },
          },
        ],
      },
      {
        title: "The five big forces",
        items: [
          { text: "Big uncertainties tend to come from a handful of big drivers. Plug these circumstances into your investment system when you decide how to place your bets — while you do your own thinking about what to bet on.", plain: true },
          { text: "1 · Debt and money — what's happening with credit, currencies, and the value of money.", plain: true },
          { text: "2 · Politics and social issues — what can drive taxes and other politically-driven influences on markets.", plain: true },
          { text: "3 · Geopolitics — conflicts and wars and their influence on markets.", plain: true },
          { text: "4 · Acts of nature — droughts, floods, pandemics, and other shocks.", plain: true },
          { text: "5 · New technologies — what's being created and disrupted.", plain: true },
        ],
      },
      {
        title: "Applying it today",
        items: [
          { text: "Given these forces, the most important question is how to place your bets relative to the broad index (e.g. the S&P 500). You have three choices: (a) overweight the new technology — bet on the sector or a few of its best companies more than the index does; (b) keep your exposures at about index weights; or (c) diversify away from that concentration.", plain: true },
          { text: "Knowing what you don't know — and deciding when not to bet — is as important as knowing what you do know. It's generally too hard to justify concentrated bets, so hold a diversified portfolio of only your most confident uncorrelated bets and engineer it to the risk level you want. That is the holy grail.", plain: true },
          { text: "Right now, no one knows this technology-driven market well enough to place a big, concentrated bet. Avoiding concentration and staying diversified is the best way to deal with that not-knowing — even if it runs contrary to the textbook view that markets are efficient so you should just trust the market.", plain: true },
          { text: "Don't confuse excitement about a new technology with the attractiveness of its stocks. An unusually concentrated market centered on a revolutionary technology tempts people to throw caution to the wind and pile into high-risk, high-correlation bets — when you can get equally attractive returns with much less risk through smart diversification.", plain: true },
          { heading: "Pressure-test your own portfolio" },
          { text: "Take a screenshot of your current holdings (positions and rough weights) and upload or paste it with the prompt below, so the analysis is grounded in what you actually own.", plain: true },
          {
            prompt:
              "I've attached a screenshot of my current investment portfolio. Read my holdings and approximate weights from it, then analyze it through the lens of diversification and risk balancing. Specifically:\n1. Estimate how concentrated I am — by position, sector, and underlying theme (e.g. a single new technology) — and roughly how correlated my biggest holdings are with each other.\n2. Map my exposure to the five big forces: debt & money, politics/taxes, geopolitics, acts of nature, and new technologies. Flag where I'm unknowingly making one big, correlated bet.\n3. Tell me my approximate return-to-risk profile and compare it to a more diversified set of uncorrelated bets.\n4. Suggest concrete ways to move toward ~15 good, uncorrelated, risk-balanced bets engineered to a [conservative / moderate / aggressive] risk level — including what to trim, what kinds of uncorrelated exposures I'm missing, and how I'd think about levering to a target risk.\nBe specific and show your reasoning. Treat this as educational analysis, not personalized financial advice, and note the key assumptions and uncertainties.",
          },
        ],
      },
      {
        title: "Eight investor personas — analyze any ticker",
        items: [
          { text: "Eight legendary investors, each as a copyable master prompt that runs their documented method on a stock you choose. Type a ticker once below, then swipe the cards and copy the persona you want. Each prompt ends with a 0–100 score, a BUY / WATCH / PASS verdict, and a position-sizing note in that investor's own style.", plain: true },
          {
            deck: {
              ticker: { label: "Ticker to analyze", placeholder: "e.g. NVDA", fallback: "[TICKER]" },
              cards: [
                {
                  name: "Warren Buffett",
                  image: "assets/personas/buffett.jpg",
                  initials: "WB",
                  camp: "quality",
                  tag: "Wonderful business at a fair price, held forever.",
                  voice: "Owner's assessment",
                  prompt:
                    "You are Warren Buffett analyzing {TICKER} as a business you might own forever. Work only from your documented method.\n\nPhilosophy: buy wonderful businesses at fair prices and hold for the long term. Think like an owner, not a trader — price is what you pay, value is what you get.\n\nRun these filters:\n1. Circle of competence — can you genuinely understand how this business makes money? If not, say so and stop.\n2. Durable moat — brand, switching costs, network effects, low-cost production, or regulatory edge that protects pricing power for a decade-plus.\n3. Economics — high and stable return on equity/invested capital (your rough heuristic: sustained returns around 15%+ without heavy leverage), strong owner earnings (net income + depreciation/amortization − maintenance capex), durable margins, low debt.\n4. Management — candid, rational capital allocators who think like owners.\n5. Price — estimate intrinsic value from owner earnings discounted conservatively, and demand a margin of safety. A great business at a silly price is still a pass.\n\nUse available financial data and tools. If a figure (e.g. maintenance capex) isn't disclosed, say so, approximate transparently, and never fabricate numbers.\n\nWrite in your voice: a plain-spoken owner's assessment, an analogy or two, focused on the next ten years rather than the next quarter.\n\nBefore your verdict, also output a standardized snapshot of these eight historical datapoints for {TICKER}. Cover the last three financial years. For any factor that is a time series (e.g. ROE, year-on-year growth, payout ratio, cashflow), show all three years so the trend is visible; for the current year that has no full financial year reported yet, use the most complete period available — latest quarter, first half (1H), or three quarters (9M), whichever exists — and label which period it is. For point-in-time measures (e.g. current dividend yield, price-to-book, Shariah-compliance status) give the latest value. Put each factor on its own line in the form 'Factor — value(s) with the year/period — one-line read'. Use available data and tools; if a datapoint can't be found, write 'not available' rather than fabricating it:\n1. ROE Consistency — how steady return on equity has been over multiple years.\n2. Year-on-Year Growth — revenue or profit growth versus the same quarter last year.\n3. Strong Money Flow In — net institutional and smart-money buying pressure.\n4. Dividend Yield — annual dividend per share divided by current price.\n5. Dividend Payout Ratio — share of earnings paid out as dividends.\n6. Price-to-Book Ratio — market price versus book value per share.\n7. Shariah Compliant — whether the stock is on the Shariah-compliant list.\n8. Cashflow — quality and stability of operating cash flow.\n\nEnd with: a 0–100 quality-and-value score, a BUY / WATCH / PASS verdict, and a position-sizing note in your style (concentrate in high-conviction, understandable bets; if it's outside your circle or richly priced, size it to zero). Note key assumptions. This is educational analysis, not investment advice.",
                },
                {
                  name: "Charlie Munger",
                  image: "assets/personas/munger.jpg",
                  initials: "CM",
                  camp: "quality",
                  tag: "Four Filters, then invert to find the ways to lose.",
                  voice: "Four filters + inversion",
                  prompt:
                    "You are Charlie Munger evaluating {TICKER}. Be terse, rational, and intolerant of nonsense.\n\nApply your Four Filters in order, and stop at the first hard fail:\n1. Is it a business I can understand?\n2. Does it have a durable competitive advantage?\n3. Is management able and trustworthy?\n4. Is the price sensible, with a margin of safety?\n\nThen invert: instead of asking how this succeeds, ask 'how would I lose money owning this?' — list the ways it could go permanently wrong (obsolescence, leverage, fraud, fad, regulation, overpayment) and judge whether the moat survives them. Use mental models from multiple disciplines and call out psychological misjudgment in the market's view (incentives, social proof, FOMO).\n\nHonesty guardrail: I use no fixed numeric screen — do not invent precise cutoffs and attribute them to me. Reason qualitatively from business quality and price.\n\nUse available data and tools; flag anything missing rather than guessing.\n\nVoice: blunt, witty, a little worldly wisdom, quick to drop something on the 'too hard' pile and move on.\n\nBefore your verdict, also output a standardized snapshot of these eight historical datapoints for {TICKER}. Cover the last three financial years. For any factor that is a time series (e.g. ROE, year-on-year growth, payout ratio, cashflow), show all three years so the trend is visible; for the current year that has no full financial year reported yet, use the most complete period available — latest quarter, first half (1H), or three quarters (9M), whichever exists — and label which period it is. For point-in-time measures (e.g. current dividend yield, price-to-book, Shariah-compliance status) give the latest value. Put each factor on its own line in the form 'Factor — value(s) with the year/period — one-line read'. Use available data and tools; if a datapoint can't be found, write 'not available' rather than fabricating it:\n1. ROE Consistency — how steady return on equity has been over multiple years.\n2. Year-on-Year Growth — revenue or profit growth versus the same quarter last year.\n3. Strong Money Flow In — net institutional and smart-money buying pressure.\n4. Dividend Yield — annual dividend per share divided by current price.\n5. Dividend Payout Ratio — share of earnings paid out as dividends.\n6. Price-to-Book Ratio — market price versus book value per share.\n7. Shariah Compliant — whether the stock is on the Shariah-compliant list.\n8. Cashflow — quality and stability of operating cash flow.\n\nEnd with: a 0–100 score, a BUY / WATCH / PASS verdict, and a sizing note in your style (a handful of great businesses held a long time; the 'too hard' pile is large and that's fine). Educational analysis, not investment advice.",
                },
                {
                  name: "Philip Fisher",
                  image: "assets/personas/fisher.jpg",
                  initials: "PF",
                  camp: "quality",
                  tag: "Fifteen Points and scuttlebutt on a growth compounder.",
                  voice: "15-point research report",
                  prompt:
                    "You are Philip Fisher researching {TICKER} as a long-term growth holding, using your 'Fifteen Points' and the scuttlebutt method.\n\nAssess the company against your fifteen points, grouped: (a) Products & market — a long runway of sales growth, a real R&D pipeline, and new products beyond the current line? (b) People & management — sales organization, labor and executive relations, management depth, integrity, and willingness to talk candidly even in bad times? (c) Economics — worthwhile and defensible profit margins, genuine cost controls, and growth funded without excessive dilution? (d) Long-term orientation — durable advantage prized over short-term earnings?\n\nApply scuttlebutt: state what you'd want to learn from customers, suppliers, competitors, and former employees, and reason about it from available evidence. Use data and tools where you can; where a point can't be verified, say so explicitly rather than inventing it.\n\nVoice: a thorough qualitative research report, point by point, prizing management quality and growth runway over a cheap price.\n\nBefore your verdict, also output a standardized snapshot of these eight historical datapoints for {TICKER}. Cover the last three financial years. For any factor that is a time series (e.g. ROE, year-on-year growth, payout ratio, cashflow), show all three years so the trend is visible; for the current year that has no full financial year reported yet, use the most complete period available — latest quarter, first half (1H), or three quarters (9M), whichever exists — and label which period it is. For point-in-time measures (e.g. current dividend yield, price-to-book, Shariah-compliance status) give the latest value. Put each factor on its own line in the form 'Factor — value(s) with the year/period — one-line read'. Use available data and tools; if a datapoint can't be found, write 'not available' rather than fabricating it:\n1. ROE Consistency — how steady return on equity has been over multiple years.\n2. Year-on-Year Growth — revenue or profit growth versus the same quarter last year.\n3. Strong Money Flow In — net institutional and smart-money buying pressure.\n4. Dividend Yield — annual dividend per share divided by current price.\n5. Dividend Payout Ratio — share of earnings paid out as dividends.\n6. Price-to-Book Ratio — market price versus book value per share.\n7. Shariah Compliant — whether the stock is on the Shariah-compliant list.\n8. Cashflow — quality and stability of operating cash flow.\n\nEnd with: a 0–100 score, a BUY / WATCH / PASS verdict, and a sizing note in your style (concentrate in a few outstanding growth companies understood deeply; hold for years). Educational analysis, not investment advice.",
                },
                {
                  name: "Peter Lynch",
                  image: "assets/personas/lynch.jpg",
                  initials: "PL",
                  camp: "growth",
                  tag: "The two-minute story, priced by PEG.",
                  voice: "Two-minute story",
                  prompt:
                    "You are Peter Lynch sizing up {TICKER}. Start with the two-minute drill: in plain language, tell the story of why you'd own this — what the company does, why earnings will grow, and what has to happen for the thesis to work.\n\nClassify it into one of your categories — slow grower, stalwart, fast grower, cyclical, turnaround, or asset play — because the category sets the expectations.\n\nUse your documented yardsticks:\n- PEG (P/E divided by earnings growth rate): around 1.0 is fairly priced, well below 1.0 is cheap for the growth, well above is expensive.\n- Prefer understandable businesses with sustainable earnings growth (your sweet spot for fast growers is roughly 20–25% — fast enough to compound, not so fast it's unsustainable).\n- Check the balance sheet (manageable debt), inventories versus sales, and insider buying.\n\nHonesty guardrail: the so-called Lynch 'fair value' formula and the 'Rule of 20' are popularized folklore, not your fixed rules — if you reference them, label them as rough heuristics, and don't present invented thresholds as mine.\n\nUse available data and tools; if growth rates or balance-sheet items are missing, flag it and don't fabricate.\n\nVoice: folksy, story-first, 'invest in what you understand,' wary of hot stocks with no earnings.\n\nBefore your verdict, also output a standardized snapshot of these eight historical datapoints for {TICKER}. Cover the last three financial years. For any factor that is a time series (e.g. ROE, year-on-year growth, payout ratio, cashflow), show all three years so the trend is visible; for the current year that has no full financial year reported yet, use the most complete period available — latest quarter, first half (1H), or three quarters (9M), whichever exists — and label which period it is. For point-in-time measures (e.g. current dividend yield, price-to-book, Shariah-compliance status) give the latest value. Put each factor on its own line in the form 'Factor — value(s) with the year/period — one-line read'. Use available data and tools; if a datapoint can't be found, write 'not available' rather than fabricating it:\n1. ROE Consistency — how steady return on equity has been over multiple years.\n2. Year-on-Year Growth — revenue or profit growth versus the same quarter last year.\n3. Strong Money Flow In — net institutional and smart-money buying pressure.\n4. Dividend Yield — annual dividend per share divided by current price.\n5. Dividend Payout Ratio — share of earnings paid out as dividends.\n6. Price-to-Book Ratio — market price versus book value per share.\n7. Shariah Compliant — whether the stock is on the Shariah-compliant list.\n8. Cashflow — quality and stability of operating cash flow.\n\nEnd with: a 0–100 score, a BUY / WATCH / PASS verdict, and a sizing note in your style (spread across many names, add to the winners while the story stays intact). Educational analysis, not investment advice.",
                },
                {
                  name: "Richard Driehaus",
                  image: "assets/personas/driehaus.jpg",
                  initials: "RD",
                  camp: "growth",
                  tag: "Buy high, sell higher — momentum with a catalyst.",
                  voice: "Momentum trade card",
                  prompt:
                    "You are Richard Driehaus, father of momentum investing, evaluating {TICKER} as a growth-momentum trade — buy high, sell higher; strength tends to persist.\n\nLook for your documented signals:\n- Accelerating earnings — quarterly EPS growth that is strong and speeding up, not merely high.\n- Positive earnings surprises — recent beats versus estimates (roughly 5–10%+), ideally a pattern of them, with upward analyst revisions.\n- Relative strength — outperforming the market and its peers, near new highs rather than bottom-fishing.\n- Typically smaller, faster-growing companies (you made your name in roughly the $50M–$3B market-cap range) with a clear catalyst.\n\nHonesty guardrail: the 'Driehaus screen' sold by some retail screening sites is not an official rule of mine — treat those exact criteria as approximations, not a canonical formula.\n\nMomentum cuts both ways: state the sell discipline — when the trend or earnings momentum breaks, you cut losses fast.\n\nUse available price and earnings data and tools; if surprise history or relative strength can't be computed, say so rather than guessing.\n\nVoice: a fast, decisive momentum trade card — catalyst, trend, where the strength is, and where you'd cut.\n\nBefore your verdict, also output a standardized snapshot of these eight historical datapoints for {TICKER}. Cover the last three financial years. For any factor that is a time series (e.g. ROE, year-on-year growth, payout ratio, cashflow), show all three years so the trend is visible; for the current year that has no full financial year reported yet, use the most complete period available — latest quarter, first half (1H), or three quarters (9M), whichever exists — and label which period it is. For point-in-time measures (e.g. current dividend yield, price-to-book, Shariah-compliance status) give the latest value. Put each factor on its own line in the form 'Factor — value(s) with the year/period — one-line read'. Use available data and tools; if a datapoint can't be found, write 'not available' rather than fabricating it:\n1. ROE Consistency — how steady return on equity has been over multiple years.\n2. Year-on-Year Growth — revenue or profit growth versus the same quarter last year.\n3. Strong Money Flow In — net institutional and smart-money buying pressure.\n4. Dividend Yield — annual dividend per share divided by current price.\n5. Dividend Payout Ratio — share of earnings paid out as dividends.\n6. Price-to-Book Ratio — market price versus book value per share.\n7. Shariah Compliant — whether the stock is on the Shariah-compliant list.\n8. Cashflow — quality and stability of operating cash flow.\n\nEnd with: a 0–100 momentum score, a BUY / WATCH / PASS verdict, and a sizing note in your style (concentrated in what's working, high turnover, tight stops). Educational analysis, not investment advice.",
                },
                {
                  name: "Cathie Wood",
                  image: "assets/personas/wood.jpg",
                  initials: "CW",
                  camp: "growth",
                  tag: "Disruptive innovation on a five-year view.",
                  voice: "Innovation / TAM thesis",
                  prompt:
                    "You are Cathie Wood of ARK Invest evaluating {TICKER} through the lens of disruptive innovation.\n\nApply your documented framework:\n- Is the company exposed to one of the major innovation platforms — artificial intelligence, robotics, energy storage, genomic sequencing, or blockchain/fintech?\n- Wright's Law / cost-decline curves — are unit costs falling at a steep, predictable rate that expands the addressable market?\n- Five-year forward view — ARK's bar is roughly a 15%+ annualized return (CAGR) over five years to justify a position; build a TAM-driven model of where revenue and the market could be in five years.\n- Conviction over current profitability — you'll tolerate today's losses and volatility if the long-term exponential trajectory is intact.\n\nBe explicit that this is a high-uncertainty, long-duration thesis; give a bull, base, and bear path. Use available data and tools; where you must assume growth or cost curves, state the assumption clearly and don't disguise estimates as facts.\n\nVoice: a forward-looking innovation thesis — bold, TAM- and technology-driven, focused on five years out, not this quarter.\n\nBefore your verdict, also output a standardized snapshot of these eight historical datapoints for {TICKER}. Cover the last three financial years. For any factor that is a time series (e.g. ROE, year-on-year growth, payout ratio, cashflow), show all three years so the trend is visible; for the current year that has no full financial year reported yet, use the most complete period available — latest quarter, first half (1H), or three quarters (9M), whichever exists — and label which period it is. For point-in-time measures (e.g. current dividend yield, price-to-book, Shariah-compliance status) give the latest value. Put each factor on its own line in the form 'Factor — value(s) with the year/period — one-line read'. Use available data and tools; if a datapoint can't be found, write 'not available' rather than fabricating it:\n1. ROE Consistency — how steady return on equity has been over multiple years.\n2. Year-on-Year Growth — revenue or profit growth versus the same quarter last year.\n3. Strong Money Flow In — net institutional and smart-money buying pressure.\n4. Dividend Yield — annual dividend per share divided by current price.\n5. Dividend Payout Ratio — share of earnings paid out as dividends.\n6. Price-to-Book Ratio — market price versus book value per share.\n7. Shariah Compliant — whether the stock is on the Shariah-compliant list.\n8. Cashflow — quality and stability of operating cash flow.\n\nEnd with: a 0–100 innovation-conviction score, a BUY / WATCH / PASS verdict, and a sizing note in your style (high-conviction concentrated bets across the innovation platforms, added to on weakness). Educational analysis, not investment advice.",
                },
                {
                  name: "Howard Marks",
                  image: "assets/personas/marks.jpg",
                  initials: "HM",
                  camp: "contrarian",
                  tag: "Second-level thinking and where we are in the cycle.",
                  voice: "Risk memo",
                  prompt:
                    "You are Howard Marks writing a memo on {TICKER}. Lead with second-level thinking: not 'is this a good company?' but 'is this priced for more or less than the consensus already believes, and what's the asymmetry?'\n\nAssess:\n- Where are we in the cycle? Read investor psychology and the market's mood — is risk being shunned (cheap, fearful) or eagerly embraced (expensive, complacent)? You can't predict, but you can know where we stand.\n- Price versus value — is there a margin of safety, or is optimism already fully priced in?\n- Risk first — the probability of permanent loss, the downside scenarios, and what the market is overlooking. Remember: being too far ahead of your time is indistinguishable from being wrong.\n\nHonesty guardrail: I use no fixed numeric screen — do not fabricate precise thresholds and attribute them to me. Reason about price relative to value and about where sentiment sits in the cycle.\n\nUse available data and tools; flag what's unknown and treat uncertainty honestly.\n\nVoice: a measured, reflective risk memo — probabilistic, contrarian, focused on what can go wrong and on what the crowd is mispricing.\n\nBefore your verdict, also output a standardized snapshot of these eight historical datapoints for {TICKER}. Cover the last three financial years. For any factor that is a time series (e.g. ROE, year-on-year growth, payout ratio, cashflow), show all three years so the trend is visible; for the current year that has no full financial year reported yet, use the most complete period available — latest quarter, first half (1H), or three quarters (9M), whichever exists — and label which period it is. For point-in-time measures (e.g. current dividend yield, price-to-book, Shariah-compliance status) give the latest value. Put each factor on its own line in the form 'Factor — value(s) with the year/period — one-line read'. Use available data and tools; if a datapoint can't be found, write 'not available' rather than fabricating it:\n1. ROE Consistency — how steady return on equity has been over multiple years.\n2. Year-on-Year Growth — revenue or profit growth versus the same quarter last year.\n3. Strong Money Flow In — net institutional and smart-money buying pressure.\n4. Dividend Yield — annual dividend per share divided by current price.\n5. Dividend Payout Ratio — share of earnings paid out as dividends.\n6. Price-to-Book Ratio — market price versus book value per share.\n7. Shariah Compliant — whether the stock is on the Shariah-compliant list.\n8. Cashflow — quality and stability of operating cash flow.\n\nEnd with: a 0–100 risk-adjusted attractiveness score, a BUY / WATCH / PASS verdict, and a sizing note in your style (lean in when others are fearful and the price offers asymmetry; pull back when risk is being eagerly borne). Educational analysis, not investment advice.",
                },
                {
                  name: "John Templeton",
                  image: "assets/personas/templeton.jpg",
                  initials: "JT",
                  camp: "contrarian",
                  tag: "Buy at the point of maximum pessimism.",
                  voice: "Bargain memo",
                  prompt:
                    "You are Sir John Templeton hunting for a bargain in {TICKER}, guided by your maxim: buy at the point of maximum pessimism.\n\nAssess:\n- Sentiment — is this company, sector, or country deeply out of favor, feared, or ignored? The best bargains appear when the news is worst.\n- Cheapness on fundamentals — a low price relative to book value, earnings, and long-term normalized earning power; you want to pay far less than a conservative estimate of worth.\n- Survivability — quality of the underlying business and balance-sheet strength to live through the bad patch, so this is a bargain and not a value trap.\n- A global, contrarian view — you'll look wherever others won't, including unloved markets.\n\nHonesty guardrail: I followed disciplined cheapness, not a single published numeric formula — don't invent exact ratios and present them as my fixed rule; reason from how depressed the price is versus conservative value.\n\nUse available data and tools; where normalized earnings or book value must be estimated, say so and don't fabricate.\n\nVoice: a calm, optimistic-contrarian bargain memo — patient, valuation-driven, willing to be lonely and early.\n\nBefore your verdict, also output a standardized snapshot of these eight historical datapoints for {TICKER}. Cover the last three financial years. For any factor that is a time series (e.g. ROE, year-on-year growth, payout ratio, cashflow), show all three years so the trend is visible; for the current year that has no full financial year reported yet, use the most complete period available — latest quarter, first half (1H), or three quarters (9M), whichever exists — and label which period it is. For point-in-time measures (e.g. current dividend yield, price-to-book, Shariah-compliance status) give the latest value. Put each factor on its own line in the form 'Factor — value(s) with the year/period — one-line read'. Use available data and tools; if a datapoint can't be found, write 'not available' rather than fabricating it:\n1. ROE Consistency — how steady return on equity has been over multiple years.\n2. Year-on-Year Growth — revenue or profit growth versus the same quarter last year.\n3. Strong Money Flow In — net institutional and smart-money buying pressure.\n4. Dividend Yield — annual dividend per share divided by current price.\n5. Dividend Payout Ratio — share of earnings paid out as dividends.\n6. Price-to-Book Ratio — market price versus book value per share.\n7. Shariah Compliant — whether the stock is on the Shariah-compliant list.\n8. Cashflow — quality and stability of operating cash flow.\n\nEnd with: a 0–100 bargain score, a BUY / WATCH / PASS verdict, and a sizing note in your style (diversified across many cheap, hated bargains worldwide; patient holding until value is recognized). Educational analysis, not investment advice.",
                },
              ],
            },
          },
        ],
      },
    ],
    footer:
      "Diversify your most confident uncorrelated bets and engineer the risk — don't let excitement about a new technology turn into one big concentrated bet. Educational notes only, not financial advice.",
  },

  {
    "dimension": "Claude Setup & Skills",
    "title": "Claude Setup & Skills",
    "subtitle": "Upgrade Claude like apps on your phone. Three kinds of add-on — plug-ins, skills, and MCP connectors — plus a filterable catalog to install. You don't need all of them: start with 3, add one a week.",
    "date": "2026-06-27",
    "sections": [
      {
        "title": "First, the 3 building blocks",
        "items": [
          {
            "text": "Almost everything you install is one of three kinds. Get these down and the rest follows.",
            "plain": true
          },
          {
            "heading": "Plug-in — a whole crew in one install"
          },
          {
            "text": "One command adds a bundle of related tools at once (a whole dev team, or a whole marketing team) instead of adding them one by one. Everyday analogy: ordering the full meal-deal instead of picking every item off the menu.",
            "plain": true
          },
          {
            "heading": "Skill — a single shortcut"
          },
          {
            "text": "One short instruction file that teaches Claude a workflow you'd otherwise retype every time. Install once, trigger with a quick command. Everyday analogy: a saved recipe card — you just say “make that one.”",
            "plain": true
          },
          {
            "heading": "MCP server — a connector"
          },
          {
            "text": "Model Context Protocol: the bridge that plugs Claude into your real apps and data (Notion, Slack, your calendar) so it can read and do things in them, live. Everyday analogy: the charging cable between two devices that lets them pass things back and forth.",
            "plain": true
          },
          {
            "text": "Rule of thumb: plug-in = a team, skill = a shortcut, MCP = a wire to your apps.",
            "plain": true
          }
        ]
      },
      {
        "title": "How to install each type",
        "items": [
          {
            "heading": "Install a plug-in"
          },
          {
            "text": "Add its marketplace (the shelf it lives on), then install it:",
            "plain": true
          },
          {
            "prompt": "/plugin marketplace add <github-owner/repo>\n/plugin install <plugin-name>@<marketplace-name>",
            "plain": true
          },
          {
            "heading": "Install a skill"
          },
          {
            "text": "Easiest: open a chat in Claude and paste the GitHub link, and it sets itself up. (Or in the web/desktop app: Settings → Skills → Upload.)",
            "plain": true
          },
          {
            "prompt": "Please install this Claude skill for me. The SKILL.md file is in this GitHub repo: <repo link>",
            "plain": true
          },
          {
            "heading": "Install an MCP server"
          },
          {
            "text": "Friendliest: in the Claude app, click your profile → Settings → Connectors → Browse connectors, and connect one (Notion, Slack, and more are one-click). Power-user way, in Claude Code:",
            "plain": true
          },
          {
            "prompt": "claude mcp add --transport http <name> <server-url>",
            "plain": true
          }
        ]
      },
      {
        "title": "Browse & install",
        "items": [
          {
            "text": "All the add-ons in one place. Filter by type (plug-in, skill, MCP) or by domain, then copy the install command. Cards marked ★ are the beginner picks.",
            "plain": true
          },
          {
            "catalog": {
              "filters": true,
              "items": [
                {
                  "name": "marketingskills",
                  "type": "plugin",
                  "domain": "Marketing & Content",
                  "tag": "Marketing team",
                  "desc": "A pack of marketing skills (CRO, copywriting, SEO, analytics, ads, social, growth) — the closest thing to a full growth team inside Claude.",
                  "install": [
                    "/plugin marketplace add coreyhaines31/marketingskills",
                    "/plugin install marketing-skills"
                  ],
                  "repo": "https://github.com/coreyhaines31/marketingskills",
                  "star": true
                },
                {
                  "name": "social-media-skills",
                  "type": "plugin",
                  "domain": "Marketing & Content",
                  "tag": "Content engine",
                  "desc": "Writes posts, threads, carousels, and captions across LinkedIn, X, Instagram, and more — in your voice.",
                  "install": [
                    "/plugin marketplace add charlie947/social-media-skills",
                    "/plugin install social-media-skills"
                  ],
                  "repo": "https://github.com/charlie947/social-media-skills"
                },
                {
                  "name": "gstack",
                  "type": "plugin",
                  "domain": "Development",
                  "tag": "Dev crew",
                  "desc": "Garry Tan's exact setup — 23 opinionated tools acting as CEO, Designer, Eng Manager, Release Manager, QA, and more.",
                  "install": "git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup",
                  "repo": "https://github.com/garrytan/gstack"
                },
                {
                  "name": "superpowers",
                  "type": "plugin",
                  "domain": "Development",
                  "tag": "Build method",
                  "desc": "A complete development method with composable skills, by obra — a structured, repeatable way for Claude to plan and build.",
                  "install": [
                    "/plugin marketplace add obra/superpowers-marketplace",
                    "/plugin install superpowers@superpowers-marketplace"
                  ],
                  "repo": "https://github.com/obra/superpowers-marketplace"
                },
                {
                  "name": "codex (codex-plugin-cc)",
                  "type": "plugin",
                  "domain": "Development",
                  "tag": "Second AI brain",
                  "desc": "OpenAI's official plug-in to run their Codex model inside Claude Code — a second brain for code review and delegating tasks.",
                  "install": [
                    "/plugin marketplace add openai/codex-plugin-cc",
                    "/plugin install codex@openai-codex"
                  ],
                  "repo": "https://github.com/openai/codex-plugin-cc",
                  "note": "Then run /reload-plugins and /codex:setup. Needs Node.js 18.18+ and a ChatGPT login or OpenAI key."
                },
                {
                  "name": "financial-services",
                  "type": "plugin",
                  "domain": "Industry",
                  "tag": "Finance",
                  "desc": "A pack of finance workflows — investment banking, equity research, wealth management.",
                  "install": [
                    "/plugin marketplace add <owner/repo>",
                    "/plugin install financial-services"
                  ],
                  "note": "Couldn't confirm the exact source — open /plugin in Claude Code and install it from the official directory."
                },
                {
                  "name": "claude-for-legal",
                  "type": "plugin",
                  "domain": "Industry",
                  "tag": "Legal",
                  "desc": "Legal workflows covering common practice areas, so Claude is useful for legal work out of the box.",
                  "install": [
                    "/plugin marketplace add <owner/repo>",
                    "/plugin install claude-for-legal"
                  ],
                  "note": "Couldn't confirm the exact source — find the current marketplace in Claude Code's /plugin directory first."
                },
                {
                  "name": "claude-skills",
                  "type": "plugin",
                  "domain": "Development",
                  "tag": "Skill library",
                  "desc": "A big community pack of ready-made skills installed in one go — pick what you use.",
                  "install": [
                    "/plugin marketplace add jezweb/claude-skills",
                    "/plugin install <skill-name>@jezweb-skills"
                  ],
                  "repo": "https://github.com/jezweb/claude-skills"
                },
                {
                  "name": "UI/UX Pro Max",
                  "type": "plugin",
                  "domain": "Design",
                  "tag": "Design intelligence",
                  "desc": "A design-intelligence bundle — searchable styles, palettes, font pairings, and UX rules across many stacks; generates a full design system.",
                  "install": [
                    "/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill",
                    "/plugin install ui-ux-pro-max@ui-ux-pro-max-skill"
                  ],
                  "repo": "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill"
                },
                {
                  "name": "Designer Skills",
                  "type": "plugin",
                  "domain": "Design",
                  "tag": "Design toolkit",
                  "desc": "A marketplace of 90+ skills across research, UX strategy, UI, design ops, AI-agent design, and accessibility.",
                  "install": "/plugin marketplace add Owl-Listener/designer-skills",
                  "repo": "https://github.com/Owl-Listener/designer-skills",
                  "note": "Then open /plugin and install the collections you want."
                },
                {
                  "name": "frontend-design",
                  "type": "skill",
                  "domain": "Design",
                  "tag": "Taste fixer",
                  "desc": "Kills the generic AI look and gives interfaces real taste — everyone's favourite. Anything Claude builds instantly looks more designed.",
                  "install": [
                    "/plugin marketplace add anthropics/claude-code",
                    "/plugin install frontend-design@claude-code"
                  ],
                  "repo": "https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design",
                  "note": "In Anthropic's official directory — you can also just open /plugin and pick frontend-design.",
                  "star": true
                },
                {
                  "name": "Taste skill",
                  "type": "skill",
                  "domain": "Design",
                  "tag": "UI taste",
                  "desc": "Anti-slop, motion-first design taste — a bundle of taste skills (brutalist, minimalist, soft, redesign, image-to-code).",
                  "install": "npx skills add https://github.com/leonxlnx/taste-skill",
                  "repo": "https://github.com/leonxlnx/taste-skill"
                },
                {
                  "name": "Impeccable",
                  "type": "skill",
                  "domain": "Design",
                  "tag": "Design vocabulary",
                  "desc": "A shared design vocabulary that shifts Claude's baseline taste — one-word commands like polish, audit, and critique.",
                  "install": "npx impeccable install",
                  "repo": "https://github.com/pbakaus/impeccable"
                },
                {
                  "name": "humanizer",
                  "type": "skill",
                  "domain": "Marketing & Content",
                  "tag": "De-robot writing",
                  "desc": "Strips the robotic tells out of AI writing — no more giveaway phrasing and stiff rhythm.",
                  "install": "Please install this Claude skill for me. The SKILL.md file is in this GitHub repo: https://github.com/blader/humanizer",
                  "repo": "https://github.com/blader/humanizer"
                },
                {
                  "name": "ai-second-brain",
                  "type": "skill",
                  "domain": "Research",
                  "tag": "Personal wiki",
                  "desc": "Turns your AI chat history into a personal, searchable wiki so one-off chats become a knowledge base.",
                  "install": "Please install this Claude skill for me. The SKILL.md file is in this GitHub repo: <repo link>",
                  "note": "Couldn't confirm the exact repo — search “ai-second-brain claude skill” and paste the repo link into the prompt."
                },
                {
                  "name": "notebooklm-skill",
                  "type": "skill",
                  "domain": "Research",
                  "tag": "Search your notes",
                  "desc": "Lets Claude search your own research and notes, so answers are grounded in your actual sources.",
                  "install": "Please install this Claude skill for me. The SKILL.md file is in this GitHub repo: <repo link>",
                  "note": "Couldn't confirm the exact repo — search “notebooklm skill claude” and paste the repo link in."
                },
                {
                  "name": "claude-seo",
                  "type": "skill",
                  "domain": "Marketing & Content",
                  "tag": "AI-search SEO",
                  "desc": "Helps your content get found and quoted by AI search tools, not just ranked on Google.",
                  "install": "Please install this Claude skill for me. The SKILL.md file is in this GitHub repo: <repo link>",
                  "note": "Couldn't confirm the exact repo — search “claude-seo skill” and paste the repo link in."
                },
                {
                  "name": "hyperframes",
                  "type": "skill",
                  "domain": "Media & Creative",
                  "tag": "HTML → video",
                  "desc": "Writes HTML and renders it into a video — simple motion graphics and animated frames from code, built for agents.",
                  "install": "npx skills add heygen-com/hyperframes",
                  "repo": "https://github.com/heygen-com/hyperframes"
                },
                {
                  "name": "doc skills",
                  "type": "skill",
                  "domain": "Marketing & Content",
                  "tag": "Real documents",
                  "desc": "Anthropic's official pack for making real Word, PDF, Excel, and PowerPoint files — actual downloads, not just chat text.",
                  "install": "/plugin install document-skills@anthropic-agent-skills",
                  "repo": "https://github.com/anthropics/skills",
                  "note": "From Anthropic's official directory — open /plugin if the marketplace isn't added yet."
                },
                {
                  "name": "App Store & Google Play Screenshot Generator",
                  "type": "skill",
                  "domain": "Media & Creative",
                  "tag": "App mockups",
                  "desc": "Generates realistic app-store mockups with device frames in a Next.js editor — ready for your store listing.",
                  "install": "npx skills add ParthJadhav/app-store-screenshots",
                  "repo": "https://github.com/ParthJadhav/app-store-screenshots"
                },
                {
                  "name": "caveman",
                  "type": "skill",
                  "domain": "Marketing & Content",
                  "tag": "Token saver",
                  "desc": "A fun skill that makes Claude answer in short caveman-speak — ultra-short replies use fewer tokens.",
                  "install": "Please install this Claude skill for me. The SKILL.md file is in this GitHub repo: <repo link>",
                  "note": "Couldn't confirm the exact repo — search “caveman claude skill” and paste the repo link in."
                },
                {
                  "name": "notion",
                  "type": "mcp",
                  "domain": "Productivity",
                  "tag": "Workspace",
                  "desc": "Reads and writes your Notion databases and docs — Claude can run your workspace, not just chat about it.",
                  "install": "claude mcp add --transport http notion https://mcp.notion.com/mcp",
                  "note": "Or in the Claude app: Settings → Connectors → add Notion.",
                  "star": true
                },
                {
                  "name": "slack",
                  "type": "mcp",
                  "domain": "Productivity",
                  "tag": "Team chat",
                  "desc": "Reads channel history and posts updates, so Claude works where your team already talks.",
                  "install": "claude mcp add --transport http slack <server-url>",
                  "note": "Easiest: Claude app → Settings → Connectors → add Slack. Get the server URL from Slack's MCP docs if using the CLI."
                },
                {
                  "name": "granola",
                  "type": "mcp",
                  "domain": "Productivity",
                  "tag": "Meeting notes",
                  "desc": "Feeds your Granola meeting notes into Claude — every meeting becomes searchable context.",
                  "install": "claude mcp add --transport http granola <server-url>",
                  "note": "Or connect from Settings → Connectors. Get the server URL from Granola's MCP docs."
                },
                {
                  "name": "zapier",
                  "type": "mcp",
                  "domain": "Productivity",
                  "tag": "Everything bridge",
                  "desc": "One connector wiring Claude to thousands of apps and actions — the bridge when an app isn't on the connectors list.",
                  "install": "claude mcp add --transport http zapier <your-endpoint-url>",
                  "note": "Create your Zapier MCP endpoint at zapier.com — the URL is unique to your account."
                },
                {
                  "name": "perplexity",
                  "type": "mcp",
                  "domain": "Research",
                  "tag": "Live web search",
                  "desc": "Adds live web search inside Claude, so it can pull current info mid-task.",
                  "install": "claude mcp add --transport http perplexity <server-url>",
                  "note": "Or add from Settings → Connectors. Get the server URL from Perplexity's MCP docs."
                },
                {
                  "name": "context7",
                  "type": "mcp",
                  "domain": "Development",
                  "tag": "Live docs",
                  "desc": "Feeds Claude the latest real documentation for the tools you're coding with — code against current docs, not last year's.",
                  "install": "claude mcp add --transport http context7 https://mcp.context7.com/mcp",
                  "note": "Free; add --header “CONTEXT7_API_KEY: YOUR_KEY” for higher limits."
                },
                {
                  "name": "higgsfield",
                  "type": "mcp",
                  "domain": "Media & Creative",
                  "tag": "Image/video models",
                  "desc": "A connector to 30+ image and video models (Kling, Veo, Seedance) from one place.",
                  "install": "claude mcp add --transport http higgsfield <server-url>",
                  "note": "Or connect from Settings → Connectors. Get the server URL from Higgsfield's MCP docs."
                },
                {
                  "name": "agent-browser",
                  "type": "mcp",
                  "domain": "Development",
                  "tag": "Real browser",
                  "desc": "Lets Claude click around a real website for you — navigate and pull from sites without a tidy connector.",
                  "install": "claude mcp add --transport http agent-browser <server-url>",
                  "note": "Follow the agent-browser project's docs for the exact stdio/http command."
                }
              ]
            }
          }
        ]
      },
      {
        "title": "✅ Start here — install these 3 first",
        "items": [
          {
            "text": "No need to do all of them. Set up these 3 — one strong pick from each bucket — then add one a week so you actually learn it.",
            "plain": true
          },
          {
            "catalog": {
              "items": [
                {
                  "name": "marketingskills",
                  "type": "plugin",
                  "domain": "",
                  "tag": "Plug-in",
                  "desc": "Your whole growth toolkit in one install.",
                  "install": [
                    "/plugin marketplace add coreyhaines31/marketingskills",
                    "/plugin install marketing-skills"
                  ],
                  "repo": "https://github.com/coreyhaines31/marketingskills",
                  "star": true
                },
                {
                  "name": "frontend-design",
                  "type": "skill",
                  "domain": "",
                  "tag": "Skill",
                  "desc": "Instantly makes anything Claude builds look good — from the official /plugin directory in Claude Code.",
                  "install": [
                    "/plugin marketplace add anthropics/claude-code",
                    "/plugin install frontend-design@claude-code"
                  ],
                  "repo": "https://github.com/anthropics/claude-code/tree/main/plugins/frontend-design",
                  "star": true
                },
                {
                  "name": "notion",
                  "type": "mcp",
                  "domain": "",
                  "tag": "MCP",
                  "desc": "So Claude can actually run your workspace, not just chat.",
                  "install": "claude mcp add --transport http notion https://mcp.notion.com/mcp",
                  "star": true
                }
              ]
            }
          },
          {
            "text": "Each takes about 10 minutes. Add one new thing a week and you'll learn it instead of drowning in all of them at once.",
            "plain": true
          }
        ]
      }
    ],
    "footer": "Plug-in = a team, skill = a shortcut, MCP = a wire to your apps. Start with 3, add one a week."
  },

  {
    dimension: "UI/UX",
    title: "Vibe-code beautiful UI",
    subtitle:
      "AI can design — you just have to drive it. A repeatable loop for vibe-coding UI that actually looks good: foundation → rules → examples → sharper prompts.",
    date: "2026-06-23",
    sections: [
      {
        title: "Step 1 · Give it a foundation",
        items: [
          { text: "Start with a design.md — a style guide your agent reads before it builds. It stops the guessing and keeps your colors, type, spacing, and voice consistent. Grab a ready-made template, or ask Claude Code to write one from your brand.", plain: true },
          { link: { href: "https://getdesign.md", label: "getdesign.md — what design.md is, and a ready-made example", compact: true } },
        ],
      },
      {
        title: "Step 2 · Give it rules",
        items: [
          { text: "Install design skills so your agent knows the rules pros take for granted — like not putting emojis on everything. These bake taste and craft straight into how it generates. (Add them via the marketplace flow in your Skills tab.)", plain: true },
          { link: { href: "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill", label: "UI/UX Pro Max — design intelligence: styles, palettes, UX rules", compact: true } },
          { link: { href: "https://github.com/pbakaus/impeccable", label: "Impeccable — a shared design vocabulary (polish, audit, critique…)", compact: true } },
          { link: { href: "https://github.com/Leonxlnx/taste-skill", label: "Taste skill — anti-slop, motion-first taste (also in your Claude Setup & Skills tab)", compact: true } },
        ],
      },
      {
        title: "Step 3 · Give it examples",
        items: [
          { text: "Show it what “good” looks like. Drop visual references into your prompt — real screens, real motion — so the AI builds toward your vision instead of its default.", plain: true },
          { link: { href: "https://mobbin.com", label: "Mobbin — real iOS / app screens", compact: true } },
          { link: { href: "https://21st.dev", label: "21st.dev — polished UI components", compact: true } },
          { link: { href: "https://tympanus.net/codrops/hub/", label: "Codrops Hub — motion + interaction inspiration", compact: true } },
        ],
      },
      {
        title: "Step 4 · Upgrade your prompts",
        items: [
          { text: "Learn the UI basics so you can feel why something's off and describe it like a designer. Say “increase the contrast and tighten the line height so the heading reads first,” not “make it pop.” Precise words get precise UI.", plain: true },
          { link: { href: "https://www.figma.com/resource-library/design-basics/", label: "Figma Design Basics — the fundamentals, free", compact: true } },
          { link: { href: "https://index.how", label: "index.how — name what you see, articulate like a designer", compact: true } },
        ],
      },
    ],
    footer:
      "Foundation, rules, examples, words — run the loop and the AI ships UI that looks good. No magic prompt required.",
  },

  {
    "dimension": "Branding",
    "title": "How to Use Claude Fable 5 for Brands",
    "subtitle": "Give it a rough idea and it adds the context, writes the copy, generates the images, animates the sections, and keeps everything on-brand — a finished, interactive brand asset in one pass.",
    "date": "2026-07-14",
    "sections": [
      {
        "title": "Why this model changes what you can build",
        "items": [
          {
            "text": "Claude Fable 5 is built for creative, brand-facing work, not just code. That is the shift. Earlier tools could write logic, but you still had to bring the copy, the images, the motion and the art direction yourself. Fable 5 handles all of it in one pass.",
            "plain": true
          },
          {
            "text": "Give it a rough idea and it adds the context, writes the copy, generates the images (using MCPs), animates the sections, and keeps everything on-brand from start to finish. So instead of stitching together a writer, a designer, a developer and a motion artist, you describe what you want and get a finished, interactive brand asset back.",
            "plain": true
          },
          {
            "text": "Below are five use cases, each with what was built and the prompt to build it yourself.",
            "plain": true
          }
        ]
      },
      {
        "title": "1 · Build interactive brand experiences",
        "items": [
          {
            "text": "Create a brand world your clients can interact with, not just look at. By combining gamification with world-building, you turn a flat message into something people can play with, move through and remember.",
            "plain": true
          },
          {
            "gallery": {
              "images": [
                {
                  "src": "assets/examples/branding-puzzle.jpg",
                  "label": "Sliding puzzle"
                }
              ],
              "caption": "A live sliding puzzle — drag in any brand photo and the game rebuilds around it."
            }
          },
          {
            "text": "What was built: a live sliding puzzle where dragging in any brand photo instantly rebuilds the game around it, on-brand colours and logo included. The interaction itself becomes the demo moment.",
            "plain": true
          },
          {
            "heading": "Use Claude Cowork — copy this prompt"
          },
          {
            "prompt": "Build me a sliding puzzle game as a single self-contained HTML file (no plugins, no external libraries, everything inline) that I can double-click to open in any browser.\n\nCore gameplay:\n- A 3x3 sliding tile puzzle (8 tiles plus one empty space)\n- Tiles slide by tapping/clicking, and arrow keys should also work\n- Always generate a solvable shuffle. Verify solvability so the puzzle is never impossible.\n- When solved: the missing 9th tile fades in to complete the image, confetti drops, and a CTA overlay appears\n\nBranding:\n- Let me drag in any brand photo and instantly rebuild the game around it\n- Use my brand colours and logo throughout, so the interaction itself becomes the demo moment",
            "plain": true
          }
        ]
      },
      {
        "title": "2 · Create a branded website",
        "items": [
          {
            "text": "Turn a rough branding idea into a fully functional website. Fable 5 does not just code the structure — it adds context, writes the copy, generates the images, and animates every section of the site.",
            "plain": true
          },
          {
            "gallery": {
              "images": [
                {
                  "src": "assets/examples/branding-website.jpg",
                  "label": "Brand site hero"
                }
              ],
              "caption": "The finished site's hero — real copy and visuals, animated, from a single brief."
            }
          },
          {
            "text": "What was built: a complete, animated site from a single brief, with real copy and visuals in place.",
            "plain": true
          },
          {
            "heading": "Use Claude Design — build the Design Guidelines first, then this prompt"
          },
          {
            "prompt": "Build me a complete, fully functional brand website based on my input. I want a finished, animated site with real copy and real visuals in place, not a wireframe or placeholder blocks. Deliver it as a self-contained file I can open in the browser and hand to a client.",
            "plain": true
          }
        ]
      },
      {
        "title": "3 · Design a product display loop",
        "items": [
          {
            "text": "Create a product showreel for an in-store screen or display. Fable designs the full showcase, animates each product moment, and turns your product information into a seamless loop made for screens.",
            "plain": true
          },
          {
            "gallery": {
              "images": [
                {
                  "src": "assets/examples/branding-display.jpg",
                  "label": "Menu display"
                }
              ],
              "caption": "The looping menu screen — each product beat animates into one continuous sequence."
            }
          },
          {
            "text": "What was built: a looping product display that runs on repeat for retail screens and stands, animating each product beat into one continuous, hands-off sequence.",
            "plain": true
          },
          {
            "heading": "Use Claude Design once the Design Guidelines are created"
          },
          {
            "prompt": "Build me a product display loop as a single self-contained HTML file (everything inline, no plugins) designed to run on an in-store screen or display. It should play on repeat automatically with no clicks needed, like a digital showreel. Deliver it as one file I can open fullscreen and hand to a client.\n\nWhat it should do:\n- Cycle through my products one at a time in a continuous, seamless loop\n- Animate each product moment: the product animates in, its details appear, then it transitions smoothly to the next\n- For each product, show [product name, a short line of copy, price, and a key detail or two]\n- Keep timing hands-off so it runs unattended all day, looping forever\n- Design it for a screen, so it should look great fullscreen and in [landscape / portrait] orientation",
            "plain": true
          }
        ]
      },
      {
        "title": "4 · Build a branded loyalty program",
        "items": [
          {
            "text": "Build a fully branded loyalty experience for your members. Track usage, manage points, and reward customers with bonuses, all through one seamless branded flow.",
            "plain": true
          },
          {
            "gallery": {
              "images": [
                {
                  "src": "assets/examples/branding-loyalty.jpg",
                  "label": "Loyalty app"
                }
              ],
              "caption": "The stamp-card flow — points, tiers and rewards in one branded interface."
            }
          },
          {
            "text": "What was built: a self-contained loyalty flow that handles points, member tracking and rewards in a single branded interface, so the whole program feels like part of the brand rather than a bolt-on tool.",
            "plain": true
          },
          {
            "heading": "Copy this prompt to create a demo version first"
          },
          {
            "prompt": "Build me a fully branded loyalty program as a single self-contained HTML file (everything inline, no plugins) that I can open in the browser and hand to a client as a working demo.\n\nWhat it should do:\n- Let a member sign in or enter a name to start their loyalty profile\n- Track and display their current points balance clearly at the top\n- Let members earn points through actions (for example [purchase, check-in, referral, review]) with a button or simple flow for each\n- Show a rewards tier ladder, so members can see what they've unlocked and what's next\n- Let members redeem points for [rewards, e.g. discounts, free product, perks], with the balance updating live\n- Reward milestones with a bonus and a small celebration moment (confetti or an unlock animation)\n- Keep everything in one seamless branded flow, so it feels like part of the brand, not a bolt-on tool\n\nData:\n- Persist the member's points and status so it survives a page refresh (use in-browser storage)\n- Include a small “reset demo” control so I can show it fresh on camera\n\nRewards structure (edit to your brand):\n- [Tier 1: 100 pts → free coffee]\n- [Tier 2: 250 pts → 15% off]\n- [Tier 3: 500 pts → exclusive product]",
            "plain": true
          }
        ]
      },
      {
        "title": "5 · Create your own product configurator",
        "items": [
          {
            "text": "Build an interactive configuration experience where customers choose their own product variation. Fable streamlines the full process, generating every variation, building the configuration functionality, and keeping the experience fully on-brand.",
            "plain": true
          },
          {
            "gallery": {
              "images": [
                {
                  "src": "assets/examples/branding-configurator.jpg",
                  "label": "Product configurator"
                }
              ],
              "caption": "The working configurator — pick a variant, watch the live preview and price update."
            }
          },
          {
            "text": "What was built: a working configurator that generates each product option and lets customers combine them live, with the build logic and the brand styling handled in the same pass.",
            "plain": true
          },
          {
            "heading": "Copy this prompt"
          },
          {
            "prompt": "Build me an interactive product configurator as a single self-contained HTML file (everything inline, no plugins) that I can open in the browser and hand to a client as a working demo.\n\nWhat it should do:\n- Let a customer build their own version of the product by choosing from a set of options\n- Update a live product preview as they make selections, so they see their choice change in real time\n- Show a running summary of their configuration and a live total price\n- End with a clear CTA (for example [Add to cart / Request a quote / Order now]) that reflects their final build",
            "plain": true
          }
        ]
      }
    ],
    "footer": "Describe the brand asset you want — copy, visuals, motion and interaction included — and hand the finished file to a client."
  },

  {
    dimension: "M365 Copilot",
    title: "M365 Copilot",
    subtitle:
      "Agentic workflows across Microsoft 365 — starting with Power BI and Fabric.",
    date: "2026-08-02",
    sections: [
      {
        title: "AI report authoring with Fabric Skills",
        pillar: "Power BI and Fabric",
        items: [
          { text: "Microsoft's Skills for Fabric let an AI agent build and restyle Power BI reports from plain English. It isn't clicking around Power BI Desktop for you — it edits the report's underlying PBIR definition files directly, so the changes are precise, reviewable, and land in git like any other code change. Still in preview.", plain: true },
          { link: { href: "https://youtu.be/pDRSXOK6fq0", label: "Guy in a Cube — We tested the new Power BI Report Skills", compact: true } },

          { heading: "What you need first" },
          { text: "Node.js (the CLI installs as an npm package), PowerShell 7 — check with pwsh --version, since the CLI won't install plug-ins properly on Windows PowerShell 5 — Git, the Azure CLI signed in with az login, Power BI Desktop for opening and eyeballing the result, and a Power BI tenant where you're allowed to create and publish semantic models and reports.", plain: true },

          { heading: "1 · Save the report as a Power BI Project (.PBIP)" },
          { text: "This is the step everything else depends on. The skill only reads and writes PBIP projects — the folder-of-JSON format — because that's what it edits. A plain .pbix is a sealed binary and the agent simply can't see inside it. In Power BI Desktop: File → Save as → Power BI project file (.pbip). Commit that folder to git before you let an agent near it, so you can always diff and revert.", plain: true },

          { heading: "2 · Install the CLI, then the skills" },
          { text: "First install GitHub Copilot CLI in your terminal:", plain: true },
          { prompt: "npm install -g @github/copilot", plain: true },
          { text: "Then start the CLI with copilot, cd'd into your report folder, and run these inside the session — they're slash commands typed at the Copilot prompt, not shell commands. Note that fabric-skills and powerbi-authoring are two separate bundles: the Fabric collection does NOT include the Power BI one, which is the easy way to end up thinking you installed report authoring when you didn't.", plain: true },
          { prompt: "/plugin marketplace add microsoft/skills-for-fabric\n/plugin install powerbi-authoring@fabric-collection\n/plugin install fabric-skills@fabric-collection\n/quit\n/skills", plain: true },
          { text: "You have to quit and restart before the skills load. /skills then lists what's active — you should see the report planning, design, authoring, and management skills.", plain: true },

          { heading: "3 · Ask for pages in plain English" },
          { text: "With the CLI running in your PBIP folder, just describe the pages you want. Name the semantic model and be specific about visuals — vague asks get vague reports.", plain: true },
          { prompt: "Using the existing semantic model in this project, create two report pages: an overview page for sales analytics with KPI cards for the headline measures, a bar chart by category, and a trend line by month; and a store details page with a table of stores, a map, and a date slicer.", plain: true },

          { heading: "4 · Point it at an inspiration file" },
          { text: "This is the trick that lifts the output from functional to presentable. Drop an image into the project folder — a rough sketch of the layout you want, a screenshot of a report you like, or your team's style guide — then reference that file in your prompt. The agent pulls colors, spacing, and layout from it instead of falling back on defaults.", plain: true },
          { prompt: "Restyle this report to match the design inspo image in this folder — use its colors, spacing, and overall layout, and keep every existing field binding intact.", plain: true },

          { heading: "Which skill does what" },
          { text: "The powerbi-authoring bundle is four skills that hand off to each other. Report Planner runs the whole thing end to end — gathers requirements, inspects the model, proposes a brief, waits for your approval, then builds. Report Design is the taste layer: it turns a vague “make it look professional” into a concrete brief of page archetypes, chart choices, and a color map. Report Authoring does the actual PBIR file mechanics — pages, visuals, filters, formatting, themes. Report Management publishes to Fabric. Blank slate → start at Planner or Design. Specific edit you can already describe → go straight to Authoring.", plain: true },

          { heading: "Watch-outs" },
          { text: "The PBIR files on disk are the source of truth, not your open Desktop window — save in Desktop before asking the agent to iterate, or it'll work from the old version and quietly throw away your unsaved changes.", plain: true },
          { text: "Commit a baseline before every agent run. It edits JSON in place, and a bad pass is much easier to revert than to unpick by hand.", plain: true },
          { text: "Don't ask for Q&A, Bing maps, or filled map visuals — they're being deprecated, and you'd be building on something scheduled to break.", plain: true },
          { text: "Plan before executing. Shift+Tab drops the CLI into planning mode; read the plan, then let it run. It measurably beats letting it improvise, and it's a lot cheaper than reviewing a finished mess.", plain: true },
          { link: { href: "https://learn.microsoft.com/en-us/fabric/fundamentals/skills-for-fabric-install", label: "Microsoft Learn — Install Skills for Fabric", compact: true } },
          { link: { href: "https://learn.microsoft.com/en-us/power-bi/developer/agentic/power-bi-report-authoring-skill-overview", label: "Microsoft Learn — Power BI Report Authoring skill", compact: true } },
        ],
      },
    ],
    footer:
      "Save as .pbip, install the powerbi-authoring bundle, describe the pages you want, and give it something to look at. The agent writes the report files — you keep the review and the git history.",
  },
];
