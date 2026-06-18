# 🎨 NewForm Editorial Portfolio

A premium, interactive editorial portfolio website for **Ashish Ranjan**, a Java Full Stack Developer based in Bengaluru, India. 

Designed like an editorial magazine, this project combines classic architectural sketches of iconic Bengaluru landmarks with high-end, scroll-driven 3D physics and smooth layouts.

---

## ✨ Design & Interactivity Highlights

- **📑 Page Stacking Effect**: A multi-layered section stacking flow on desktop. As you scroll, earlier sections scale down and fade out slightly, creating a physical sense of page depth.
- **🗿 Scroll-Driven 3D Perspective**: The hero headline and main graphics tilt and slide back in Z-space based on the precise coordinates of your scroll.
- **✨ Cursor-Tracking Glassmorphism**: High-end 3D tilt interaction on the intro card, complete with a shining light reflection that follows your cursor.
- **⚡ Glaring Project & Contact Cards**: Project entries and the contact form dynamically tilt on mouse move and feature radial-gradient glare highlights tracking the mouse.
- **🏛️ Bengaluru Editorial Theme**: Architectural pen-and-ink sketches of Bengaluru's historic structures (Vidhana Soudha, Lalbagh Glasshouse, Bangalore Palace, Nandi at Bull Temple Basavanagudi) set against an editorial grain/noise filter.
- **🎯 Full Interactive Suite**:
  - Custom page preloader.
  - Sticky nav header with scroll-state switching.
  - Page scroll progress tracker.
  - Smooth anchor link scrolling.
  - Slide-out mobile navigation overlay with Escape-key closure.
  - Animate on Scroll (AOS) integrations.

---

## 🛠️ Technology Stack

- **Frontend Core**: Semantic HTML5 & CSS3 variables.
- **Typography**: Playfair Display, DM Serif Display, and Inter via Google Fonts.
- **Icons**: [Devicon](https://devicon.dev/) for high-quality developer skill marks.
- **Animations**: [AOS (Animate On Scroll)](https://github.com/michalsnik/aos) for entry transitions.
- **Interactivity**: Pure ES6+ JavaScript.

---

## 📂 Project Structure

```text
NewForm-Portfolio/
├── index.html          # Structural sections: Hero, About, Projects, Skills, Timeline, Contact & Footer
├── style.css           # Design tokens, grain noise, section stacking, and hover 3D transforms
├── script.js           # 3D physics, scroll-driven perspective, mouse light glare, and mobile overlay
├── ranjan_resume.pdf   # Ashish Ranjan's professional resume for download
└── images/             # Architectural ink drawings and project mockup screenshots
    ├── vidhana-soudha.png
    ├── lalbagh-glasshouse.png
    ├── bangalore-palace.png
    ├── bull-temple.png
    ├── project-ecommerce.png
    └── project-food.png
```

---

## 🚀 How to Run Locally

Since this is a lightweight frontend project, running it locally requires no dependencies:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ranjan0910/newPortfolio.git
   ```
2. **Navigate into the folder**:
   ```bash
   cd NewForm-Portfolio
   ```
3. **Open index.html**:
   - Double-click `index.html` to run in any browser.
   - For optimal asset rendering, launch with a local server like **VS Code Live Server** or Python's server:
     ```bash
     python -m http.server 8000
     ```

---

## 🌐 Live Deployment

To host this website live on **GitHub Pages**:

1. Go to your GitHub repository (**Settings** > **Pages**).
2. Choose **Deploy from a branch** under the Source section.
3. Select the `main` branch and the `/ (root)` folder.
4. Click **Save**.
5. Your page will be live at `https://ranjan0910.github.io/newPortfolio/`!
