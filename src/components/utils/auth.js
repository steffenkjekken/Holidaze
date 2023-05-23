import { load } from "./storage";

export function updateLoginVisibility() {
    const token = load("AuthToken");
    document.body.classList[token ? "add" : "remove"]("logged-in");
  }