import fs from "fs";
import path from "path";

// For a given path, gets all the folders and subfolders that contain at least one file named "page.jsx"
export function getPagePaths(startPath) {
  let result = [];

  // Check if the directory contains "page.jsx"
  if (fs.existsSync(path.join(startPath, "page.jsx"))) {
    result.push(startPath);
  }

  // Traverse subdirectories
  fs.readdirSync(startPath).forEach((item) => {
    const itemPath = path.join(startPath, item);
    const stat = fs.statSync(itemPath);

    if (stat && stat.isDirectory()) {
      result = result.concat(getPagePaths(itemPath)); // traverse recursively
    }
  });

  return result;
}
const appDir = path.join(process.cwd(), "app");

export function UrlFromPagePath(path) {
  const relativePath = path.substring(appDir.length + 1);
  const route = relativePath.replace(/\.tsx?$/, "").replace(/\/index$/, "");
  return route
    .split("/")
    .filter((segment) => !segment.startsWith("("))
    .join("/");
}

export const filePaths = getPagePaths(appDir);

const excludedPatterns = [
  // contains /denied
  /\/denied/,
  // contains /admin
  /\/admin/,
  // contains /legal
  /\/legal/,
  // contains /user
  /\/user/,
  // contains /artist
  /\/artist/,
  // contains /settings
  /\/settings/,
  // contains /contacto
  /\/contacto/,
  // contains /tatuadores/saved
  /\/tatuadores\/saved/,
  // contains /tatuadores/boards
  /\/tatuajes\/boards/,
  // contains [ or ]
  /\[|\]/,
];

export const projectUrls = filePaths
  .filter(
    (filePath) => !excludedPatterns.some((pattern) => pattern.test(filePath)),
  )
  .map(UrlFromPagePath);
