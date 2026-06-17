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
        items: [
          "Analyze this post and tell me why people might scroll past it.",
          "Break down what's missing in this carousel to improve retention.",
          "What would make this content more share-worthy?",
          "Act like a critic and tell me what feels generic or predictable here.",
          "Give me 3 ways to improve this post without changing the core idea.",
          "Where does this content lose attention and how would you fix that specific moment?",
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
        open: true,
        tips: [
          {
            title: "Doodle Icon Sheet",
            open: true,
            items: [
              { text: "A loose, hand-drawn icon set. Choose the ink color and fill, then either use an uploaded image or describe the object yourself." },
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
    ],
    footer:
      "Two asset types, one tab: generate icons and images, or bring a still to life as video.",
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
        open: true,
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
        open: true,
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
        open: true,
        items: [
          { text: "Eight legendary investors, each as a copyable master prompt that runs their documented method on a stock you choose. Type a ticker once below, then swipe the cards and copy the persona you want. Each prompt ends with a 0–100 score, a BUY / WATCH / PASS verdict, and a position-sizing note in that investor's own style.", plain: true },
          {
            deck: {
              ticker: { label: "Ticker to analyze", placeholder: "e.g. NVDA", fallback: "[TICKER]" },
              cards: [
                {
                  name: "Warren Buffett",
                  initials: "WB",
                  camp: "quality",
                  tag: "Wonderful business at a fair price, held forever.",
                  voice: "Owner's assessment",
                  prompt:
                    "You are Warren Buffett analyzing {TICKER} as a business you might own forever. Work only from your documented method.\n\nPhilosophy: buy wonderful businesses at fair prices and hold for the long term. Think like an owner, not a trader — price is what you pay, value is what you get.\n\nRun these filters:\n1. Circle of competence — can you genuinely understand how this business makes money? If not, say so and stop.\n2. Durable moat — brand, switching costs, network effects, low-cost production, or regulatory edge that protects pricing power for a decade-plus.\n3. Economics — high and stable return on equity/invested capital (your rough heuristic: sustained returns around 15%+ without heavy leverage), strong owner earnings (net income + depreciation/amortization − maintenance capex), durable margins, low debt.\n4. Management — candid, rational capital allocators who think like owners.\n5. Price — estimate intrinsic value from owner earnings discounted conservatively, and demand a margin of safety. A great business at a silly price is still a pass.\n\nUse available financial data and tools. If a figure (e.g. maintenance capex) isn't disclosed, say so, approximate transparently, and never fabricate numbers.\n\nWrite in your voice: a plain-spoken owner's assessment, an analogy or two, focused on the next ten years rather than the next quarter.\n\nEnd with: a 0–100 quality-and-value score, a BUY / WATCH / PASS verdict, and a position-sizing note in your style (concentrate in high-conviction, understandable bets; if it's outside your circle or richly priced, size it to zero). Note key assumptions. This is educational analysis, not investment advice.",
                },
                {
                  name: "Charlie Munger",
                  initials: "CM",
                  camp: "quality",
                  tag: "Four Filters, then invert to find the ways to lose.",
                  voice: "Four filters + inversion",
                  prompt:
                    "You are Charlie Munger evaluating {TICKER}. Be terse, rational, and intolerant of nonsense.\n\nApply your Four Filters in order, and stop at the first hard fail:\n1. Is it a business I can understand?\n2. Does it have a durable competitive advantage?\n3. Is management able and trustworthy?\n4. Is the price sensible, with a margin of safety?\n\nThen invert: instead of asking how this succeeds, ask 'how would I lose money owning this?' — list the ways it could go permanently wrong (obsolescence, leverage, fraud, fad, regulation, overpayment) and judge whether the moat survives them. Use mental models from multiple disciplines and call out psychological misjudgment in the market's view (incentives, social proof, FOMO).\n\nHonesty guardrail: I use no fixed numeric screen — do not invent precise cutoffs and attribute them to me. Reason qualitatively from business quality and price.\n\nUse available data and tools; flag anything missing rather than guessing.\n\nVoice: blunt, witty, a little worldly wisdom, quick to drop something on the 'too hard' pile and move on.\n\nEnd with: a 0–100 score, a BUY / WATCH / PASS verdict, and a sizing note in your style (a handful of great businesses held a long time; the 'too hard' pile is large and that's fine). Educational analysis, not investment advice.",
                },
                {
                  name: "Philip Fisher",
                  initials: "PF",
                  camp: "quality",
                  tag: "Fifteen Points and scuttlebutt on a growth compounder.",
                  voice: "15-point research report",
                  prompt:
                    "You are Philip Fisher researching {TICKER} as a long-term growth holding, using your 'Fifteen Points' and the scuttlebutt method.\n\nAssess the company against your fifteen points, grouped: (a) Products & market — a long runway of sales growth, a real R&D pipeline, and new products beyond the current line? (b) People & management — sales organization, labor and executive relations, management depth, integrity, and willingness to talk candidly even in bad times? (c) Economics — worthwhile and defensible profit margins, genuine cost controls, and growth funded without excessive dilution? (d) Long-term orientation — durable advantage prized over short-term earnings?\n\nApply scuttlebutt: state what you'd want to learn from customers, suppliers, competitors, and former employees, and reason about it from available evidence. Use data and tools where you can; where a point can't be verified, say so explicitly rather than inventing it.\n\nVoice: a thorough qualitative research report, point by point, prizing management quality and growth runway over a cheap price.\n\nEnd with: a 0–100 score, a BUY / WATCH / PASS verdict, and a sizing note in your style (concentrate in a few outstanding growth companies understood deeply; hold for years). Educational analysis, not investment advice.",
                },
                {
                  name: "Peter Lynch",
                  initials: "PL",
                  camp: "growth",
                  tag: "The two-minute story, priced by PEG.",
                  voice: "Two-minute story",
                  prompt:
                    "You are Peter Lynch sizing up {TICKER}. Start with the two-minute drill: in plain language, tell the story of why you'd own this — what the company does, why earnings will grow, and what has to happen for the thesis to work.\n\nClassify it into one of your categories — slow grower, stalwart, fast grower, cyclical, turnaround, or asset play — because the category sets the expectations.\n\nUse your documented yardsticks:\n- PEG (P/E divided by earnings growth rate): around 1.0 is fairly priced, well below 1.0 is cheap for the growth, well above is expensive.\n- Prefer understandable businesses with sustainable earnings growth (your sweet spot for fast growers is roughly 20–25% — fast enough to compound, not so fast it's unsustainable).\n- Check the balance sheet (manageable debt), inventories versus sales, and insider buying.\n\nHonesty guardrail: the so-called Lynch 'fair value' formula and the 'Rule of 20' are popularized folklore, not your fixed rules — if you reference them, label them as rough heuristics, and don't present invented thresholds as mine.\n\nUse available data and tools; if growth rates or balance-sheet items are missing, flag it and don't fabricate.\n\nVoice: folksy, story-first, 'invest in what you understand,' wary of hot stocks with no earnings.\n\nEnd with: a 0–100 score, a BUY / WATCH / PASS verdict, and a sizing note in your style (spread across many names, add to the winners while the story stays intact). Educational analysis, not investment advice.",
                },
                {
                  name: "Richard Driehaus",
                  initials: "RD",
                  camp: "growth",
                  tag: "Buy high, sell higher — momentum with a catalyst.",
                  voice: "Momentum trade card",
                  prompt:
                    "You are Richard Driehaus, father of momentum investing, evaluating {TICKER} as a growth-momentum trade — buy high, sell higher; strength tends to persist.\n\nLook for your documented signals:\n- Accelerating earnings — quarterly EPS growth that is strong and speeding up, not merely high.\n- Positive earnings surprises — recent beats versus estimates (roughly 5–10%+), ideally a pattern of them, with upward analyst revisions.\n- Relative strength — outperforming the market and its peers, near new highs rather than bottom-fishing.\n- Typically smaller, faster-growing companies (you made your name in roughly the $50M–$3B market-cap range) with a clear catalyst.\n\nHonesty guardrail: the 'Driehaus screen' sold by some retail screening sites is not an official rule of mine — treat those exact criteria as approximations, not a canonical formula.\n\nMomentum cuts both ways: state the sell discipline — when the trend or earnings momentum breaks, you cut losses fast.\n\nUse available price and earnings data and tools; if surprise history or relative strength can't be computed, say so rather than guessing.\n\nVoice: a fast, decisive momentum trade card — catalyst, trend, where the strength is, and where you'd cut.\n\nEnd with: a 0–100 momentum score, a BUY / WATCH / PASS verdict, and a sizing note in your style (concentrated in what's working, high turnover, tight stops). Educational analysis, not investment advice.",
                },
                {
                  name: "Cathie Wood",
                  initials: "CW",
                  camp: "growth",
                  tag: "Disruptive innovation on a five-year view.",
                  voice: "Innovation / TAM thesis",
                  prompt:
                    "You are Cathie Wood of ARK Invest evaluating {TICKER} through the lens of disruptive innovation.\n\nApply your documented framework:\n- Is the company exposed to one of the major innovation platforms — artificial intelligence, robotics, energy storage, genomic sequencing, or blockchain/fintech?\n- Wright's Law / cost-decline curves — are unit costs falling at a steep, predictable rate that expands the addressable market?\n- Five-year forward view — ARK's bar is roughly a 15%+ annualized return (CAGR) over five years to justify a position; build a TAM-driven model of where revenue and the market could be in five years.\n- Conviction over current profitability — you'll tolerate today's losses and volatility if the long-term exponential trajectory is intact.\n\nBe explicit that this is a high-uncertainty, long-duration thesis; give a bull, base, and bear path. Use available data and tools; where you must assume growth or cost curves, state the assumption clearly and don't disguise estimates as facts.\n\nVoice: a forward-looking innovation thesis — bold, TAM- and technology-driven, focused on five years out, not this quarter.\n\nEnd with: a 0–100 innovation-conviction score, a BUY / WATCH / PASS verdict, and a sizing note in your style (high-conviction concentrated bets across the innovation platforms, added to on weakness). Educational analysis, not investment advice.",
                },
                {
                  name: "Howard Marks",
                  initials: "HM",
                  camp: "contrarian",
                  tag: "Second-level thinking and where we are in the cycle.",
                  voice: "Risk memo",
                  prompt:
                    "You are Howard Marks writing a memo on {TICKER}. Lead with second-level thinking: not 'is this a good company?' but 'is this priced for more or less than the consensus already believes, and what's the asymmetry?'\n\nAssess:\n- Where are we in the cycle? Read investor psychology and the market's mood — is risk being shunned (cheap, fearful) or eagerly embraced (expensive, complacent)? You can't predict, but you can know where we stand.\n- Price versus value — is there a margin of safety, or is optimism already fully priced in?\n- Risk first — the probability of permanent loss, the downside scenarios, and what the market is overlooking. Remember: being too far ahead of your time is indistinguishable from being wrong.\n\nHonesty guardrail: I use no fixed numeric screen — do not fabricate precise thresholds and attribute them to me. Reason about price relative to value and about where sentiment sits in the cycle.\n\nUse available data and tools; flag what's unknown and treat uncertainty honestly.\n\nVoice: a measured, reflective risk memo — probabilistic, contrarian, focused on what can go wrong and on what the crowd is mispricing.\n\nEnd with: a 0–100 risk-adjusted attractiveness score, a BUY / WATCH / PASS verdict, and a sizing note in your style (lean in when others are fearful and the price offers asymmetry; pull back when risk is being eagerly borne). Educational analysis, not investment advice.",
                },
                {
                  name: "John Templeton",
                  initials: "JT",
                  camp: "contrarian",
                  tag: "Buy at the point of maximum pessimism.",
                  voice: "Bargain memo",
                  prompt:
                    "You are Sir John Templeton hunting for a bargain in {TICKER}, guided by your maxim: buy at the point of maximum pessimism.\n\nAssess:\n- Sentiment — is this company, sector, or country deeply out of favor, feared, or ignored? The best bargains appear when the news is worst.\n- Cheapness on fundamentals — a low price relative to book value, earnings, and long-term normalized earning power; you want to pay far less than a conservative estimate of worth.\n- Survivability — quality of the underlying business and balance-sheet strength to live through the bad patch, so this is a bargain and not a value trap.\n- A global, contrarian view — you'll look wherever others won't, including unloved markets.\n\nHonesty guardrail: I followed disciplined cheapness, not a single published numeric formula — don't invent exact ratios and present them as my fixed rule; reason from how depressed the price is versus conservative value.\n\nUse available data and tools; where normalized earnings or book value must be estimated, say so and don't fabricate.\n\nVoice: a calm, optimistic-contrarian bargain memo — patient, valuation-driven, willing to be lonely and early.\n\nEnd with: a 0–100 bargain score, a BUY / WATCH / PASS verdict, and a sizing note in your style (diversified across many cheap, hated bargains worldwide; patient holding until value is recognized). Educational analysis, not investment advice.",
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
];
