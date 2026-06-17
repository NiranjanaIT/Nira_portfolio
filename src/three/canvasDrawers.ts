import { PortfolioCardData } from "../data/portfolioData";

// Bulletproof compatibility helper for rounded rectangles across all browsers/node contexts
function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number | number[]
) {
  let rTopLeft = 0;
  let rTopRight = 0;
  let rBottomRight = 0;
  let rBottomLeft = 0;

  if (typeof r === "number") {
    rTopLeft = rTopRight = rBottomRight = rBottomLeft = r;
  } else if (Array.isArray(r)) {
    rTopLeft = r[0] || 0;
    rTopRight = r[1] || 0;
    rBottomRight = r[2] || 0;
    rBottomLeft = r[3] || 0;
  }

  ctx.beginPath();
  ctx.moveTo(x + rTopLeft, y);
  ctx.lineTo(x + w - rTopRight, y);
  ctx.arcTo(x + w, y, x + w, y + h, rTopRight);
  ctx.lineTo(x + w, y + h - rBottomRight);
  ctx.arcTo(x + w, y + h, x, y + h, rBottomRight);
  ctx.lineTo(x + rBottomLeft, y + h);
  ctx.arcTo(x, y + h, x, y, rBottomLeft);
  ctx.lineTo(x, y + rTopLeft);
  ctx.arcTo(x, y, x + w, y, rTopLeft);
  ctx.closePath();
}

export function drawCardCanvas(
  ctx: CanvasRenderingContext2D,
  data: PortfolioCardData,
  width: number,
  height: number,
  gdgImage?: HTMLImageElement | null,
  aboutImage?: HTMLImageElement | null
) {
  // Clear background
  ctx.fillStyle = data.bgColor;
  ctx.fillRect(0, 0, width, height);

  // Set default configurations
  const padding = 80;
  const isDark = data.theme === "dark";
  const textColor = data.textColor;
  const accentColor = data.accentColor;

  // Draw elegant background subtle elements (luxury grids or dust/grain dots)
  drawBackgroundDetails(ctx, width, height, isDark);

  // Draw Card Header (Number and Category)
  ctx.fillStyle = accentColor;
  ctx.font = '600 24px "Space Grotesk"';
  ctx.fillText(data.number, padding, padding + 20);

  ctx.fillStyle = isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.5)";
  ctx.font = '500 16px "Inter"';
  ctx.fillText(data.category.toUpperCase(), padding + 50, padding + 18);

  // Draw subtle top line divider
  ctx.strokeStyle = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, padding + 40);
  ctx.lineTo(width - padding, padding + 40);
  ctx.stroke();

  // Draw Layout Specific Content
  switch (data.layoutType) {
    case "cover":
      drawCoverLayout(ctx, data, width, height, padding, textColor, accentColor);
      break;
    case "about":
      drawAboutLayout(ctx, data, width, height, padding, textColor, accentColor, aboutImage);
      break;
    case "contents":
      drawContentsLayout(ctx, data, width, height, padding, textColor, accentColor);
      break;
    case "brand-identity":
      drawBrandIdentityLayout(ctx, data, width, height, padding, textColor, accentColor, gdgImage);
      break;
    case "lyora-skincare":
      drawLyoraSkincareLayout(ctx, data, width, height, padding, textColor, accentColor);
      break;
    case "nova-studio":
      drawNovaStudioLayout(ctx, data, width, height, padding, textColor, accentColor);
      break;
    case "packaging":
      drawPackagingLayout(ctx, data, width, height, padding, textColor, accentColor);
      break;
    case "earthen-candle":
      drawEarthenCandleLayout(ctx, data, width, height, padding, textColor, accentColor);
      break;
    case "editorial":
      drawEditorialLayout(ctx, data, width, height, padding, textColor, accentColor);
      break;
    case "kinfolk-magazine":
      drawKinfolkLayout(ctx, data, width, height, padding, textColor, accentColor);
      break;
    case "poster-design":
      drawPosterLayout(ctx, data, width, height, padding, textColor, accentColor);
      break;
    case "dashboard-ui":
      drawDashboardUiLayout(ctx, data, width, height, padding, textColor, accentColor);
      break;
    case "website-design":
      drawWebsiteLayout(ctx, data, width, height, padding, textColor, accentColor);
      break;
    case "skills":
      drawSkillsLayout(ctx, data, width, height, padding, textColor, accentColor);
      break;
    case "experience":
      drawExperienceLayout(ctx, data, width, height, padding, textColor, accentColor);
      break;
    case "testimonials":
      drawTestimonialsLayout(ctx, data, width, height, padding, textColor, accentColor);
      break;
    case "contact":
      drawContactLayout(ctx, data, width, height, padding, textColor, accentColor);
      break;
    case "thankyou":
      drawThankYouLayout(ctx, data, width, height, padding, textColor, accentColor);
      break;
    default:
      drawDefaultLayout(ctx, data, width, height, padding, textColor, accentColor);
  }

  // Draw Card Footer (Signature / Selected Works mark)
  ctx.fillStyle = isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.4)";
  ctx.font = 'italic 16px serif';
  ctx.fillText("Niranjana Creative", padding, height - padding);
  ctx.font = '500 12px "Inter"';
  ctx.fillText("SCROLL TO EXPLORE", width - padding - 150, height - padding);
}

