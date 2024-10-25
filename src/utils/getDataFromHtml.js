import medium from "../assets/images/medium.png"

export function extractFirstImageSrc(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");
  const img = doc.querySelector("img");
  return img ? img.src : medium;
}

export function extractFirstParagraphText(htmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const paragraph = doc.querySelector('p');
  return paragraph ? paragraph.textContent : null;
}
