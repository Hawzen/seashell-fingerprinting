import { render } from "solid-js/web";
import { AppShell } from "./components/AppShell";

const root = document.querySelector("#root");

if (!root) {
  throw new Error("Missing #root");
}

render(() => <AppShell />, root);
void import("./shellspace-app").then(({ startShellspace }) => startShellspace());