function drawBackgroundDetails(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  isDark: boolean
) {
  // Draw light layout grids or noise
  ctx.strokeStyle = isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)";
  ctx.lineWidth = 1;
  const gridSpacing = 80;

  for (let x = gridSpacing; x < width; x += gridSpacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  for (let y = gridSpacing; y < height; y += gridSpacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
}

function drawCoverLayout(
  ctx: CanvasRenderingContext2D,
  data: PortfolioCardData,
  width: number,
  height: number,
  padding: number,
  textColor: string,
  accentColor: string
) {
  // Top-Right Metadata
  ctx.fillStyle = "rgba(0,0,0,0.45)";
  ctx.font = '600 13px "Space Grotesk"';
  ctx.textAlign = "right";
  ctx.fillText("PSNA COLLEGE OF ENG & TECH", width - padding, padding + 18);
  ctx.textAlign = "left"; // reset

  // Title (Huge text)
  ctx.fillStyle = textColor;
  ctx.font = '800 110px "Space Grotesk"';
  ctx.fillText("NIRANJANA", padding, height * 0.38);

  // Subtitle
  ctx.fillStyle = "#6366F1"; // premium violet
  ctx.font = '700 24px "Space Grotesk"';
  ctx.fillText("BACKEND DEVELOPER", padding, height * 0.44);

  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.font = '500 18px "Inter"';
  ctx.fillText("3D PORTFOLIO EXPERIENCE", padding, height * 0.49);

  // Short Bio / Intro Paragraph (aligned to the left margin)
  ctx.fillStyle = "rgba(0,0,0,0.72)";
  ctx.font = '400 19px "Inter"';
  const bioText = "B.Tech Information Technology student with a strong foundation in Java, Data Structures, OOP, and Backend Development. Experienced in national-level hackathons and technical leadership roles.";
  wrapText(ctx, bioText, padding, height * 0.54, width - padding * 2, 28);

  // Tech tags pills
  const tagXStart = padding;
  const tagY = height * 0.64;
  const tags = ["JAVA", "SQL", "NODE.JS", "DSA", "DBMS"];
  let currentTagX = tagXStart;

  ctx.font = '600 13px "Space Grotesk"';
  tags.forEach((tag) => {
    const textWidth = ctx.measureText(tag).width;
    const tagW = textWidth + 24;
    const tagH = 32;

    // Draw pill background with light violet tint
    ctx.fillStyle = "rgba(99, 102, 241, 0.07)";
    drawRoundRect(ctx, currentTagX, tagY, tagW, tagH, 8);
    ctx.fill();

    // Draw thin pill border
    ctx.strokeStyle = "rgba(99, 102, 241, 0.2)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw pill text
    ctx.fillStyle = "#6366F1"; // violet
    ctx.fillText(tag, currentTagX + 12, tagY + 20);

    currentTagX += tagW + 12;
  });

  // Scroll button
  const btnY = height * 0.72;
  const btnW = 245;
  const btnH = 55;
  ctx.strokeStyle = "rgba(0,0,0,0.15)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  drawRoundRect(ctx, padding, btnY, btnW, btnH, 28);
  ctx.stroke();

  // Draw arrow and text inside button
  ctx.fillStyle = "#6366F1";
  ctx.beginPath();
  ctx.arc(padding + 30, btnY + btnH/2, 12, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#FFFFFF";
  ctx.font = 'bold 12px "Inter"';
  ctx.fillText("→", padding + 25, btnY + btnH/2 + 4);

  ctx.fillStyle = textColor;
  ctx.font = '600 14px "Space Grotesk"';
  ctx.fillText("SCROLL TO BEGIN", padding + 55, btnY + btnH/2 + 5);

  // Signature on bottom right
  ctx.fillStyle = "rgba(0,0,0,0.6)";
  ctx.font = 'italic 20px serif';
  ctx.fillText("Niranjana M R", width - padding - 150, height * 0.74);

  // Contact shortcut row above the footer
  ctx.fillStyle = "rgba(0,0,0,0.45)";
  ctx.font = '600 13px "Space Grotesk"';
  ctx.fillText("mrniranjana.it@gmail.com   //   github.com/NiranjanaIT   //   Dindigul, Tamil Nadu", padding, height - padding - 36);
}

function drawAboutLayout(
  ctx: CanvasRenderingContext2D,
  data: PortfolioCardData,
  width: number,
  height: number,
  padding: number,
  textColor: string,
  accentColor: string,
  aboutImage?: HTMLImageElement | null
) {
  // Title
  ctx.fillStyle = textColor;
  ctx.font = '700 56px "Space Grotesk"';
  ctx.fillText("ABOUT ME", padding, height * 0.2);

  // Draw circular profile mockup
  const cx = width - padding - 180;
  const cy = height * 0.33;
  const r = 130;

  // Outer ring
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r + 10, 0, Math.PI * 2);
  ctx.stroke();

  // Face Silhouette Vector (Procedural drawing)
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();

  if (aboutImage) {
    // Draw real portrait image of Niranjana
    ctx.drawImage(aboutImage, cx - r, cy - r, r * 2, r * 2);
  } else {
    // Profile Background Gradient
    const grad = ctx.createRadialGradient(cx, cy, 10, cx, cy, r);
    grad.addColorStop(0, "#FEE2E2"); // soft warm rose
    grad.addColorStop(1, "#E0E7FF"); // soft warm indigo
    ctx.fillStyle = grad;
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2);

    // Stylized Portrait (Hair, Face outline, Shoulders in vector block style)
    ctx.fillStyle = "#3730A3"; // indigo 800
    // Shoulders
    ctx.beginPath();
    ctx.ellipse(cx, cy + 120, 100, 70, 0, 0, Math.PI * 2);
    ctx.fill();
    // Head
    ctx.beginPath();
    ctx.arc(cx, cy - 10, 55, 0, Math.PI * 2);
    ctx.fill();
    // Hair bun
    ctx.beginPath();
    ctx.arc(cx + 40, cy - 40, 25, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  // Bio Text
  ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
  ctx.font = '400 18px "Inter"';
  wrapText(ctx, data.description, padding, height * 0.28, width - padding * 2.5 - 280, 26);

  // Details
  ctx.fillStyle = textColor;
  ctx.font = '600 22px "Space Grotesk"';
  ctx.fillText("Highlights:", padding, height * 0.52);

  const details = data.details;
  if (details) {
    ctx.font = '500 18px "Inter"';
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
    details.forEach((detail, index) => {
      ctx.fillText("→ " + detail, padding, height * 0.57 + index * 32);
    });
  }

  // Signature
  ctx.fillStyle = textColor;
  ctx.font = '400 36px serif';
  ctx.fillText("Niranjana.", padding, height * 0.77);
}

function drawContentsLayout(
  ctx: CanvasRenderingContext2D,
  data: PortfolioCardData,
  width: number,
  height: number,
  padding: number,
  textColor: string,
  accentColor: string
) {
  ctx.fillStyle = textColor;
  ctx.font = '700 56px "Space Grotesk"';
  ctx.fillText(data.title.toUpperCase(), padding, height * 0.18);

  ctx.fillStyle = accentColor;
  ctx.font = '600 20px "Space Grotesk"';
  ctx.fillText((data.subtitle || "").toUpperCase(), padding, height * 0.22);

  // Draw Timeline Chapters
  const startY = height * 0.3;
  const spacing = 75;

  const details = data.details;
  if (details) {
    details.forEach((chapter, i) => {
      const y = startY + i * spacing;

      // Draw bullet point
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.arc(padding + 10, y - 6, 8, 0, Math.PI * 2);
      ctx.fill();

      // Connecting line
      if (i < details.length - 1) {
        ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding + 10, y);
        ctx.lineTo(padding + 10, y + spacing);
        ctx.stroke();
      }

      // Title & Text splitting by colon
      const colonIndex = chapter.indexOf(":");
      let part1 = chapter;
      let part2 = "";
      if (colonIndex !== -1) {
        part1 = chapter.substring(0, colonIndex + 1);
        part2 = chapter.substring(colonIndex + 1).trim();
      }

      ctx.fillStyle = textColor;
      ctx.font = '600 22px "Space Grotesk"';
      ctx.fillText(part1, padding + 40, y);
      
      const part1Width = ctx.measureText(part1).width;

      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.font = '500 17px "Inter"';
      ctx.fillText(part2, padding + 40 + part1Width + 12, y);
    });
  }
}

function drawBrandIdentityLayout(
  ctx: CanvasRenderingContext2D,
  data: PortfolioCardData,
  width: number,
  height: number,
  padding: number,
  textColor: string,
  accentColor: string,
  gdgImage?: HTMLImageElement | null
) {
  ctx.fillStyle = textColor;
  ctx.font = '700 56px "Space Grotesk"';
  ctx.fillText(data.title.toUpperCase(), padding, height * 0.18);
  ctx.font = '500 20px "Space Grotesk"';
  ctx.fillStyle = accentColor;
  ctx.fillText((data.subtitle || "").toUpperCase(), padding, height * 0.22);

  // Description
  ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
  ctx.font = '300 18px "Inter"';
  wrapText(ctx, data.cardDescription || data.description, padding, height * 0.27, width - padding * 2, 26);

  // Draw the inauguration photo if available
  if (gdgImage) {
    const imgX = padding + 60;
    const imgY = height * 0.38;
    const imgW = width - padding * 2 - 120;
    const imgH = 360;

    ctx.save();
    // Soft shadow
    ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
    ctx.shadowBlur = 25;

    // Draw white polaroid frame border
    ctx.fillStyle = "#FFFFFF";
    drawRoundRect(ctx, imgX - 12, imgY - 12, imgW + 24, imgH + 24, 16);
    ctx.fill();

    // Clip image to rounded rect
    ctx.beginPath();
    drawRoundRect(ctx, imgX, imgY, imgW, imgH, 8);
    ctx.clip();

    ctx.drawImage(gdgImage, imgX, imgY, imgW, imgH);
    ctx.restore();
  } else {
    // Draw a 3D isometric metallic brand mark mockup fallback
    const cx = width / 2;
    const cy = height * 0.6;
    const size = 160;

    ctx.save();
    // Drawing abstract overlapping isometric squares representing the logo mark
    ctx.shadowColor = "rgba(59, 130, 246, 0.4)";
    ctx.shadowBlur = 30;

    // Gradient fill
    const logoGrad = ctx.createLinearGradient(cx - size, cy - size, cx + size, cy + size);
    logoGrad.addColorStop(0, "#3B82F6");
    logoGrad.addColorStop(1, "#8B5CF6");

    ctx.strokeStyle = logoGrad;
    ctx.lineWidth = 12;
    ctx.lineJoin = "round";

    // First rhombus
    ctx.beginPath();
    ctx.moveTo(cx, cy - size);
    ctx.lineTo(cx + size, cy);
    ctx.lineTo(cx, cy + size);
    ctx.lineTo(cx - size, cy);
    ctx.closePath();
    ctx.stroke();

    // Inside rhombus rotated
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(cx, cy - size * 0.6);
    ctx.lineTo(cx + size * 0.6, cy);
    ctx.lineTo(cx, cy + size * 0.6);
    ctx.lineTo(cx - size * 0.6, cy);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }
}

function drawLyoraSkincareLayout(
  ctx: CanvasRenderingContext2D,
  data: PortfolioCardData,
  width: number,
  height: number,
  padding: number,
  textColor: string,
  accentColor: string
) {
  ctx.fillStyle = textColor;
  ctx.font = '700 50px "Space Grotesk"';
  ctx.fillText(data.title.toUpperCase(), padding, height * 0.18);
  ctx.fillStyle = accentColor;
  ctx.font = '500 18px "Inter"';
  ctx.fillText((data.subtitle || "").toUpperCase(), padding, height * 0.22);

  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.font = '300 18px "Inter"';
  wrapText(ctx, data.description, padding, height * 0.26, width - padding * 2, 26);

  // Draw procedural cosmetic bottle & stone slab
  const bx = width / 2;
  const by = height * 0.65;

  // 1. Stone platform slab
  ctx.fillStyle = "#D1CFC7";
  ctx.beginPath();
  ctx.ellipse(bx, by + 120, 200, 30, 0, 0, Math.PI * 2);
  ctx.fill();

  // Slab Depth
  ctx.fillStyle = "#A8A69E";
  ctx.beginPath();
  ctx.ellipse(bx, by + 130, 200, 30, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(bx - 200, by + 120, 400, 10);

  // 2. Skincare bottle silhouette (cylindrical)
  const bW = 100;
  const bH = 180;
  const bottleGrad = ctx.createLinearGradient(bx - bW/2, by - bH, bx + bW/2, by - bH);
  bottleGrad.addColorStop(0, "#FFFDF9");
  bottleGrad.addColorStop(0.3, "#F4EFE6");
  bottleGrad.addColorStop(0.8, "#DED8CC");
  bottleGrad.addColorStop(1, "#C9C3B5");

  ctx.fillStyle = bottleGrad;
  // Rounded rectangle for main bottle
  drawRoundRect(ctx, bx - bW/2, by - bH + 20, bW, bH - 20, [10, 10, 5, 5]);
  ctx.fill();

  // Bottle Cap (Gold)
  const capH = 35;
  const capGrad = ctx.createLinearGradient(bx - bW/2, by - bH, bx + bW/2, by - bH);
  capGrad.addColorStop(0, "#FCE7F3");
  capGrad.addColorStop(0.4, "#FCD34D"); // gold
  capGrad.addColorStop(0.8, "#B45309"); // dark gold
  capGrad.addColorStop(1, "#78350F");

  ctx.fillStyle = capGrad;
  drawRoundRect(ctx, bx - bW/2 + 5, by - bH - 15, bW - 10, capH, [5, 5, 0, 0]);
  ctx.fill();

  // Label text on bottle
  ctx.fillStyle = "#4B443B";
  ctx.font = '600 16px "Space Grotesk"';
  ctx.textAlign = "center";
  ctx.fillText(data.title.split(" ")[0] || "AICTE", bx, by - bH + 70);
  ctx.font = '300 10px "Inter"';
  ctx.fillText("SWAP PORTAL", bx, by - bH + 90);
  ctx.textAlign = "left"; // restore
}

function drawNovaStudioLayout(
  ctx: CanvasRenderingContext2D,
  data: PortfolioCardData,
  width: number,
  height: number,
  padding: number,
  textColor: string,
  accentColor: string
) {
  ctx.fillStyle = textColor;
  ctx.font = '700 56px "Space Grotesk"';
  ctx.fillText(data.title.toUpperCase(), padding, height * 0.18);
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.font = '300 18px "Inter"';
  wrapText(ctx, data.description, padding, height * 0.23, width - padding * 2, 26);

  // Draw two overlapping business cards
  ctx.save();
  
  // Card 1: Dark Card (tilted)
  ctx.translate(width * 0.42, height * 0.58);
  ctx.rotate(-0.15);
  // shadow
  ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
  ctx.shadowBlur = 15;
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 15;

  ctx.fillStyle = "#111111";
  drawRoundRect(ctx, -150, -90, 300, 180, 8);
  ctx.fill();

  // Text on Card 1
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.fillStyle = "#FFFFFF";
  ctx.font = '700 24px "Space Grotesk"';
  ctx.fillText("SIH 2024", -120, -30);
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.font = '400 10px "Inter"';
  ctx.fillText("NOMINATED TEAM / RURAL SYSTEM", -120, -10);

  ctx.restore();

  // Card 2: Light Card
  ctx.save();
  ctx.translate(width * 0.58, height * 0.65);
  ctx.rotate(0.08);

  ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 10;

  ctx.fillStyle = "#FFFFFF";
  drawRoundRect(ctx, -150, -90, 300, 180, 8);
  ctx.fill();

  // Text on Card 2
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#111111";
  ctx.font = '700 24px "Space Grotesk"';
  ctx.fillText("SAN-FLUSH", -120, -30);
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.font = '500 12px "Inter"';
  ctx.fillText("PSNA College of Eng", -120, 20);
  ctx.fillText("Suction System Design", -120, 40);

  ctx.restore();
}

function drawPackagingLayout(
  ctx: CanvasRenderingContext2D,
  data: PortfolioCardData,
  width: number,
  height: number,
  padding: number,
  textColor: string,
  accentColor: string
) {
  ctx.fillStyle = textColor;
  ctx.font = '700 56px "Space Grotesk"';
  ctx.fillText(data.title.toUpperCase(), padding, height * 0.18);
  ctx.fillStyle = accentColor;
  ctx.font = '600 20px "Space Grotesk"';
  ctx.fillText((data.subtitle || "").toUpperCase(), padding, height * 0.22);

  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = '300 18px "Inter"';
  wrapText(ctx, data.description, padding, height * 0.27, width - padding * 2, 26);

  // Draw premium minimalist black box
  const bx = width / 2;
  const by = height * 0.62;

  ctx.save();
  ctx.shadowColor = "rgba(244, 63, 94, 0.2)";
  ctx.shadowBlur = 30;

  // Box structure (isometric)
  // Front-Left Face
  ctx.fillStyle = "#1E1E26";
  ctx.beginPath();
  ctx.moveTo(bx, by);
  ctx.lineTo(bx - 120, by + 60);
  ctx.lineTo(bx - 120, by + 220);
  ctx.lineTo(bx, by + 160);
  ctx.closePath();
  ctx.fill();

  // Front-Right Face
  ctx.fillStyle = "#121217";
  ctx.beginPath();
  ctx.moveTo(bx, by);
  ctx.lineTo(bx + 120, by + 60);
  ctx.lineTo(bx + 120, by + 220);
  ctx.lineTo(bx, by + 160);
  ctx.closePath();
  ctx.fill();

  // Top Face
  ctx.fillStyle = "#2B2B36";
  ctx.beginPath();
  ctx.moveTo(bx, by);
  ctx.lineTo(bx - 120, by + 60);
  ctx.lineTo(bx, by + 120);
  ctx.lineTo(bx + 120, by + 60);
  ctx.closePath();
  ctx.fill();

  // Glowing rose stripe on the corner joint
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(bx, by);
  ctx.lineTo(bx, by + 160);
  ctx.stroke();

  // Label Text
  ctx.fillStyle = "#FFFFFF";
  ctx.font = '700 16px "Space Grotesk"';
  ctx.fillText(data.title.split(" ")[0] || "EVENT", bx + 20, by + 110);

  ctx.restore();
}

function drawEarthenCandleLayout(
  ctx: CanvasRenderingContext2D,
  data: PortfolioCardData,
  width: number,
  height: number,
  padding: number,
  textColor: string,
  accentColor: string
) {
  ctx.fillStyle = textColor;
  ctx.font = '700 52px "Space Grotesk"';
  ctx.fillText(data.title.toUpperCase(), padding, height * 0.18);
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.font = '300 18px "Inter"';
  wrapText(ctx, data.description, padding, height * 0.23, width - padding * 2, 26);

  // Draw procedural candle
  const cx = width / 2;
  const cy = height * 0.62;

  // Stone slab
  ctx.fillStyle = "#E0DDD5";
  ctx.beginPath();
  ctx.ellipse(cx, cy + 130, 160, 20, 0, 0, Math.PI * 2);
  ctx.fill();

  // Jar (concrete textured circle-ellipse)
  const jR = 75;
  const jH = 110;

  // Back shadow
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
  ctx.beginPath();
  ctx.ellipse(cx, cy + 115, jR, 15, 0, 0, Math.PI * 2);
  ctx.fill();

  const jarGrad = ctx.createLinearGradient(cx - jR, cy - jH, cx + jR, cy - jH);
  jarGrad.addColorStop(0, "#B8B5AD");
  jarGrad.addColorStop(0.3, "#D1CEBF");
  jarGrad.addColorStop(0.7, "#A3A095");
  jarGrad.addColorStop(1, "#8A877E");

  ctx.fillStyle = jarGrad;
  drawRoundRect(ctx, cx - jR, cy - jH + 10, jR * 2, jH - 10, [15, 15, 5, 5]);
  ctx.fill();

  // Inside wax
  ctx.fillStyle = "#F5ECE1";
  ctx.beginPath();
  ctx.ellipse(cx, cy - jH + 10, jR - 2, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  // Wick
  ctx.strokeStyle = "#453322";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cx, cy - jH + 10);
  ctx.lineTo(cx, cy - jH - 5);
  ctx.stroke();

  // Flame
  const flameGrad = ctx.createRadialGradient(cx, cy - jH - 15, 2, cx, cy - jH - 15, 18);
  flameGrad.addColorStop(0, "#FFF5CC");
  flameGrad.addColorStop(0.2, "#FFC04D");
  flameGrad.addColorStop(0.8, "#FF5A1F");
  flameGrad.addColorStop(1, "rgba(255, 90, 31, 0)");

  ctx.fillStyle = flameGrad;
  ctx.beginPath();
  ctx.arc(cx, cy - jH - 15, 18, 0, Math.PI * 2);
  ctx.fill();
}

function drawEditorialLayout(
  ctx: CanvasRenderingContext2D,
  data: PortfolioCardData,
  width: number,
  height: number,
  padding: number,
  textColor: string,
  accentColor: string
) {
  ctx.fillStyle = textColor;
  ctx.font = '700 56px "Space Grotesk"';
  ctx.fillText(data.title.toUpperCase(), padding, height * 0.18);
  ctx.fillStyle = accentColor;
  ctx.font = '500 18px "Inter"';
  ctx.fillText((data.subtitle || "").toUpperCase(), padding, height * 0.22);

  ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
  ctx.font = '300 18px "Inter"';
  wrapText(ctx, data.description, padding, height * 0.27, width - padding * 2, 26);

  // Draw open magazine mockup
  const mx = width / 2;
  const my = height * 0.62;
  const mW = 380;
  const mH = 240;

  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.3)";
  ctx.shadowBlur = 25;

  // Open pages
  ctx.fillStyle = "#EAEAEA";
  // Left Page
  drawRoundRect(ctx, mx - mW/2, my - mH/2, mW/2, mH, [5, 0, 0, 5]);
  ctx.fill();

  // Right Page
  ctx.fillStyle = "#F3F3F3";
  drawRoundRect(ctx, mx, my - mH/2, mW/2, mH, [0, 5, 5, 0]);
  ctx.fill();

  // Center crease shadow
  const crease = ctx.createLinearGradient(mx - 20, my, mx + 20, my);
  crease.addColorStop(0, "rgba(0,0,0,0)");
  crease.addColorStop(0.5, "rgba(0,0,0,0.25)");
  crease.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = crease;
  ctx.fillRect(mx - 20, my - mH/2, 40, mH);

  // Text layout on left page
  ctx.fillStyle = "#222222";
  ctx.font = '700 24px "Space Grotesk"';
  ctx.fillText(data.title.split(" ")[0] || "CODS", mx - mW/2 + 30, my - mH/2 + 50);

  ctx.fillStyle = "#555555";
  ctx.font = '500 11px "Inter"';
  if (data.details) {
    for (let i = 0; i < Math.min(data.details.length, 6); i++) {
      ctx.fillText("• " + data.details[i], mx - mW/2 + 30, my - mH/2 + 80 + i * 18);
    }
  }

  // Graphic / image on right page
  const graphicGrad = ctx.createLinearGradient(mx + 30, my - mH/2 + 30, mx + mW/2 - 30, my + mH/2 - 30);
  graphicGrad.addColorStop(0, "#8B5CF6");
  graphicGrad.addColorStop(1, "#EC4899");
  ctx.fillStyle = graphicGrad;
  ctx.fillRect(mx + 30, my - mH/2 + 30, mW/2 - 60, mH - 60);

  ctx.restore();
}

function drawKinfolkLayout(
  ctx: CanvasRenderingContext2D,
  data: PortfolioCardData,
  width: number,
  height: number,
  padding: number,
  textColor: string,
  accentColor: string
) {
  ctx.fillStyle = textColor;
  ctx.font = '700 52px "Space Grotesk"';
  ctx.fillText(data.title.toUpperCase(), padding, height * 0.18);
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.font = '300 18px "Inter"';
  wrapText(ctx, data.description, padding, height * 0.23, width - padding * 2, 26);

  // Draw Kinfolk open magazine (light theme)
  const mx = width / 2;
  const my = height * 0.62;
  const mW = 400;
  const mH = 260;

  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.12)";
  ctx.shadowBlur = 20;

  // Left Page
  ctx.fillStyle = "#FAF8F5";
  drawRoundRect(ctx, mx - mW/2, my - mH/2, mW/2, mH, [5, 0, 0, 5]);
  ctx.fill();

  // Right Page
  ctx.fillStyle = "#FFFDFB";
  drawRoundRect(ctx, mx, my - mH/2, mW/2, mH, [0, 5, 5, 0]);
  ctx.fill();

  // Center crease shadow
  const crease = ctx.createLinearGradient(mx - 15, my, mx + 15, my);
  crease.addColorStop(0, "rgba(0,0,0,0)");
  crease.addColorStop(0.5, "rgba(0,0,0,0.12)");
  crease.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = crease;
  ctx.fillRect(mx - 15, my - mH/2, 30, mH);

  // Large portrait image on left page (landscape sunset gradient)
  const imgGrad = ctx.createLinearGradient(mx - mW/2 + 25, my - mH/2 + 25, mx - 25, my + mH/2 - 25);
  imgGrad.addColorStop(0, "#FDBA74"); // warm orange
  imgGrad.addColorStop(1, "#C084FC"); // soft purple
  ctx.fillStyle = imgGrad;
  ctx.fillRect(mx - mW/2 + 25, my - mH/2 + 25, mW/2 - 50, mH - 50);

  // Text layout on right page
  ctx.fillStyle = "#3F3E3B";
  ctx.font = 'bold 16px "Space Grotesk"';
  ctx.fillText((data.subtitle || "Internship Project").toUpperCase(), mx + 25, my - mH/2 + 60);

  ctx.fillStyle = "#6E6D6A";
  ctx.font = '500 11px "Inter"';
  if (data.details) {
    for (let i = 0; i < Math.min(data.details.length, 9); i++) {
      ctx.fillText("• " + data.details[i], mx + 25, my - mH/2 + 95 + i * 16);
    }
  }

  ctx.restore();
}

