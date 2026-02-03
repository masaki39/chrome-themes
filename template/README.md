# Chrome Theme Template

This is a comprehensive template for creating custom Chrome themes. It includes all available theme properties with detailed comments.

## How to Use This Template

1. **Copy this directory** to create a new theme:

   ```bash
   cp -r template my-theme-name
   ```

2. **Edit `manifest.json`**:
   - Update `name`, `description`, and `author` fields
   - Customize colors in the `colors` section
   - Add images to the `images` section (optional)
   - Adjust tints in the `tints` section (optional)
   - Configure properties in the `properties` section (optional)

3. **Remove unused properties**: The template includes all available properties for reference. You can delete any properties you don't need.

4. **Test your theme**: Load the unpacked extension in Chrome (see Installation below)

## Color Format

Colors use RGB array format:

```json
"frame": [26, 27, 38]
```

Where:

- First value: Red (0-255)
- Second value: Green (0-255)
- Third value: Blue (0-255)

### Converting Hex to RGB

If you have a hex color like `#1a1b26`:

- Red: `0x1a` = 26
- Green: `0x1b` = 27
- Blue: `0x26` = 38

Result: `[26, 27, 38]`

## Image Format

Images should be:

- **Format**: PNG (recommended for transparency)
- **Paths**: Relative to the manifest.json file
- **Organization**: Store images in an `images/` subdirectory

Example structure:

```
my-theme/
├── manifest.json
├── README.md
└── images/
    ├── theme_frame.png
    ├── theme_toolbar.png
    └── ntp_background.png
```

### Image Sizing Recommendations

- **Frame images** (`theme_frame`): Should be at least 1920x200px (wider is better for large displays)
- **Toolbar images** (`theme_toolbar`): Should be at least 1920x128px
- **NTP background** (`theme_ntp_background`): Should be at least 1920x1080px (higher resolutions recommended)
- **Button backgrounds**: Should be small, typically 32x32px or 48x48px

## Tints Format

Tints use HSL (Hue, Saturation, Lightness) array format with decimal values (0-1):

```json
"buttons": [0.5, 0.8, 0.4]
```

Where:

- **Hue** (0-1): Color wheel position (0 = red, 0.33 = green, 0.66 = blue, 1 = red again)
- **Saturation** (0-1): Color intensity (0 = grayscale, 1 = full color)
- **Lightness** (0-1): Brightness (-1 = black, 0 = normal, 1 = white)

Note: Lightness can sometimes accept values from -1 to 1, where negative values darken.

## Properties Section

The `properties` section controls special behaviors:

- **`ntp_background_alignment`**: Position of NTP background image
  - Values: `"top"`, `"bottom"`, `"left"`, `"right"`, `"center"`

- **`ntp_background_repeat`**: How NTP background repeats
  - Values: `"no-repeat"`, `"repeat"`, `"repeat-x"`, `"repeat-y"`

- **`ntp_logo_alternate`**: Google logo color on New Tab Page
  - `0`: Use colored Google logo (for light themes)
  - `1`: Use white Google logo (for dark themes)

## Installation Instructions

### Method 1: Load Unpacked Extension (For Testing)

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right corner)
3. Click **Load unpacked**
4. Select your theme directory (the folder containing `manifest.json`)
5. Your theme will be applied immediately

### Method 2: Pack Extension (For Distribution)

1. In `chrome://extensions/` with Developer mode enabled
2. Click **Pack extension**
3. Select your theme directory as the extension root
4. Click **Pack Extension**
5. Chrome will create a `.crx` file (installable theme) and a `.pem` file (private key)
6. Share the `.crx` file with others (keep the `.pem` file private for updates)

## Customization Tips

### For Dark Themes

- Set `ntp_logo_alternate` to `1` for white Google logo
- Use dark colors for backgrounds (`frame`, `toolbar`, `ntp_background`)
- Use light colors for text (`toolbar_text`, `tab_text`, `ntp_text`)
- Ensure good contrast for readability

### For Light Themes

- Set `ntp_logo_alternate` to `0` for colored Google logo
- Use light colors for backgrounds
- Use dark colors for text
- Test in different lighting conditions

### Color Harmony

- Choose a consistent color palette (5-9 colors max)
- Use a color scheme generator (Adobe Color, Coolors, etc.)
- Test complementary colors for accents (`ntp_link`, `button_background`)
- Maintain consistent saturation and brightness across similar elements

## Chrome Theme Documentation

Official resources:

- [Chrome Theme Documentation](https://developer.chrome.com/docs/extensions/mv3/themes/)
- [Theme Color Reference](https://developer.chrome.com/docs/extensions/reference/theme/)
- [Manifest V3 Migration](https://developer.chrome.com/docs/extensions/mv3/intro/)

## Troubleshooting

### Theme Not Applying

- Check that `manifest.json` is valid JSON (no trailing commas, proper quotes)
- Verify the `manifest_version` is set to `3`
- Check browser console for errors (`chrome://extensions/` → click "Details" → "Errors")

### Colors Not Showing

- Ensure RGB values are within 0-255 range
- Check that color names match exactly (case-sensitive)
- Some colors override others (e.g., `tab_background_text` vs `tab_text`)

### Images Not Loading

- Verify image paths are relative to `manifest.json`
- Check that images are PNG format
- Ensure images exist in the specified paths
- Check file permissions

## Notes

- Chrome generates a `Cached Theme.pak` file when loading your theme - this is normal and should be ignored in git
- Colors take precedence over images when both are specified
- Not all properties need to be set - Chrome will use defaults for undefined properties
- Comments in JSON are not standard - remove them before distributing if you encounter issues
