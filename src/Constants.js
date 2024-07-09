const MODE = "prod"
export const CURRENT_HOST =
  MODE === "dev"
    ? "http://localhost:5000"
    : "https://ipaynow.io";

export const CURRENT_CLIENT =
  MODE === "dev"
    ? "http://localhost:5173"
    : "https://ipaynow.io";

export const isMobile = window.screen.width < 768;