function drawPosterLayout(
  ctx: CanvasRenderingContext2D,
  data: PortfolioCardData,
  width: number,
  height: number,
  padding: number,
  textColor: string,
  accentColor: string
) {
  ctx.fillStyle = textColor;
  ctx.font = '700 56px "Space Grotesk"';
  ctx.fillText(data.title.toUpperCase(), padding, height * 0.18);
  ctx.fillStyle = accentColor;
  ctx.font = '500 18px "Inter"';
  ctx.fillText((data.subtitle || "").toUpperCase(), padding, height * 0.22);

  ctx.fillStyle = "rgba(0,0,0,0.7)";
  ctx.font = '300 18px "Inter"';
  wrapText(ctx, data.description, padding, height * 0.27, width - padding * 2, 26);

  // Draw framed posters
  const px = width / 2;
  const py = height * 0.63;
  const pW = 160;
  const pH = 220;

  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
  ctx.shadowBlur = 18;

  // Frame 1 (Left, slightly angled)
  ctx.save();
  ctx.translate(px - 100, py);
  ctx.rotate(-0.06);
  drawBauhausPoster(ctx, -pW/2, -pH/2, pW, pH);
  ctx.restore();

  // Frame 2 (Right, slightly angled)
  ctx.save();
  ctx.translate(px + 100, py);
  ctx.rotate(0.04);
  drawSwissPoster(ctx, -pW/2, -pH/2, pW, pH);
  ctx.restore();

  ctx.restore();
}

