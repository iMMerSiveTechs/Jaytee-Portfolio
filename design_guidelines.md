{
  "brand_attributes": [
    "high-signal operator portfolio",
    "premium / restrained / editorial",
    "metallic precision (silver)",
    "controlled neon (cyan/blue) for instrumentation",
    "immersive-adjacent depth without cyberpunk clutter"
  ],
  "design_personality": {
    "north_star": "A dark, quiet-luxury control room for clarity work—sharp hierarchy, metallic type, and instrument-grade UI.",
    "do_not": [
      "generic SaaS dark template",
      "gamer HUD / cyberpunk overload",
      "over-glow neon everywhere",
      "rounded-everything card soup",
      "metrics/claims that aren’t real"
    ],
    "layout_principles": [
      "Use asymmetry + editorial spacing; avoid centered-all layouts.",
      "Mix sharp edges (structural containers) with selective rounding (interactive/touch targets).",
      "Treat every section like a ‘panel’ within an ecosystem—subtle separators, depth via borders and blur, not heavy shadows."
    ]
  },
  "typography": {
    "font_family": {
      "primary": "Inter",
      "fallback": "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto"
    },
    "weights": {
      "heading": "800-900 (ExtraBold/Black)",
      "body": "300-400 (Light/Regular)",
      "labels": "500-600 (Medium/SemiBold)"
    },
    "tracking": {
      "labels": "tracking-[0.18em] uppercase",
      "headings": "tracking-[-0.02em]",
      "body": "tracking-[-0.01em]"
    },
    "type_scale_tailwind": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl font-extrabold",
      "h2": "text-base md:text-lg text-muted-foreground",
      "h3": "text-xl sm:text-2xl font-semibold",
      "section_label": "text-xs font-medium uppercase tracking-[0.18em]",
      "body": "text-sm sm:text-base leading-relaxed",
      "small": "text-xs text-muted-foreground"
    },
    "metallic_gradient_text": {
      "usage": "Hero H1 + select single-line highlights only (never paragraphs).",
      "class_recipe": "bg-gradient-to-b from-[rgba(255,255,255,0.95)] via-[rgba(210,215,224,0.92)] to-[rgba(160,166,178,0.86)] bg-clip-text text-transparent",
      "restriction": "Do not apply to long text blocks; keep gradient area <20% viewport."
    }
  },
  "color_system": {
    "rule": "Dark theme mandatory. Neon is instrumentation—not decoration.",
    "surfaces_hex": {
      "bg_0": "#08090a",
      "bg_1": "#0f1115",
      "bg_2": "#161920",
      "panel": "rgba(255,255,255,0.04)",
      "panel_border": "rgba(255,255,255,0.08)",
      "hairline": "rgba(255,255,255,0.10)"
    },
    "text_hex": {
      "fg": "rgba(255,255,255,0.92)",
      "muted": "rgba(255,255,255,0.72)",
      "subtle": "rgba(255,255,255,0.55)",
      "disabled": "rgba(255,255,255,0.38)"
    },
    "accents_hex": {
      "cyan": "#00f0ff",
      "electric_blue": "#3b82f6",
      "subtle_violet": "#8b5cf6"
    },
    "semantic_tokens": {
      "focus_ring": "rgba(0,240,255,0.45)",
      "success": "#34d399",
      "warning": "#fbbf24",
      "danger": "#fb7185",
      "info": "#60a5fa"
    },
    "allowed_gradients": {
      "hero_backdrop": "radial-gradient(1200px circle at 20% -10%, rgba(0,240,255,0.10), transparent 55%), radial-gradient(900px circle at 85% 5%, rgba(59,130,246,0.10), transparent 60%), radial-gradient(900px circle at 40% 90%, rgba(139,92,246,0.06), transparent 55%)",
      "cta_sheen": "linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.02))",
      "metal_sheen": "linear-gradient(180deg, rgba(255,255,255,0.14), rgba(255,255,255,0.02))"
    },
    "gradient_restriction_rule": {
      "never": [
        "NEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.",
        "NEVER let gradients cover more than 20% of the viewport.",
        "NEVER apply gradients to text-heavy content or reading areas.",
        "NEVER use gradients on small UI elements (<100px width).",
        "NEVER stack multiple gradient layers in the same viewport."
      ],
      "enforcement": "If gradient area exceeds 20% of viewport OR affects readability, then use solid colors.",
      "allowed": [
        "Hero background only (decorative)",
        "Large section backdrops (decorative)",
        "Decorative overlays / ambient blobs",
        "Very subtle sheen on primary CTA (not saturated)"
      ]
    }
  },
  "design_tokens_css": {
    "add_to": "/app/frontend/src/index.css",
    "notes": "Replace current :root/.dark shadcn tokens with these to match mandatory charcoal surfaces + controlled neon accents.",
    "css": ":root{--radius:10px;--bg0:8 5% 3%;--bg1:222 23% 7%;--bg2:225 22% 11%;--background:222 23% 7%;--foreground:0 0% 98%;--card:225 22% 11%;--card-foreground:0 0% 98%;--popover:225 22% 11%;--popover-foreground:0 0% 98%;--muted:225 18% 16%;--muted-foreground:0 0% 72%;--border:0 0% 100% / 0.10;--input:0 0% 100% / 0.10;--ring:186 100% 50% / 0.45;--primary:0 0% 98%;--primary-foreground:225 22% 11%;--secondary:225 18% 16%;--secondary-foreground:0 0% 98%;--accent:225 18% 16%;--accent-foreground:0 0% 98%;--destructive:350 90% 64%;--destructive-foreground:0 0% 98%;--brand-cyan:186 100% 50%;--brand-blue:217 91% 60%;--brand-violet:262 83% 70%;--shadow-elev:0 18px 55px rgba(0,0,0,0.55);--shadow-soft:0 10px 30px rgba(0,0,0,0.45);--panel:rgba(255,255,255,0.04);--panel-border:rgba(255,255,255,0.08);--hairline:rgba(255,255,255,0.10);--gridline:rgba(255,255,255,0.06);--noise-opacity:0.06;--focus:rgba(0,240,255,0.45);--btn-radius:12px;--btn-height:44px;--btn-shadow:0 8px 24px rgba(0,0,0,0.45)}"
  },
  "layout_grid": {
    "container": "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
    "section_spacing": "py-16 sm:py-20 lg:py-24",
    "rhythm": [
      "Use 12-col grid on desktop; 4-col on mobile.",
      "Prefer left-aligned hero copy with right-side ‘instrument panel’/summary card.",
      "Use separators (hairlines) instead of heavy shadows for structure."
    ]
  },
  "components": {
    "component_path": {
      "nav": "/app/frontend/src/components/ui/navigation-menu.jsx",
      "button": "/app/frontend/src/components/ui/button.jsx",
      "card": "/app/frontend/src/components/ui/card.jsx",
      "badge": "/app/frontend/src/components/ui/badge.jsx",
      "tabs": "/app/frontend/src/components/ui/tabs.jsx",
      "accordion": "/app/frontend/src/components/ui/accordion.jsx",
      "dialog": "/app/frontend/src/components/ui/dialog.jsx",
      "sheet_mobile_nav": "/app/frontend/src/components/ui/sheet.jsx",
      "input": "/app/frontend/src/components/ui/input.jsx",
      "textarea": "/app/frontend/src/components/ui/textarea.jsx",
      "label": "/app/frontend/src/components/ui/label.jsx",
      "select": "/app/frontend/src/components/ui/select.jsx",
      "separator": "/app/frontend/src/components/ui/separator.jsx",
      "sonner_toasts": "/app/frontend/src/components/ui/sonner.jsx",
      "skeleton_loading": "/app/frontend/src/components/ui/skeleton.jsx",
      "scroll_area": "/app/frontend/src/components/ui/scroll-area.jsx",
      "tooltip": "/app/frontend/src/components/ui/tooltip.jsx",
      "progress": "/app/frontend/src/components/ui/progress.jsx"
    },
    "patterns_to_build": [
      {
        "name": "GlassNav",
        "description": "Fixed top navigation with frosted glass, active route underline + tiny cyan indicator, and subtle border.",
        "tailwind": "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1100px,calc(100%-1.5rem))] rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_18px_55px_rgba(0,0,0,0.55)]",
        "micro_interactions": [
          "On scroll: increase blur + slightly reduce transparency.",
          "Active link: 1px hairline underline + 6px cyan dot."
        ],
        "testids": {
          "nav": "top-nav",
          "nav_home": "top-nav-link-home",
          "nav_about": "top-nav-link-about",
          "nav_work": "top-nav-link-work",
          "nav_tools": "top-nav-link-tools",
          "nav_work-with-me": "top-nav-link-work-with-me",
          "nav_notes": "top-nav-link-notes",
          "nav_contact": "top-nav-link-contact",
          "mobile_menu_button": "top-nav-mobile-menu-button"
        }
      },
      {
        "name": "HeroSplit",
        "description": "Left: metallic statement + method overview. Right: a compact ‘Operator Panel’ card with quick facts + current focus.",
        "layout": "grid grid-cols-1 lg:grid-cols-12 gap-10 items-start",
        "left_col": "lg:col-span-7",
        "right_col": "lg:col-span-5 lg:sticky lg:top-28",
        "ambient_blobs": "Use pseudo-elements or absolute divs with radial gradients at low opacity (<=10%)."
      },
      {
        "name": "OperatingSequence",
        "description": "4-step sequence (Structure → Connect → Leverage → Refine) as timeline-like cards with sharp edges and a thin cyan trace line.",
        "component": "Accordion (mobile) + 4-card row (desktop)",
        "tailwind": "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
        "testids": {
          "section": "operating-sequence",
          "step_structure": "operating-sequence-step-structure",
          "step_connect": "operating-sequence-step-connect",
          "step_leverage": "operating-sequence-step-leverage",
          "step_refine": "operating-sequence-step-refine"
        }
      },
      {
        "name": "SelectedSystems",
        "description": "Three systems with hierarchy: Job Forge primary, ChurnWise secondary, Transplant Tracker quieter third. Use size + border intensity + accent to show priority.",
        "layout": "grid grid-cols-1 lg:grid-cols-12 gap-5",
        "cards": [
          {
            "name": "Job Forge",
            "span": "lg:col-span-7",
            "treatment": "strong border + subtle cyan edge glow",
            "testid": "selected-system-job-forge"
          },
          {
            "name": "ChurnWise",
            "span": "lg:col-span-5",
            "treatment": "neutral border + blue accent only on hover",
            "testid": "selected-system-churnwise"
          },
          {
            "name": "Transplant Tracker",
            "span": "lg:col-span-12",
            "treatment": "quiet row card; minimal glow; more editorial",
            "testid": "selected-system-transplant-tracker"
          }
        ]
      },
      {
        "name": "EcosystemSignalStrip",
        "description": "A subtle strip (not org chart) showing Nemurium, iMMerSiveTechs, VibeForge Studios as ‘signals’—pills + hairline separators.",
        "components": "Badge + Separator",
        "tailwind": "rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3",
        "testids": {
          "strip": "ecosystem-signal-strip",
          "nemurium": "ecosystem-signal-nemurium",
          "immersivetechs": "ecosystem-signal-immersivetechs",
          "vibeforge": "ecosystem-signal-vibeforge"
        }
      },
      {
        "name": "ClarityLabTools",
        "description": "Two tools (Chaos Translator + Bloat Detector) as instrument panels with premium input, loading, and results. No flashy demo vibes.",
        "components": "Tabs (two tools) + Card + Textarea + Button + Skeleton + Sonner",
        "loading_state": "Use Skeleton blocks that resemble the final result layout; show ‘Analyzing…’ label with subdued progress bar.",
        "result_state": "Render results in a bordered ‘output’ panel with copy button + timestamp.",
        "testids": {
          "page": "tools-page",
          "tabs": "tools-tabs",
          "chaos": "tools-tab-chaos-translator",
          "bloat": "tools-tab-bloat-detector",
          "input": "tools-input-textarea",
          "submit": "tools-submit-button",
          "output": "tools-output-panel",
          "copy": "tools-copy-output-button"
        }
      },
      {
        "name": "ServiceTiers",
        "description": "4 service tiers with premium card layout: mix sharp container + rounded CTA area. Each tier has a single primary action.",
        "layout": "grid grid-cols-1 md:grid-cols-2 gap-5",
        "components": "Card + Badge + Button + Separator",
        "testids": {
          "section": "service-tiers",
          "tier_1": "service-tier-1",
          "tier_2": "service-tier-2",
          "tier_3": "service-tier-3",
          "tier_4": "service-tier-4"
        }
      },
      {
        "name": "NotesIndexAndDetail",
        "description": "Notes list is editorial: title, date, reading time (if real), and a thin divider. Detail page uses max width and comfortable leading.",
        "components": "Card (very subtle) + Separator + Breadcrumb",
        "testids": {
          "index": "notes-index",
          "note_item": "notes-item",
          "detail": "notes-detail"
        }
      },
      {
        "name": "ContactIntakeForm",
        "description": "Premium structured intake form with clear sections. Avoid gimmicks. Use Select for budget/timeline, and textarea for context.",
        "components": "Form + Input + Select + Textarea + Button + Sonner",
        "layout": "grid grid-cols-1 md:grid-cols-2 gap-5",
        "testids": {
          "page": "contact-page",
          "form": "contact-intake-form",
          "submit": "contact-submit-button",
          "status": "contact-submit-status"
        }
      }
    ]
  },
  "button_system": {
    "style": "Professional / Corporate with quiet-luxury sheen (no neon fills).",
    "primary": {
      "use": "Main CTAs (Work With Me, Send Intake, Run Tool)",
      "tailwind": "h-11 px-5 rounded-xl bg-white text-black hover:bg-white/90 focus-visible:ring-2 focus-visible:ring-[rgba(0,240,255,0.45)] focus-visible:ring-offset-0",
      "micro": "active:scale-[0.98] transition-[background-color,box-shadow,opacity] duration-200",
      "testid": "primary-cta-button"
    },
    "secondary": {
      "tailwind": "h-11 px-5 rounded-xl border border-white/15 bg-white/[0.03] text-white hover:bg-white/[0.06]",
      "micro": "transition-[background-color,border-color,opacity] duration-200",
      "testid": "secondary-cta-button"
    },
    "ghost": {
      "tailwind": "h-10 px-3 rounded-lg text-white/80 hover:text-white hover:bg-white/[0.04]",
      "testid": "ghost-button"
    }
  },
  "motion_microinteractions": {
    "library": {
      "recommend": "framer-motion",
      "install": "npm i framer-motion",
      "usage": [
        "Page transitions: opacity + y (2-6px) only.",
        "Section reveal: stagger children 40-70ms.",
        "Hover: glow via box-shadow/border-color, not transform-heavy.",
        "Respect prefers-reduced-motion."
      ]
    },
    "principles": [
      "No universal transition (never transition: all).",
      "Motion should feel like ‘instrument response’: fast-in, slow-out, minimal travel.",
      "Ambient blobs are static or ultra-slow (20s+) to avoid distraction."
    ],
    "durations": {
      "hover": "150-220ms",
      "modal_drawer": "220-320ms",
      "page": "260-420ms"
    }
  },
  "textures_depth": {
    "noise_overlay": {
      "approach": "Add a subtle CSS noise layer over the whole app (opacity ~0.05-0.07) to avoid flat blacks.",
      "css_hint": "background-image: url('data:image/svg+xml;...') or a tiny noise png; mix-blend-mode: overlay; pointer-events:none;"
    },
    "borders_over_shadows": "Prefer 1px hairlines + inner highlights to define surfaces. Shadows only for floating elements (nav, dialogs).",
    "glass_panels": "bg-white/[0.03-0.06] + border-white/10 + backdrop-blur-xl."
  },
  "accessibility": {
    "contrast": "Keep body text at least white/80 on bg_1; avoid neon text for paragraphs.",
    "focus": "Use visible cyan ring on all inputs/buttons; never remove outline without replacement.",
    "reduced_motion": "Gate animated blobs, parallax, and stagger reveals behind prefers-reduced-motion."
  },
  "image_urls": {
    "background_textures": [
      {
        "url": "https://images.unsplash.com/photo-1661898253201-5c28e174be47?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
        "where": "Optional subtle background texture for About/Notes header (very low opacity).",
        "usage": "as CSS background with opacity 0.06 and blur"
      },
      {
        "url": "https://images.unsplash.com/photo-1641405102586-16de9aed9236?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
        "where": "Hero decorative backdrop layer (masked/blurred).",
        "usage": "absolute positioned; do not exceed 20% visual dominance"
      }
    ],
    "ambient_orbs": [
      {
        "url": "https://images.unsplash.com/photo-1708422932063-151a7395fb20?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
        "where": "Tools page header backdrop (masked), to suggest instrumentation.",
        "usage": "blur + opacity 0.08"
      }
    ],
    "portrait_optional": [
      {
        "url": "https://images.unsplash.com/photo-1661112029068-9c9919af55e5?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
        "where": "About page small portrait card (if you decide to use a photo).",
        "usage": "crop to 1:1, grayscale slightly, keep subtle"
      }
    ]
  },
  "instructions_to_main_agent": [
    "Remove default CRA App.css centering patterns; do not use .App-header centered layout.",
    "Set <body> to dark surfaces and add a global background layer with subtle gridlines + noise.",
    "Implement React Router top-level layout with a fixed GlassNav and page container spacing that accounts for nav height.",
    "Use shadcn/ui components from /src/components/ui (JSX files) only for interactive primitives (NavMenu, Sheet, Dialog, Tabs, Form, Select, Sonner).",
    "Every interactive element and key informational element MUST include data-testid (kebab-case).",
    "For Selected Systems and service tiers, use hierarchy through size, border intensity, and spacing—not neon fills.",
    "Tools must feel like premium operator instruments: structured inputs, calm loading skeleton, bordered output, copy-to-clipboard, and toasts.",
    "Avoid gradients on cards and text-heavy areas; keep gradients only as subtle backdrops and metallic headline treatment."
  ],
  "page_level_wireframe_notes": {
    "home": [
      "HeroSplit (statement + method overview) + Operator Panel",
      "OperatingSequence",
      "SelectedSystems (hierarchical grid)",
      "EcosystemSignalStrip",
      "Tools preview (2 cards linking to Tools)",
      "Work With Me preview (2-tier teaser + CTA)",
      "Final CTA (single strong line + button)"
    ],
    "about": [
      "Philosophy (editorial)",
      "Brand Architecture (Nemurium hierarchy) as stacked panels with subtle connectors",
      "Optional portrait card"
    ],
    "work": [
      "Curated portfolio: Job Forge left/primary; ChurnWise right/secondary; Transplant Tracker as quieter full-width row"
    ],
    "tools": [
      "Tabs for Chaos Translator / Bloat Detector",
      "Input panel -> Output panel with copy + toasts"
    ],
    "work_with_me": [
      "4 tiers grid; each tier includes who it’s for + what you get + CTA"
    ],
    "notes": [
      "Index: editorial list with separators",
      "Detail: constrained width + comfortable leading"
    ],
    "contact": [
      "Intake form with sections and a calm confirmation state"
    ]
  },
  "General UI UX Design Guidelines": [
    "- You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms",
    "- You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text",
    "- NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json",
    " **GRADIENT RESTRICTION RULE**",
    "NEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc",
    "NEVER use dark gradients for logo, testimonial, footer etc",
    "NEVER let gradients cover more than 20% of the viewport.",
    "NEVER apply gradients to text-heavy content or reading areas.",
    "NEVER use gradients on small UI elements (<100px width).",
    "NEVER stack multiple gradient layers in the same viewport.",
    "\n**ENFORCEMENT RULE:**",
    "    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors",
    "\n**How and where to use:**",
    "   • Section backgrounds (not content backgrounds)",
    "   • Hero section header content. Eg: dark to light to dark color",
    "   • Decorative overlays and accent elements only",
    "   • Hero section with 2-3 mild color",
    "   • Gradients creation can be done for any angle say horizontal, vertical or diagonal",
    "\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead.",
    "\n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.",
    "\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.",
    "\n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals."
  ]
}
