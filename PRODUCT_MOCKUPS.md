# Haven Product Mockup Strategy

## Overview
This document outlines what product images you'll need and how to acquire/create them. Currently, the site uses color gradient placeholders - these instructions show you how to replace them with actual photography.

## Product Lineup (4 patterns)

### 1. Beni Ourain
**Style:** Classic geometric, minimalist
**Colors:** Cream & Charcoal
**Target aesthetic:** Scandinavian meets Moroccan, clean, high-end

**What you need:**
- Flat lay of folded cover (45°angle shot)
- Close-up of geometric pattern (texture detail)
- Lifestyle shot: cover draped over/in front of TV (styled, minimal furniture)
- Color swatch reference

**Photography tips:**
- Shoot on neutral background (white or light gray)
- Natural lighting (window light is ideal)
- Show the weave texture clearly
- Include size indicator (label or scale)

**Acquisition options:**
- **DIY:** Shoot physical samples with a decent camera/phone
- **AI Generated:** Use Midjourney, DALL-E, or Stable Diffusion with prompt:
  > "Overhead flat lay of cream and charcoal geometric Moroccan Berber wool textile, minimalist style, professional product photography, white background, natural lighting, high contrast pattern"
- **Stock Photo:** Search "Moroccan textile geometric" on Unsplash, Pexels, or purchase from Shutterstock

### 2. Terracotta Geometric
**Style:** Warm, earthy, almost archaeological
**Colors:** Terracotta, Saffron, Cream
**Target aesthetic:** Artisan, handmade, warm

**What you need:**
- Folded cover showing full pattern (angled)
- Close-up of terracotta/saffron geometric work
- Lifestyle: hanging or displayed (earthy, curated space)
- Color palette reference

**Photography tips:**
- Warm, golden hour lighting
- Show the warm color tones
- Emphasize the handmade quality
- Include shadow detail for dimension

**Acquisition options:**
- **AI Generated:** 
  > "Flat lay of terracotta and saffron geometric woven textile, Moroccan style, handmade aesthetic, natural fibers, rustic artisan quality, warm lighting, professional product shot"
- **DIY:** Shoot with warm lighting (golden hour, warm LED)
- **Stock:** Search "terracotta geometric textile" or "Moroccan kilim"

### 3. Indigo Kilim
**Style:** Deep, sophisticated, traditional
**Colors:** Deep Indigo (solid or subtle pattern)
**Target aesthetic:** Luxury, heritage, timeless

**What you need:**
- Folded cover highlighting indigo depth
- Close-up of pattern/weave (show the texture of indigo)
- Lifestyle: installed on TV (dark, moody, elegant room)
- Indigo dye reference (shows traditional dyeing)

**Photography tips:**
- Dramatic lighting (stronger shadows)
- Emphasize depth of indigo color
- Show texture of traditional weaving
- Consider dark background to show color richness

**Acquisition options:**
- **AI Generated:**
  > "Overhead shot of deep indigo woven textile, traditional Moroccan kilim style, hand-dyed natural indigo, subtle geometric pattern, professional product photography, dramatic lighting"
- **DIY:** Shoot with darker backgrounds, careful white balance
- **Stock:** Search "indigo textile" or "traditional indigo dye"

### 4. Saffron Nomadic
**Style:** Vibrant, bohemian, nomadic
**Colors:** Saffron, Rust, Cream
**Target aesthetic:** Adventurous, tribal, vibrant

**What you need:**
- Folded cover showing pattern variety
- Close-up of nomadic/tribal pattern detail
- Lifestyle: in desert or natural setting (if possible)
- Color reference (saffron spice comparison?)

**Photography tips:**
- Vibrant, warm colors
- Show multiple pattern zones
- Bohemian styling
- Texture and depth in pattern

**Acquisition options:**
- **AI Generated:**
  > "Flat lay of saffron and rust colored Berber nomadic textile, tribal geometric patterns, natural wool, handwoven, warm desert tones, professional product photography, rich color palette"
- **DIY:** Shoot outdoors with warm natural lighting
- **Stock:** Search "Berber textile nomadic" or "saffron colored textile"

## Implementation Plan

### Phase 1: Get Images (Week 1)
- [ ] Choose acquisition method for each pattern
- [ ] Create AI prompts or order stock photos
- [ ] Receive images and organize in folders
- [ ] Review image quality and style consistency

### Phase 2: Optimize Images (Week 2)
- [ ] Resize to 1200x1200px (homepage grid)
- [ ] Create 2000x2000px version (product detail page)
- [ ] Optimize file size (aim for <500KB per image)
- [ ] Convert to WebP format for faster loading
- [ ] Create 150x150px thumbnails (cart display)

### Phase 3: Update Website (Week 2)
- [ ] Update image paths in `app.js` (change filenames)
- [ ] Update product descriptions to reference actual images
- [ ] Test all pages with real images
- [ ] Verify loading performance
- [ ] Deploy updated site

## Image Specifications