function drawBauhausPoster(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  // Black Frame
  ctx.fillStyle = "#111111";
  ctx.fillRect(x, y, w, h);

  // Poster white board
  ctx.fillStyle = "#FAF6EE";
  ctx.fillRect(x + 6, y + 6, w - 12, h - 12);

  // Bauhaus graphics
  // Red circle
  ctx.fillStyle = "#EF4444";
  ctx.beginPath();
  ctx.arc(x + w * 0.5, y + h * 0.45, w * 0.28, 0, Math.PI * 2);
  ctx.fill();

  // Blue quadrant
  ctx.fillStyle = "#3B82F6";
  ctx.beginPath();
  ctx.moveTo(x + w * 0.2, y + h * 0.7);
  ctx.lineTo(x + w * 0.8, y + h * 0.7);
  ctx.lineTo(x + w * 0.2, y + h * 0.9);
  ctx.closePath();
  ctx.fill();

  // Bauhaus text
  ctx.fillStyle = "#111111";
  ctx.font = 'bold 12px "Space Grotesk"';
  ctx.fillText("BAUHAUS", x + 15, y + 25);
  ctx.font = '400 6px "Inter"';
  ctx.fillText("1923 EXHIBITION", x + 15, y + 35);
}

function drawSwissPoster(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  // Black Frame
  ctx.fillStyle = "#111111";
  ctx.fillRect(x, y, w, h);

  // Poster white board
  ctx.fillStyle = "#F5F5F5";
  ctx.fillRect(x + 6, y + 6, w - 12, h - 12);

  // Grid / Text layout
  ctx.fillStyle = "#111111";
  ctx.font = '900 32px "Space Grotesk"';
  ctx.fillText("neue", x + 15, y + 55);
  ctx.fillText("haas", x + 15, y + 85);

  ctx.fillStyle = "#EF4444";
  ctx.fillRect(x + 15, y + h - 50, w - 30, 4);

  ctx.fillStyle = "#666666";
  ctx.font = '500 6px "Inter"';
  ctx.fillText("SWISS TYPOGRAPHY DESIGN", x + 15, y + h - 35);
  ctx.fillText("ZURICH, SWITZERLAND", x + 15, y + h - 25);
}

