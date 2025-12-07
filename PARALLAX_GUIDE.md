# 🎢 Parallax & Scroll-Driven Animationen

## 🚀 Implementierte Features

Ihre Website hat jetzt **die modernsten Parallax & Scroll-Effekte**!

### ✨ Was ist neu:

## 1. 🏔️ **Multi-Layer Parallax Background**

Der Hero-Bereich hat jetzt **3 Parallax-Schichten**:

- **Layer 1** - Bewegt sich am langsamsten (Hintergrund)
- **Layer 2** - Mittlere Geschwindigkeit
- **Layer 3** - Schnellste Bewegung (Vordergrund)

**Effekt:** Tiefeneffekt beim Scrollen! ⛰️

```html
<!-- Automatisch aktiv im Hero! -->
```

---

## 2. ➡️ **Horizontal Scroll on Vertical**

Scrollen Sie vertikal → Elemente bewegen sich **horizontal**!

**Verwendung:**
```html
<div class="horizontal-scroll-trigger">
    <div class="horizontal-scroll-content">
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
    </div>
</div>
```

**Perfekt für:** Galerie, Timeline, Projekte

---

## 3. 🔍 **Zoom on Scroll**

Elemente zoomen rein wenn sie ins Sichtfeld kommen!

```html
<div class="zoom-on-scroll">
    Content zoomt von 1.0 auf 1.2
</div>
```

---

## 4. ↔️ **Text Slide Horizontal**

Text gleitet horizontal beim Scrollen!

```html
<h2 class="text-slide-left">Gleitet nach links</h2>
<h2 class="text-slide-right">Gleitet nach rechts</h2>
```

**Effekt:** Text bewegt sich bis zu 100px horizontal

---

## 5. 🎭 **Reveal Animations**

Verschiedene Reveal-Richtungen:

```html
<div class="reveal-left">Von links einblenden</div>
<div class="reveal-right">Von rechts einblenden</div>
<div class="reveal-up">Von unten einblenden</div>
<div class="reveal-down">Von oben einblenden</div>
```

**Features:**
- Smooth Cubic-Bezier Easing
- Automatische Reveal bei Sichtbarkeit
- Perfekte Timings

---

## 6. ✂️ **Clip-Path Reveals**

Moderne Clip-Path Animationen:

```html
<div class="clip-reveal">
    Reveal von links nach rechts
</div>

<div class="clip-reveal-center">
    Reveal vom Zentrum (Kreis)
</div>
```

---

## 7. 📝 **Split Text Animation**

Text wird Wort-für-Wort oder Buchstabe-für-Buchstabe animiert:

```html
<h1 data-split="words">
    Jedes Wort animiert einzeln
</h1>

<h2 data-split="chars">
    Jeder Buchstabe rotiert rein
</h2>
```

**Effekt:** Professionelle Typo-Animationen!

---

## 8. 🎨 **Color Shift on Scroll**

Farben ändern sich beim Scrollen:

```html
<div class="color-shift">
    Ändert Farbe beim Scroll
</div>
```

