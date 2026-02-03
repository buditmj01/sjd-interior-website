# Hero Banner Setup Guide - Fully Customizable

The Hero Banner is now **100% customizable** from Strapi CMS!

## 🎨 What You Can Customize

### 1. **Headline** (Text with line breaks)
- First 2 lines: Large text
- Additional lines: Smaller supporting text
- Use line breaks to separate lines

### 2. **Background**
- Upload image OR video
- System auto-detects type

### 3. **CTA Button Text**
- Customize button label

### 4. **CTA Button Action**
- **WhatsApp**: Opens WhatsApp consultation
- **Internal Page**: Links to page in your website

---

## 🚀 Quick Setup

### Step 1: Enable Permissions
1. Open http://localhost:1337/admin
2. **Settings** → **Users & Permissions** → **Roles** → **Public**
3. Find **Hero-banner** → Check ✅ **find**
4. Click **Save**

### Step 2: Create Content
1. **Content Manager** → **Hero Banner**
2. Fill in fields:

   **Headline:**
   ```
   Semua Berawal
   Dari Rumah
   dengan desain interior yang personal dan fungsional.
   ```
   *(Each line on a new line)*

   **Background:** Upload your image or video

   **CTA Text:** `Mulai Konsultasi`

   **CTA Type:** Choose `whatsapp` or `internal_page`

   **CTA Page URL:** `/hubungi-kami` (if using internal_page)

3. Click **Save**

### Step 3: Preview
Visit http://localhost:4321 🎉

---

## 📋 Field Details

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| **Headline** | Text (multiline) | Hero text - first 2 lines are large, rest are smaller | `Semua Berawal\nDari Rumah\ndengan desain...` |
| **Background** | Media | Image (JPG/PNG) or Video (MP4) - auto-detected | hero-bg.jpg or hero-video.mp4 |
| **CTA Text** | Text | Button label | `Mulai Konsultasi` or `Hubungi Kami` |
| **CTA Type** | Dropdown | Button action type | `whatsapp` or `internal_page` |
| **CTA Page URL** | Text | Internal page URL (only for internal_page type) | `/portfolio` or `/hubungi-kami` |

---

## 💡 How Line Breaks Work

### Input (in Strapi):
```
Semua Berawal
Dari Rumah
dengan desain interior yang personal dan fungsional.
```

### Output (on website):
```
┌─────────────────────────────────────┐
│  Semua Berawal           (Large)    │ ← Line 1
│  Dari Rumah              (Large)    │ ← Line 2
│  dengan desain interior  (Small)    │ ← Line 3+
│  yang personal...        (Small)    │
│                                     │
│  [Mulai Konsultasi]                 │
└─────────────────────────────────────┘
```

**Rule:** First 2 lines = Large text, Lines 3+ = Smaller supporting text

---

## 🔘 CTA Button Options

### Option 1: WhatsApp Consultation
```
CTA Text:     Mulai Konsultasi
CTA Type:     whatsapp
CTA Page URL: (ignored)
```
**Result:** Opens WhatsApp with pre-filled message

### Option 2: Internal Page
```
CTA Text:     Lihat Portfolio
CTA Type:     internal_page
CTA Page URL: /portfolio
```
**Result:** Links to /portfolio page

### More Examples:
```
CTA Text:     Hubungi Kami
CTA Type:     internal_page
CTA Page URL: /hubungi-kami
```

```
CTA Text:     Konsultasi Gratis
CTA Type:     whatsapp
```

---

## 📸 Media Recommendations

### Images:
- **Format:** JPG or PNG
- **Size:** 1920x1080px or larger
- **File Size:** Under 2MB
- **Content:** High contrast for white text

### Videos:
- **Format:** MP4 (H.264)
- **Size:** 1920x1080px (Full HD)
- **Duration:** 10-30 seconds
- **File Size:** Under 10MB
- **Content:** Subtle motion, avoid fast cuts

---

## ✨ Example Configurations

### Example 1: Classic Real Estate
```
Headline:
  Semua Berawal
  Dari Rumah
  yang nyaman dan penuh kehangatan.

CTA Text:     Mulai Konsultasi
CTA Type:     whatsapp
Background:   cozy-home.jpg
```