function drawDashboardUiLayout(
  ctx: CanvasRenderingContext2D,
  data: PortfolioCardData,
  width: number,
  height: number,
  padding: number,
  textColor: string,
  accentColor: string
) {
  ctx.fillStyle = textColor;
  ctx.font = '700 56px "Space Grotesk"';
  ctx.fillText("DASHBOARD UI", padding, height * 0.18);
  ctx.fillStyle = accentColor;
  ctx.font = '600 20px "Space Grotesk"';
  ctx.fillText("CYBERNETIC DATA CONSOLE", padding, height * 0.22);

  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = '300 18px "Inter"';
  wrapText(ctx, data.description, padding, height * 0.27, width - padding * 2, 26);

  // Draw laptop screen with chart UI
  const lx = width / 2;
  const ly = height * 0.65;
  const sW = 400;
  const sH = 230;

  ctx.save();
  ctx.shadowColor = "rgba(0, 240, 255, 0.2)";
  ctx.shadowBlur = 30;

  // 1. Laptop screen outer bevel
  ctx.fillStyle = "#2D3139";
  drawRoundRect(ctx, lx - sW/2, ly - sH/2, sW, sH, [8, 8, 0, 0]);
  ctx.fill();

  // Screen content
  ctx.fillStyle = "#0A0D14";
  ctx.fillRect(lx - sW/2 + 6, ly - sH/2 + 6, sW - 12, sH - 12);

  // Dashboard grid & charts
  const dX = lx - sW/2 + 15;
  const dY = ly - sH/2 + 15;
  const dW = sW - 30;

  // Chart Grid
  ctx.strokeStyle = "rgba(255,255,255,0.05)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 4; i++) {
    const gy = dY + 60 + i * 40;
    ctx.beginPath();
    ctx.moveTo(dX, gy);
    ctx.lineTo(dX + dW, gy);
    ctx.stroke();
  }

  // Dashboard Header Mock
  ctx.fillStyle = "#FFFFFF";
  ctx.font = '600 12px "Space Grotesk"';
  ctx.fillText("ANALYTICS ENGINE v1.2", dX, dY + 15);

  // Cyber Line Chart (Cyan/Blue glowing line)
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(dX, dY + 140);
  ctx.bezierCurveTo(dX + dW * 0.25, dY + 90, dX + dW * 0.5, dY + 160, dX + dW * 0.75, dY + 70);
  ctx.lineTo(dX + dW, dY + 110);
  ctx.stroke();

  // Glowing joints
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.arc(dX + dW * 0.75, dY + 70, 5, 0, Math.PI * 2);
  ctx.fill();

  // Laptop Base
  ctx.fillStyle = "#464A54";
  drawRoundRect(ctx, lx - sW/2 - 40, ly + sH/2, sW + 80, 15, [0, 0, 8, 8]);
  ctx.fill();

  ctx.fillStyle = "#1E2127";
  ctx.fillRect(lx - 40, ly + sH/2, 80, 5);

  ctx.restore();
}