**Default:** Weiß → Orange (#e14f0f)

---

## 9. 📍 **Section Progress Indicator**

Rechts am Bildschirm: Punkte zeigen aktive Sektion!

**Features:**
- Automatisch generiert
- Click zum Springen
- Smooth Scroll
- Desktop only

---

## 10. 🖼️ **Image Parallax**

Bilder bewegen sich langsamer als Container:

```html
<div class="image-parallax-wrapper">
    <img src="bild.jpg" class="image-parallax">
</div>
```

**Effekt:** -50px bis +50px Bewegung

---

## 11. 🔄 **Rotate on Scroll**

Elemente rotieren beim Scrollen:

```html
<div class="scroll-rotate">
    Rotiert bis 360°
</div>
```

---

## 12. 🖱️ **Mouse Parallax**

Elemente folgen der Maus (Desktop):

```html
<div class="mouse-parallax" data-mouse-speed="0.2">
    Folgt der Maus
</div>
```

**Speed:** 0.1 (langsam) bis 1.0 (schnell)

---

## 13. ⚡ **Velocity Effects**

Schnelleres Scrollen = stärkere Effekte!

```html
<div class="velocity-scale">
    Skaliert bei schnellem Scroll
</div>
```

---

## 14. 🌊 **Wave Animation**

Für Listen - Elemente wellen sich:

```html
<ul class="wave-container">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
```

**Effekt:** Jedes Item mit Delay

---

## 15. 📐 **Perspective Text**

3D-Text-Effekte:

```html
<div class="perspective-text active">
    <span>3</span>
    <span>D</span>
    <span>!</span>
</div>
```

---

## 16. 📏 **Sticky Scroll Sections**

Sektionen bleiben kleben beim Scroll:

```html
<div class="sticky-scroll-section">
    <div class="sticky-content">
        Klebt beim Scrollen
    </div>
</div>
```

---

## 🎯 **Wie Sie es nutzen:**

### Einfaches Beispiel:

```html
<!-- Service Card mit Parallax -->
<div class="service-card reveal-up zoom-on-scroll">
    <h3 data-split="words">Ihre Überschrift</h3>
    <p>Content</p>
</div>
```

### Komplexes Beispiel:

```html
<!-- Sektion mit allen Effekten -->
<section class="sticky-scroll-section">
    <div class="horizontal-scroll-trigger">
        <div class="horizontal-scroll-content">
            <div class="clip-reveal zoom-on-scroll">
                <img src="bild1.jpg" class="image-parallax">
            </div>
            <div class="reveal-left">
                <h2 data-split="words" class="text-slide-right">
                    Cooler Titel
                </h2>
            </div>
        </div>
    </div>
</section>
```

---

## 🎨 **Geschwindigkeiten anpassen:**

### Parallax Speed:
```html
<div data-speed="0.2">Langsam</div>
<div data-speed="0.5">Mittel (default)</div>
<div data-speed="0.8">Schnell</div>
```

### Mouse Parallax Speed:
```html
<div class="mouse-parallax" data-mouse-speed="0.1">Subtil</div>
<div class="mouse-parallax" data-mouse-speed="0.5">Normal</div>
<div class="mouse-parallax" data-mouse-speed="1.0">Stark</div>
```

---

## 🐛 **Debug-Modus:**

Scroll-Position live sehen:

```
http://localhost:5000/?debug=scroll
```

Zeigt:
- Scroll Position
- Scroll Velocity
- Viewport Height

---

## 📱 **Mobile Optimierung:**

Automatisch angepasst:
- ✅ Reduzierte Parallax
- ✅ Kein Mouse Parallax
- ✅ Optimierte Performance
- ✅ Touch-freundlich

---

## ⚙️ **Performance:**

Alle Effekte nutzen:
- ✅ `requestAnimationFrame`
- ✅ `will-change` Properties
- ✅ GPU-Beschleunigung
- ✅ Throttling
- ✅ Intersection Observer

**Resultat:** Butterweiche 60 FPS!

---

## 🎬 **Testen Sie:**

### 1. **Multi-Layer Parallax:**
- Öffnen Sie die Seite
- Scrollen Sie langsam im Hero-Bereich
- Beachten Sie die **3 Schichten** mit unterschiedlichen Geschwindigkeiten

### 2. **Section Progress:**
- Scrollen Sie nach unten
- Rechts erscheinen **Punkte**
- Click zum Springen

### 3. **Zoom Effect:**
- Service Cards zoomen beim Scrollen

### 4. **Text Slide:**
- Überschriften gleiten horizontal

### 5. **Reveals:**
- Elemente faden von verschiedenen Richtungen ein

### 6. **Mouse Parallax:**
- Bewegen Sie die Maus im Hero
- Elemente folgen subtil

### 7. **Scroll Velocity:**
- Scrollen Sie schnell
- Elemente reagieren stärker

---

## 🎨 **Was macht es besonders:**

| Feature | Standard | Mit Parallax |
|---------|----------|--------------|
| Tiefeneffekt | ❌ | ✅ 3 Layer |
| Horizontal Scroll | ❌ | ✅ Smooth |
| Text Animation | ❌ | ✅ Split |
| Mouse Tracking | ❌ | ✅ Subtil |
| Velocity | ❌ | ✅ Reaktiv |
| Progress | ❌ | ✅ Punkte |

---

## 🔥 **Kombinationen:**

### Hero mit allem:
```html
<section class="hero parallax-container">
    <!-- Multi-Layer Background (automatisch) -->

    <h1 data-split="chars" class="text-gradient-animated">
        Schulzke Bau
    </h1>

    <div class="mouse-parallax" data-mouse-speed="0.3">
        <img src="badge.svg" class="float-element">
    </div>

    <button class="pulse-button liquid-button zoom-on-scroll">
        Jetzt Anfragen
    </button>
</section>
```

### Galerie mit Horizontal Scroll:
```html
<section class="horizontal-scroll-trigger">
    <div class="horizontal-scroll-content">
        <div class="clip-reveal">
            <img src="projekt1.jpg" class="image-parallax">
        </div>
        <div class="clip-reveal">
            <img src="projekt2.jpg" class="image-parallax">
        </div>
        <div class="clip-reveal">
            <img src="projekt3.jpg" class="image-parallax">
        </div>
    </div>
</section>
```

---

## 📊 **Console Output:**

Beim Laden sehen Sie:
```
🎢 Advanced Parallax & Scroll Effects loaded!
📊 Active Features:
  ✓ Multi-layer Parallax
  ✓ Horizontal Scroll on Vertical
  ✓ Zoom Effects
  ✓ Text Slide
  ✓ Reveal Animations
  ✓ Color Shifts
  ✓ Section Progress
  ✓ Mouse Parallax
  ✓ Velocity Effects
  ✓ Wave Animations
```

---

## 🎯 **Nächste Steps:**

1. **Hero anpassen** - Fügen Sie eigene Bilder hinzu
2. **Text splitten** - `data-split="words"` auf Überschriften
3. **Galerie** - Horizontal-Scroll nutzen
4. **Service Cards** - Reveal-Effekte kombinieren
5. **Experimentieren** - Verschiedene Kombinationen

---

## 🚀 **Viel Spaß mit den Parallax-Effekten!**

Ihre Website scrollt jetzt **wie ein modernes Webmagazin**! 🎨

Bei Fragen oder Anpassungswünschen - einfach melden! 💪
