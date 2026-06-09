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
];