### Example 2: Modern Professional
```
Headline:
  Wujudkan Ruang
  Impian Anda
  dengan tim desainer berpengalaman.

CTA Text:     Lihat Portfolio
CTA Type:     internal_page
CTA Page URL: /portfolio
Background:   modern-office-video.mp4
```

### Example 3: Minimalist
```
Headline:
  Desain Interior
  Yang Personal
  sesuai kepribadian dan gaya hidup Anda.

CTA Text:     Hubungi Kami
CTA Type:     internal_page
CTA Page URL: /hubungi-kami
Background:   minimalist-room.jpg
```

---

## 🎯 Tips for Best Results

### For Headline:
1. **Keep it concise** - 2-4 lines maximum
2. **First 2 lines** should be your main message (shown large)
3. **Lines 3+** for supporting details (shown smaller)
4. **Use line breaks** to control text size
5. **Test readability** on white text overlay

### For CTA Button:
1. **Keep text short** - 2-3 words ideal
2. **Use action verbs** - "Mulai", "Lihat", "Hubungi"
3. **WhatsApp** for direct consultation
4. **Internal page** for showcasing work first

### For Background:
1. **Dark/contrasted backgrounds** work best
2. **Videos** should have subtle motion
3. **Compress files** before upload
4. **Test on mobile** for performance

---

## 🔧 Common Patterns

### Pattern 1: Direct Consultation
```
Headline: Strong call-to-action message
CTA Type: whatsapp
```
**Use when:** You want immediate leads

### Pattern 2: Showcase First
```
Headline: Inspirational message
CTA Type: internal_page → /portfolio
```
**Use when:** You want to show your work first

### Pattern 3: Information First
```
Headline: Service description
CTA Type: internal_page → /hubungi-kami
```
**Use when:** You want users to learn more first

---

## 📱 Available Internal Pages

```
/portfolio          - Your work showcase
/hubungi-kami       - Contact form
/alur-kerja         - Work process
/insight            - Blog/articles
```

---

## 🔄 How to Update

### Change Headline:
1. Go to Hero Banner in Content Manager
2. Edit **Headline** field
3. Use **line breaks** (press Enter) to separate lines
4. First 2 lines will be large, rest will be smaller
5. Save

### Change Background:
1. Click **Remove** on current background
2. Click **Add Media** → Upload new image/video
3. Save

### Change Button:
1. Edit **CTA Text** for button label
2. Select **CTA Type**:
   - `whatsapp` for WhatsApp
   - `internal_page` for website page
3. If `internal_page`, set **CTA Page URL** (e.g., `/portfolio`)
4. Save

---

## ✅ Pre-Launch Checklist

- [ ] Permissions enabled for Hero-banner API
- [ ] Hero Banner entry created
- [ ] Headline text added (with proper line breaks)
- [ ] Background uploaded (image or video)
- [ ] CTA text customized
- [ ] CTA type selected
- [ ] CTA page URL set (if using internal_page)
- [ ] Changes saved
- [ ] Tested on desktop
- [ ] Tested on mobile
- [ ] Button link verified

---

## 🆘 Troubleshooting

**Text not breaking into lines?**
- Make sure you pressed **Enter** (not just space) between lines
- First 2 lines should be on separate lines in the text field

**Button not going to right page?**
- Check **CTA Type** is set correctly
- If `internal_page`, verify **CTA Page URL** starts with `/`
- If `whatsapp`, ignore CTA Page URL field

**WhatsApp not opening?**
- Make sure CTA Type is set to `whatsapp`
- WhatsApp number is taken from Contact Info settings

**Video not playing?**
- Check file is MP4 format
- Ensure file size under 10MB
- Try with image first to confirm setup works

---

## 🎉 You're All Set!

The Hero Banner now gives you complete control over:
- ✅ Every word of text
- ✅ How text is sized (via line breaks)
- ✅ Background image or video
- ✅ Button label
- ✅ Button destination

**CMS URL:** http://localhost:1337/admin
**Frontend:** http://localhost:4321

Happy customizing! 🚀