function drawWebsiteLayout(
  ctx: CanvasRenderingContext2D,
  data: PortfolioCardData,
  width: number,
  height: number,
  padding: number,
  textColor: string,
  accentColor: string
) {
  ctx.fillStyle = textColor;
  ctx.font = '700 56px "Space Grotesk"';
  ctx.fillText("WEBSITE DESIGN", padding, height * 0.18);
  ctx.fillStyle = accentColor;
  ctx.font = '600 20px "Space Grotesk"';
  ctx.fillText("VEKTOR AGENCY HOMEPAGE", padding, height * 0.22);

  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = '300 18px "Inter"';
  wrapText(ctx, data.description, padding, height * 0.27, width - padding * 2, 26);

  // Draw premium browser mockup
  const lx = width / 2;
  const ly = height * 0.65;
  const sW = 420;
  const sH = 240;

  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
  ctx.shadowBlur = 30;

  // Browser frame
  ctx.fillStyle = "#1E1E24";
  drawRoundRect(ctx, lx - sW/2, ly - sH/2, sW, sH, [10, 10, 10, 10]);
  ctx.fill();

  // Header Bar
  ctx.fillStyle = "#2B2B33";
  drawRoundRect(ctx, lx - sW/2, ly - sH/2, sW, 30, [10, 10, 0, 0]);
  ctx.fill();

  // Red, Yellow, Green browser circles
  ctx.fillStyle = "#EF4444"; // red
  ctx.beginPath(); ctx.arc(lx - sW/2 + 20, ly - sH/2 + 15, 5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#FBBF24"; // yellow
  ctx.beginPath(); ctx.arc(lx - sW/2 + 35, ly - sH/2 + 15, 5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#10B981"; // green
  ctx.beginPath(); ctx.arc(lx - sW/2 + 50, ly - sH/2 + 15, 5, 0, Math.PI * 2); ctx.fill();

  // Web page content
  ctx.fillStyle = "#0A0B0F";
  ctx.fillRect(lx - sW/2 + 6, ly - sH/2 + 36, sW - 12, sH - 42);

  // Agency Homepage text
  ctx.fillStyle = "#FFFFFF";
  ctx.font = 'bold 24px "Space Grotesk"';
  ctx.fillText("WE CRAFT", lx - sW/2 + 30, ly - sH/2 + 90);
  ctx.fillText("DIGITAL GOLD", lx - sW/2 + 30, ly - sH/2 + 120);

  // Accent gradient line
  const lGrad = ctx.createLinearGradient(lx - sW/2 + 30, ly, lx + sW/2 - 30, ly);
  lGrad.addColorStop(0, "#3B82F6");
  lGrad.addColorStop(1, "#8B5CF6");
  ctx.fillStyle = lGrad;
  ctx.fillRect(lx - sW/2 + 30, ly - sH/2 + 140, 180, 4);

  // Description subtext
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.font = '500 8px "Inter"';
  ctx.fillText("CREATIVE WEB PRODUCTION © 2026", lx - sW/2 + 30, ly - sH/2 + 175);

  ctx.restore();
}

function drawSkillLogo(ctx: CanvasRenderingContext2D, name: string, x: number, y: number, size: number) {
  ctx.save();
  if (name === "Java") {
    // Red coffee cup with steam lines
    ctx.strokeStyle = "#FF4500";
    ctx.fillStyle = "#FF4500";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Cup body
    ctx.beginPath();
    ctx.moveTo(x + size * 0.3, y + size * 0.45);
    ctx.lineTo(x + size * 0.7, y + size * 0.45);
    ctx.lineTo(x + size * 0.65, y + size * 0.75);
    ctx.bezierCurveTo(x + size * 0.65, y + size * 0.85, x + size * 0.35, y + size * 0.85, x + size * 0.35, y + size * 0.75);
    ctx.closePath();
    ctx.stroke();

    // Handle
    ctx.beginPath();
    ctx.arc(x + size * 0.7, y + size * 0.6, size * 0.12, -Math.PI/2, Math.PI/2);
    ctx.stroke();

    // Steam lines
    ctx.beginPath();
    ctx.moveTo(x + size * 0.42, y + size * 0.35);
    ctx.bezierCurveTo(x + size * 0.4, y + size * 0.25, x + size * 0.46, y + size * 0.25, x + size * 0.44, y + size * 0.15);
    ctx.moveTo(x + size * 0.52, y + size * 0.35);
    ctx.bezierCurveTo(x + size * 0.5, y + size * 0.25, x + size * 0.56, y + size * 0.25, x + size * 0.54, y + size * 0.15);
    ctx.moveTo(x + size * 0.62, y + size * 0.35);
    ctx.bezierCurveTo(x + size * 0.6, y + size * 0.25, x + size * 0.66, y + size * 0.25, x + size * 0.64, y + size * 0.15);
    ctx.stroke();
  } else if (name === "SQL") {
    // Database cylinders (blue/teal)
    ctx.strokeStyle = "#00758F";
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const drawCylinder = (cy: number, h: number) => {
      ctx.beginPath();
      ctx.ellipse(x + size/2, cy, size * 0.25, size * 0.08, 0, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(x + size/2, cy + h, size * 0.25, size * 0.08, 0, 0, Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + size * 0.25, cy);
      ctx.lineTo(x + size * 0.25, cy + h);
      ctx.moveTo(x + size * 0.75, cy);
      ctx.lineTo(x + size * 0.75, cy + h);
      ctx.stroke();
    };

    drawCylinder(y + size * 0.22, size * 0.16);
    drawCylinder(y + size * 0.48, size * 0.16);
  } else if (name === "Node") {
    // Node.js green hexagon
    ctx.strokeStyle = "#339933";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    const sides = 6;
    const radius = size * 0.32;
    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides - Math.PI / 6;
      const px = x + size/2 + radius * Math.cos(angle);
      const py = y + size/2 + radius * Math.sin(angle);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();

    // Wavy node-like leaf shape inside
    ctx.fillStyle = "#339933";
    ctx.beginPath();
    ctx.ellipse(x + size/2, y + size/2, size * 0.1, size * 0.18, Math.PI / 6, 0, 2 * Math.PI);
    ctx.fill();
  } else if (name === "C++") {
    // Blue target/C++ icon
    ctx.strokeStyle = "#659AD2";
    ctx.fillStyle = "#659AD2";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(x + size/2, y + size/2, size * 0.3, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.font = `bold ${Math.round(size * 0.28)}px "Space Grotesk"`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("C++", x + size/2, y + size/2 + 1);
  } else if (name === "Git") {
    // Orange Git branch diamond
    ctx.save();
    ctx.translate(x + size/2, y + size/2);
    ctx.rotate(Math.PI / 4);
    ctx.strokeStyle = "#F05032";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.rect(-size*0.22, -size*0.22, size*0.44, size*0.44);
    ctx.stroke();
    ctx.restore();

    ctx.strokeStyle = "#F05032";
    ctx.fillStyle = "#F05032";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";

    // Main line
    ctx.beginPath();
    ctx.moveTo(x + size * 0.4, y + size * 0.3);
    ctx.lineTo(x + size * 0.4, y + size * 0.7);
    ctx.stroke();

    // Branch line
    ctx.beginPath();
    ctx.arc(x + size * 0.4, y + size * 0.5, size * 0.2, Math.PI, Math.PI * 1.5, false);
    ctx.stroke();

    // Nodes
    const drawDot = (cx: number, cy: number) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 3.5, 0, Math.PI*2);
      ctx.fill();
    };
    drawDot(x + size * 0.4, y + size * 0.3);
    drawDot(x + size * 0.4, y + size * 0.7);
    drawDot(x + size * 0.6, y + size * 0.3);
  } else if (name === "Cld") {
    // Cloud icon
    ctx.strokeStyle = "#4285F4";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    const cx = x + size/2;
    const cy = y + size/2 + size * 0.05;
    ctx.arc(cx - size * 0.15, cy, size * 0.12, Math.PI * 0.8, Math.PI * 1.5);
    ctx.arc(cx, cy - size * 0.15, size * 0.16, Math.PI * 1.1, Math.PI * 1.9);
    ctx.arc(cx + size * 0.15, cy, size * 0.12, Math.PI * 1.5, Math.PI * 2.2);
    ctx.lineTo(cx - size * 0.18, cy);
    ctx.closePath();
    ctx.stroke();
  } else if (name === "Fltr") {
    // Flutter overlapping chevrons
    ctx.strokeStyle = "#02569B";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(x + size * 0.35, y + size * 0.3);
    ctx.lineTo(x + size * 0.65, y + size * 0.5);
    ctx.lineTo(x + size * 0.35, y + size * 0.7);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + size * 0.5, y + size * 0.3);
    ctx.lineTo(x + size * 0.8, y + size * 0.5);
    ctx.lineTo(x + size * 0.5, y + size * 0.7);
    ctx.stroke();
  } else if (name === "DSA") {
    // Linked graph nodes for DSA
    ctx.strokeStyle = "#FF6B6B";
    ctx.fillStyle = "#FF6B6B";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    const nx1 = x + size * 0.3;
    const ny1 = y + size * 0.35;
    const nx2 = x + size * 0.7;
    const ny2 = y + size * 0.3;
    const nx3 = x + size * 0.5;
    const ny3 = y + size * 0.7;

    ctx.beginPath();
    ctx.moveTo(nx1, ny1);
    ctx.lineTo(nx2, ny2);
    ctx.lineTo(nx3, ny3);
    ctx.closePath();
    ctx.stroke();

    const drawDot = (cx: number, cy: number) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 4.5, 0, Math.PI*2);
      ctx.fill();
    };
    drawDot(nx1, ny1);
    drawDot(nx2, ny2);
    drawDot(nx3, ny3);
  }
  ctx.restore();
}

