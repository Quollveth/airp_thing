import type { Agent } from "@/stores/types";
import type { Message } from "@/logic/model";

export async function StreamReader(
  response: Response,
  textCallback: (output: string) => void,
): Promise<string> {
  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("Response body is not readable");
  }

  const decoder = new TextDecoder();
  let buffer = "";
  let text = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      while (true) {
        const lineEnd = buffer.indexOf("\n");
        if (lineEnd === -1) break;

        const line = buffer.slice(0, lineEnd).trim();
        buffer = buffer.slice(lineEnd + 1);

        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") break;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices[0].delta.content;
            if (content) {
              text += content;
              //
              textCallback(content);
              //
            }
          } catch (e) {
            // Ignore invalid JSON
          }
        }
      }
    }
  } finally {
    reader.cancel();
  }

  return text;
}

export async function Chat(
  agent: Agent,
  history: Message[],
  textCallback: (output: string) => void,
): Promise<string> {
  const messages: Message[] = agent.SystemPrompts.map((p) => {
    return { role: "system", content: p };
  }).concat(history);

  console.log("Messages sent");
  console.log(messages);

  const response = await fetch(agent.Endpoint.endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${agent.Endpoint.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: agent.Endpoint.modelName,
      messages: messages,
      stream: true,
    }),
  });

  return StreamReader(response, textCallback);
}

export type LogicResponse = {
  stats: { [key: string]: number };
  entities: string[];
};

export async function AskLogic(agent: Agent): Promise<LogicResponse> {
  const messages: Message[] = agent.SystemPrompts.map((p) => {
    return { role: "system", content: p };
  });

  const response = await fetch(agent.Endpoint.endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${agent.Endpoint.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: agent.Endpoint.modelName,
      messages: messages,
      stream: false,
    }),
  });

  const text = await response.text();
  const parsed = JSON.parse(text);

  const aiJason = parsed.choices[0].message.content;
  const gameState = JSON.parse(aiJason);

  return gameState;
}
