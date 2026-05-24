import { render } from "solid-js/web";
import styles from "../public/styles.css?raw";
import { AppShell } from "./shellspace/AppShell";

const root = document.body.firstElementChild;

if (!root) {
  throw new Error("Missing app root");
}

const style = document.createElement("style");
style.textContent = styles;
document.head.append(style);

render(() => <AppShell />, root);
void import("./shellspace/app").then(({ startShellspace }) => startShellspace());