function drawSkillsLayout(
  ctx: CanvasRenderingContext2D,
  data: PortfolioCardData,
  width: number,
  height: number,
  padding: number,
  textColor: string,
  accentColor: string
) {
  ctx.fillStyle = textColor;
  ctx.font = '700 56px "Space Grotesk"';
  ctx.fillText("TOOLS I USE", padding, height * 0.18);
  ctx.fillStyle = accentColor;
  ctx.font = '600 20px "Space Grotesk"';
  ctx.fillText("SOFTWARE STACK", padding, height * 0.22);

  // Draw 3D-style software pill icons grid
  const startX = padding;
  const startY = height * 0.32;
  const rowH = 95;
  const colW = 380; // Widen columns to prevent overlapping

  const tools = [
    { name: "Java", desc: "Core & DSA", col: "#FFA116" },
    { name: "SQL", desc: "DBMS & Mongo", col: "#00758F" },
    { name: "Node", desc: "REST Backend", col: "#339933" },
    { name: "C++", desc: "Core Coding", col: "#659AD2" },
    { name: "Git", desc: "Version Control", col: "#F05032" },
    { name: "Cld", desc: "AWS / GCP", col: "#4285F4" },
    { name: "Fltr", desc: "GDG Lead", col: "#02569B" },
    { name: "DSA", desc: "250+ Solved", col: "#FF6B6B" }
  ];

  tools.forEach((tool, i) => {
    const row = Math.floor(i / 2);
    const col = i % 2;
    const tx = startX + col * colW;
    const ty = startY + row * rowH;
    const cardW = colW - 30;
    const cardH = rowH - 20;

    // Drawing pill/card box
    ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
    ctx.strokeStyle = "rgba(0, 0, 0, 0.06)";
    ctx.lineWidth = 1;
    drawRoundRect(ctx, tx, ty, cardW, cardH, 12);
    ctx.fill();
    ctx.stroke();

    // Draw Vector Logo icon on the left
    drawSkillLogo(ctx, tool.name, tx + 12, ty + (cardH - 46)/2, 46);

    // Tool Name
    ctx.fillStyle = textColor;
    ctx.font = 'bold 20px "Space Grotesk"';
    ctx.fillText(tool.name, tx + 75, ty + 32);

    // Tool description
    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
    ctx.font = '500 13px "Inter"';
    ctx.fillText(tool.desc, tx + 75, ty + 53);
  });
}