### Homepage Grid (Product Cards)
- **Dimensions:** 400x400px (or square ratio)
- **Format:** WebP, fallback JPG
- **File size:** Max 150KB
- **Purpose:** Product discovery

### Product Detail Page
- **Dimensions:** 1200x1200px (large, zoomable)
- **Format:** WebP, fallback JPG
- **File size:** Max 300KB
- **Purpose:** Detailed inspection, size context

### Cart/Order Confirmation
- **Dimensions:** 80x80px (thumbnail)
- **Format:** WebP
- **File size:** Max 20KB
- **Purpose:** Order summary

### Lifestyle Shots (Optional)
- **Dimensions:** 1600x900px (wide, banner style)
- **Format:** WebP
- **File size:** Max 400KB
- **Purpose:** Hero section or category headers

## AI Prompt Formula

If using AI generation, use this formula for consistency:

```
[Subject] [of specific textile/pattern], [Moroccan/Berber style descriptor], 
[color description], [mood/aesthetic], [photography style], 
[lighting], [background], [composition], professional product photography
```

Example:
> "Flat lay of terracotta and saffron woven textile, Moroccan geometric patterns, warm earthy tones, artisan handmade aesthetic, natural lighting, white background, overhead composition, professional product photography"

## Stock Photo Resources

If purchasing/using stock:

### Free Resources
- **Unsplash** (unsplash.com) - High quality, free to use
- **Pexels** (pexels.com) - Similar to Unsplash
- **Pixabay** (pixabay.com) - Large collection
- Search terms: "moroccan textile", "kilim", "berber", "indigo dye", "woven pattern"

### Paid Resources
- **Shutterstock** - Large collection, reasonable prices
- **Adobe Stock** - High quality, integrates with Creative Suite
- **Alamy** - Curated artisan/craft images
- **Getty Images** - Premium, expensive

### Affordable AI Options
- **Midjourney** ($10-30/month) - Best for textile patterns
- **DALL-E 3** ($0.10-0.20 per image) - Via ChatGPT Plus
- **Stable Diffusion** (free or low cost) - Community models
- **Leonardo AI** (free tier available) - Good for product photography

## File Organization

```
haven/
├── images/
│   ├── products/
│   │   ├── beni-ourain-400.webp
│   │   ├── beni-ourain-1200.webp
│   │   ├── terracotta-geometric-400.webp
│   │   ├── terracotta-geometric-1200.webp
│   │   ├── indigo-kilim-400.webp
│   │   ├── indigo-kilim-1200.webp
│   │   ├── saffron-nomadic-400.webp
│   │   └── saffron-nomadic-1200.webp
│   └── lifestyle/
│       ├── hero-minimal-room.webp
│       ├── tv-with-cover.webp
│       └── moroccan-aesthetic.webp
└── (rest of site files)
```

## Code Updates for Real Images

### Update app.js
Change from placeholder colors to actual images:

```javascript
const products = [
    {
        id: 'beni-ourain',
        name: 'Beni Ourain',
        image: 'images/products/beni-ourain-400.webp', // Changed from 'beni-ourain.jpg'
        // ... rest of product data
    },
    // ... other products
];
```

### Update HTML
Change the placeholder to actual image:

```html
<!-- Before -->
<div class="product-image">
    <div style="background: linear-gradient(...)">Product Image</div>
</div>

<!-- After -->
<div class="product-image">
    <img src="images/products/beni-ourain-400.webp" alt="Beni Ourain Moroccan TV Cover">
</div>
```

## Quality Checklist

Before going live:
- [ ] All 4 products have high-quality images
- [ ] Images are consistent in style/color grading
- [ ] Images are properly optimized (WebP format, <500KB)
- [ ] Images load quickly (test with DevTools throttling)
- [ ] Product detail pages show images clearly
- [ ] Cart displays product thumbnails
- [ ] Responsive design works on mobile with images
- [ ] Lifestyle shots add to brand story

## Timeline & Cost Estimate

### Option A: AI Generation (Fastest)
- Time: 2-3 hours
- Cost: $20-50 (credits for Midjourney/DALL-E)
- Quality: High, consistent style
- Timeline: Same week

### Option B: Stock Photos (Quality)
- Time: 3-4 hours
- Cost: $50-200 (depending on source)
- Quality: Professional, diverse styles
- Timeline: Same week

### Option C: DIY Photography (Authentic)
- Time: 4-8 hours
- Cost: $0-100 (equipment if needed)
- Quality: Authentic, unique
- Timeline: 1-2 weeks

### Option D: Hybrid (Recommended)
- Use AI for placeholder visualization
- Purchase 1-2 lifestyle shots
- DIY product detail shots
- Cost: $30-80
- Timeline: 1 week

## Next Steps

1. Choose your image acquisition strategy
2. Create or source images for all 4 products
3. Optimize images to specifications
4. Update `app.js` with actual image filenames
5. Test thoroughly
6. Deploy updated site
