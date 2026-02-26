#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

// ── Color utilities ──────────────────────────────────────────────────────────

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function rgbToHsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [h, s, l];
}

function hslToRgb([h, s, l]) {
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function clamp(v, min = 0, max = 255) {
  return Math.max(min, Math.min(max, v));
}

function lighten(rgb, amount) {
  const [h, s, l] = rgbToHsl(rgb);
  return hslToRgb([h, s, Math.min(1, l + amount)]).map(v => clamp(v));
}

function darken(rgb, amount) {
  const [h, s, l] = rgbToHsl(rgb);
  return hslToRgb([h, s, Math.max(0, l - amount)]).map(v => clamp(v));
}

function blend(rgb1, rgb2, ratio) {
  // ratio=1 → rgb1, ratio=0 → rgb2
  return rgb1.map((c, i) => Math.round(c * ratio + rgb2[i] * (1 - ratio))).map(v => clamp(v));
}

// ── Manifest builder ─────────────────────────────────────────────────────────

function buildManifest(theme) {
  const { id, name, description, dark, palette } = theme;

  const bg           = hexToRgb(palette.bg);
  const bgAlt        = hexToRgb(palette.bg_alt);
  const bgHighlight  = hexToRgb(palette.bg_highlight);
  const fg           = hexToRgb(palette.fg);
  const fgMuted      = hexToRgb(palette.fg_muted);
  const accent       = hexToRgb(palette.accent);

  const frameInactive          = dark ? lighten(bg, 0.03)          : darken(bg, 0.03);
  const frameIncognitoInactive = dark ? lighten(bgHighlight, 0.03) : darken(bgHighlight, 0.03);
  const omniboxSelected        = blend(accent, bg, 0.3);

  const colors = {
    frame:                                    bg,
    frame_inactive:                           frameInactive,
    frame_incognito:                          bgHighlight,
    frame_incognito_inactive:                 frameIncognitoInactive,
    toolbar:                                  bgAlt,
    toolbar_text:                             fg,
    toolbar_button_icon:                      fgMuted,
    tab_text:                                 accent,
    tab_background_text:                      fg,
    background_tab:                           bgAlt,
    background_tab_text:                      fgMuted,
    background_tab_inactive:                  bgAlt,
    background_tab_incognito:                 bgHighlight,
    background_tab_incognito_inactive:        bgHighlight,
    ntp_background:                           bg,
    ntp_text:                                 fg,
    ntp_link:                                 accent,
    ntp_section:                              bgHighlight,
    ntp_section_text:                         fgMuted,
    ntp_header:                               accent,
    omnibox_background:                       bgAlt,
    omnibox_text:                             fg,
    omnibox_results_background:               bgAlt,
    omnibox_results_background_hovered:       bgHighlight,
    omnibox_results_background_selected:      omniboxSelected,
    omnibox_results_text:                     fg,
    omnibox_results_url:                      accent,
    omnibox_results_text_dimmed:              fgMuted,
    bookmark_text:                            accent,
    button_background:                        bgHighlight,
    control_button_background:                bgHighlight,
    sidebar_background:                       bgAlt,
    sidebar_text:                             fg,
    sidebar_border:                           bgHighlight,
  };

  return {
    manifest_version: 3,
    version: "1.0",
    name: `${name} Theme`,
    description,
    author: "masaki39",
    theme: {
      colors,
      properties: {
        ntp_logo_alternate: dark ? 1 : 0,
      },
    },
  };
}

// ── README generator ─────────────────────────────────────────────────────────

function rgbToHex([r, g, b]) {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

function buildReadme(themes) {
  const darkThemes  = themes.filter(t => t.dark);
  const lightThemes = themes.filter(t => !t.dark);

  const rows = (list) => list.map(t => {
    const p = t.palette;
    const swatch = (hex) => `\`${hex}\``;
    return `| [${t.name}](themes/${t.id}/) | ${swatch(p.bg)} | ${swatch(p.bg_alt)} | ${swatch(p.bg_highlight)} | ${swatch(p.fg)} | ${swatch(p.fg_muted)} | ${swatch(p.accent)} |`;
  }).join('\n');

  const header = `| Theme | bg | bg_alt | bg_highlight | fg | fg_muted | accent |
|---|---|---|---|---|---|---|`;

  return `# Chrome Themes

A collection of ${themes.length} Chrome browser themes generated from a color palette database.

## Themes

### Dark Themes (${darkThemes.length})

${header}
${rows(darkThemes)}

### Light Themes (${lightThemes.length})

${header}
${rows(lightThemes)}

## Usage

Install any theme by loading it as an unpacked extension:

1. Open \`chrome://extensions/\`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the \`themes/<theme-id>/\` directory

## Generating Themes

Themes are generated from \`db/themes.json\` using the generator script:

\`\`\`bash
# Generate all themes
node scripts/generate.js

# Generate a specific theme
node scripts/generate.js --theme dracula

# Generate all themes + update README.md
node scripts/generate.js --readme

# Dry run (no file writes)
node scripts/generate.js --dry-run
\`\`\`

## Adding a New Theme

1. Add an entry to \`db/themes.json\` with the 6 palette colors
2. Run \`node scripts/generate.js --readme\`
3. Load \`themes/<your-theme-id>/\` in Chrome to test

## Reference Implementation

\`tokyo-night/\` is a hand-crafted reference implementation kept unchanged.
`;
}

// ── CLI ──────────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);
  const dryRun   = args.includes('--dry-run');
  const withReadme = args.includes('--readme');
  const themeArg = (() => {
    const i = args.indexOf('--theme');
    return i !== -1 ? args[i + 1] : null;
  })();

  const root = path.resolve(__dirname, '..');
  const dbPath = path.join(root, 'db', 'themes.json');

  if (!fs.existsSync(dbPath)) {
    console.error(`Error: ${dbPath} not found`);
    process.exit(1);
  }

  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  const themes = themeArg
    ? db.themes.filter(t => t.id === themeArg)
    : db.themes;

  if (themes.length === 0) {
    console.error(`No themes found${themeArg ? ` matching "${themeArg}"` : ''}`);
    process.exit(1);
  }

  console.log(`Generating ${themes.length} theme(s)${dryRun ? ' (dry-run)' : ''}...`);

  for (const theme of themes) {
    const manifest = buildManifest(theme);
    const outDir  = path.join(root, 'themes', theme.id);
    const outFile = path.join(outDir, 'manifest.json');
    const json    = JSON.stringify(manifest, null, 2);

    if (dryRun) {
      console.log(`  [dry-run] Would write ${outFile}`);
      console.log(json);
    } else {
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(outFile, json + '\n', 'utf8');
      console.log(`  ✓ ${theme.id}`);
    }
  }

  if (withReadme && !dryRun) {
    const readmePath = path.join(root, 'README.md');
    fs.writeFileSync(readmePath, buildReadme(db.themes), 'utf8');
    console.log(`  ✓ README.md`);
  }

  console.log('Done.');
}

main();
