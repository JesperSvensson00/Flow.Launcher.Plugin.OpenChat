import open from "open";

import { Flow, JSONRPCResponse } from "flow-launcher-helper";
import { FlowParameters } from "flow-launcher-helper/lib/types";

type Methods = "open";

interface Settings {
  chatUrl: string | undefined;
}

const { on, showResult, run, settings } = new Flow<Methods, Settings>(
  "Images\\app.png"
);

on("query", async (params: FlowParameters) => {
  showResult({
    title: "Open Chat",
    subtitle: `Prompt: ${params}`,
    method: "open",
    params: [params, settings.chatUrl ?? "https://chatgpt.com/?prompt="],
    score: 0,
  });
});

on("open", (params) => {
  const prompt = params[0] as string;

  const baseUrl = params[1];

  open(`${baseUrl}${prompt}`);
});

run();