function drawExperienceLayout(
  ctx: CanvasRenderingContext2D,
  data: PortfolioCardData,
  width: number,
  height: number,
  padding: number,
  textColor: string,
  accentColor: string
) {
  ctx.fillStyle = textColor;
  ctx.font = '700 56px "Space Grotesk"';
  ctx.fillText(data.title.toUpperCase(), padding, height * 0.18);
  ctx.fillStyle = accentColor;
  ctx.font = '600 20px "Space Grotesk"';
  ctx.fillText((data.subtitle || "").toUpperCase(), padding, height * 0.22);

  const startY = height * 0.32;
  const spacing = 110;

  const details = data.details;
  if (details) {
    details.forEach((exp, i) => {
      const y = startY + i * spacing;

      // Safely split year/milestone and description
      const parts = exp.split(": ");
      let year = "";
      let desc = "";
      if (parts.length > 1) {
        year = parts[0];
        desc = parts[1];
      } else {
        year = "★";
        desc = exp;
      }

      // Draw timeline nodes
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.arc(padding + 10, y - 6, 8, 0, Math.PI * 2);
      ctx.fill();

      // vertical track
      if (i < details.length - 1) {
        ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding + 10, y);
        ctx.lineTo(padding + 10, y + spacing);
        ctx.stroke();
      }

      // Year / Accent text
      ctx.fillStyle = textColor;
      ctx.font = 'bold 22px "Space Grotesk"';
      ctx.fillText(year, padding + 35, y);

      // Job description / Certification info
      ctx.fillStyle = "rgba(0, 0, 0, 0.65)";
      ctx.font = '500 16px "Inter"';
      wrapText(ctx, desc, padding + 35, y + 25, width - padding * 2 - 50, 24);
    });
  }
}

function drawTestimonialsLayout(
  ctx: CanvasRenderingContext2D,
  data: PortfolioCardData,
  width: number,
  height: number,
  padding: number,
  textColor: string,
  accentColor: string
) {
  ctx.fillStyle = textColor;
  ctx.font = '700 52px "Space Grotesk"';
  ctx.fillText("CODING PROFILES", padding, height * 0.18);
  ctx.fillStyle = accentColor;
  ctx.font = '600 20px "Space Grotesk"';
  ctx.fillText("ALGORITHMS & REPOS", padding, height * 0.22);

  // Draw 3 profile boxes
  const profiles = [
    {
      platform: "LeetCode",
      handle: "Niranjana_M_R",
      metric: "Data Structures & Algos",
      color: "#FFA116"
    },
    {
      platform: "CodeChef",
      handle: "niranjanamr_14",
      metric: "Competitive Programming",
      color: "#5B4636"
    },
    {
      platform: "GitHub",
      handle: "NiranjanaIT",
      metric: "Open Source Codebases",
      color: "#8B5CF6"
    }
  ];

  profiles.forEach((p, i) => {
    const py = height * 0.28 + i * 140;
    const boxW = width - padding * 2;
    const boxH = 110;

    // Draw box
    ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
    ctx.strokeStyle = "rgba(0, 0, 0, 0.08)";
    ctx.lineWidth = 1.5;
    drawRoundRect(ctx, padding, py, boxW, boxH, 12);
    ctx.fill();
    ctx.stroke();

    // Side accent bar
    ctx.fillStyle = p.color;
    drawRoundRect(ctx, padding + 2, py + 10, 8, boxH - 20, 4);
    ctx.fill();

    // Platform
    ctx.fillStyle = textColor;
    ctx.font = '700 22px "Space Grotesk"';
    ctx.fillText(p.platform.toUpperCase(), padding + 35, py + 45);

    // Handle
    ctx.fillStyle = accentColor;
    ctx.font = '600 18px "Inter"';
    ctx.fillText(p.handle, padding + 35, py + 80);

    // Description info
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.font = '500 14px "Inter"';
    ctx.fillText(p.metric, padding + boxW * 0.45, py + 62);
  });
}

function drawContactLayout(
  ctx: CanvasRenderingContext2D,
  data: PortfolioCardData,
  width: number,
  height: number,
  padding: number,
  textColor: string,
  accentColor: string
) {
  ctx.fillStyle = textColor;
  ctx.font = '700 56px "Space Grotesk"';
  ctx.fillText("GET IN TOUCH", padding, height * 0.18);
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.font = '300 18px "Inter"';
  wrapText(ctx, data.description, padding, height * 0.23, width - padding * 2, 26);

  // Draw form input fields (mocked visual fields)
  const inputs = ["Name", "Email Address", "Your Message"];
  const startY = height * 0.32;
  const inputH = 65;
  const spacing = 95;

  inputs.forEach((label, i) => {
    const y = startY + i * spacing;
    const isMsg = i === 2;
    const currH = isMsg ? 120 : inputH;

    // Label
    ctx.fillStyle = textColor;
    ctx.font = '600 16px "Space Grotesk"';
    ctx.fillText(label.toUpperCase(), padding, y);

    // Box
    ctx.strokeStyle = "rgba(0, 0, 0, 0.15)";
    ctx.lineWidth = 1.5;
    ctx.fillStyle = "#FFFFFF";
    drawRoundRect(ctx, padding, y + 15, width - padding * 2, currH, 6);
    ctx.fill();
    ctx.stroke();

    // Mock text input
    if (i === 0) {
      ctx.fillStyle = "#777777";
      ctx.font = '500 16px "Inter"';
      ctx.fillText("Enter your name...", padding + 15, y + 42);
    } else if (i === 1) {
      ctx.fillStyle = "#777777";
      ctx.font = '500 16px "Inter"';
      ctx.fillText("you@example.com", padding + 15, y + 42);
    }
  });

  // Draw Button
  const btnY = startY + 3 * spacing + 30;
  ctx.fillStyle = "#111111";
  drawRoundRect(ctx, padding, btnY, width - padding * 2, 60, 6);
  ctx.fill();

  ctx.fillStyle = "#FFFFFF";
  ctx.font = 'bold 18px "Space Grotesk"';
  ctx.textAlign = "center";
  ctx.fillText("SEND MESSAGE", width / 2, btnY + 36);
  ctx.textAlign = "left";
}

function drawThankYouLayout(
  ctx: CanvasRenderingContext2D,
  data: PortfolioCardData,
  width: number,
  height: number,
  padding: number,
  textColor: string,
  accentColor: string
) {
  // Center alignment for Thank You Page
  ctx.textAlign = "center";

  // Title
  ctx.fillStyle = textColor;
  ctx.font = '800 80px "Space Grotesk"';
  ctx.fillText("THANK YOU", width / 2, height * 0.35);

  // Subtitle
  ctx.fillStyle = accentColor;
  ctx.font = '500 24px "Space Grotesk"';
  ctx.fillText("FOR WATCHING & EXPLORING", width / 2, height * 0.43);

  // Divider
  ctx.strokeStyle = "rgba(0, 0, 0, 0.08)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(width * 0.3, height * 0.49);
  ctx.lineTo(width * 0.7, height * 0.49);
  ctx.stroke();

  // Subtext
  ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
  ctx.font = '300 18px "Inter"';
  wrapText(ctx, data.description, width / 2, height * 0.54, width - padding * 3, 26);

  ctx.textAlign = "left"; // Restore default
}

function drawDefaultLayout(
  ctx: CanvasRenderingContext2D,
  data: PortfolioCardData,
  width: number,
  height: number,
  padding: number,
  textColor: string,
  accentColor: string
) {
  // Fallback layout
  ctx.fillStyle = textColor;
  ctx.font = '700 50px "Space Grotesk"';
  ctx.fillText(data.title, padding, height * 0.22);

  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.font = '400 18px "Inter"';
  wrapText(ctx, data.description, padding, height * 0.32, width - padding * 2, 28);
}

// Text wrapping helper
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  const isCentered = ctx.textAlign === "center";

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, currentY);
      line = words[n] + " ";
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, currentY);
}
