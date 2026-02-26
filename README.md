# Chrome Themes

A collection of 21 Chrome browser themes generated from a color palette database.

## Themes

### Dark Themes (16)

| Theme | bg | bg_alt | bg_highlight | fg | fg_muted | accent | accent2 |
|---|---|---|---|---|---|---|---|
| [Tokyo Night](themes/tokyo-night/) | `#1a1b26` | `#16161e` | `#292e42` | `#a9b1d6` | `#565f89` | `#7aa2f7` | `#bb9af7` |
| [Dracula](themes/dracula/) | `#282a36` | `#21222c` | `#44475a` | `#f8f8f2` | `#6272a4` | `#bd93f9` | `#ff79c6` |
| [Nord](themes/nord/) | `#2e3440` | `#3b4252` | `#434c5e` | `#eceff4` | `#7b88a1` | `#88c0d0` | `#b48ead` |
| [Gruvbox Dark](themes/gruvbox-dark/) | `#282828` | `#1d2021` | `#3c3836` | `#ebdbb2` | `#928374` | `#fabd2f` | `#fb4934` |
| [One Dark](themes/one-dark/) | `#282c34` | `#21252b` | `#3e4451` | `#abb2bf` | `#5c6370` | `#61afef` | `#c678dd` |
| [Monokai](themes/monokai/) | `#272822` | `#1e1f1c` | `#3e3d32` | `#f8f8f2` | `#75715e` | `#a6e22e` | `#f92672` |
| [Catppuccin Mocha](themes/catppuccin-mocha/) | `#1e1e2e` | `#181825` | `#313244` | `#cdd6f4` | `#6c7086` | `#cba6f7` | `#f38ba8` |
| [Material Dark](themes/material-dark/) | `#212121` | `#1a1a1a` | `#383838` | `#eeffff` | `#546e7a` | `#80cbc4` | `#c792ea` |
| [Palenight](themes/palenight/) | `#292d3e` | `#1b1e2b` | `#3c4055` | `#a6accd` | `#676e95` | `#c792ea` | `#82aaff` |
| [Rosé Pine](themes/rose-pine/) | `#191724` | `#1f1d2e` | `#26233a` | `#e0def4` | `#6e6a86` | `#ebbcba` | `#c4a7e7` |
| [SynthWave '84](themes/synthwave-84/) | `#2a2139` | `#241b2f` | `#3c2d51` | `#ffffff` | `#848bbd` | `#ff7edb` | `#36f9f6` |
| [Everforest Dark](themes/everforest-dark/) | `#2d353b` | `#272e33` | `#3d484d` | `#d3c6aa` | `#7a8478` | `#a7c080` | `#e67e80` |
| [Kanagawa](themes/kanagawa/) | `#1f1f28` | `#16161d` | `#2a2a37` | `#dcd7ba` | `#727169` | `#7e9cd8` | `#957fb8` |
| [Ayu Dark](themes/ayu-dark/) | `#0d1017` | `#131721` | `#1f2430` | `#bfbdb6` | `#5c6773` | `#ff8f40` | `#59c2ff` |
| [GitHub Dark](themes/github-dark/) | `#0d1117` | `#161b22` | `#21262d` | `#c9d1d9` | `#484f58` | `#58a6ff` | `#bc8cff` |
| [Solarized Dark](themes/solarized-dark/) | `#002b36` | `#073642` | `#0d4756` | `#839496` | `#586e75` | `#268bd2` | `#2aa198` |

### Light Themes (5)

| Theme | bg | bg_alt | bg_highlight | fg | fg_muted | accent | accent2 |
|---|---|---|---|---|---|---|---|
| [Solarized Light](themes/solarized-light/) | `#fdf6e3` | `#eee8d5` | `#e4dcc8` | `#657b83` | `#93a1a1` | `#268bd2` | `#2aa198` |
| [Gruvbox Light](themes/gruvbox-light/) | `#fbf1c7` | `#f2e5bc` | `#ebdbb2` | `#3c3836` | `#928374` | `#b57614` | `#9d0006` |
| [Catppuccin Latte](themes/catppuccin-latte/) | `#eff1f5` | `#e6e9ef` | `#dce0e8` | `#4c4f69` | `#9ca0b0` | `#8839ef` | `#d20f39` |
| [GitHub Light](themes/github-light/) | `#ffffff` | `#f6f8fa` | `#eaeef2` | `#24292f` | `#8c959f` | `#0969da` | `#8250df` |
| [Rosé Pine Dawn](themes/rose-pine-dawn/) | `#faf4ed` | `#fffaf3` | `#f2e9e1` | `#575279` | `#9893a5` | `#d7827e` | `#b4637a` |

## Usage

Install any theme by loading it as an unpacked extension:

1. Open `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked**
4. Select the `themes/<theme-id>/` directory

## Generating Themes

Themes are generated from `db/themes.json` using the generator script:

```bash
# Generate all themes
node scripts/generate.js

# Generate a specific theme
node scripts/generate.js --theme dracula

# Generate all themes + update README.md
node scripts/generate.js --readme

# Dry run (no file writes)
node scripts/generate.js --dry-run
```

## Adding a New Theme

1. Add an entry to `db/themes.json` with the 7 palette colors
2. Run `node scripts/generate.js --readme`
3. Load `themes/<your-theme-id>/` in Chrome to test
