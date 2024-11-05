import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import hereLogo from "/here.svg";
import "./App.css";
import { SearchInput } from "./components/SearchInput/SearchInput";
import { ChatBubble } from "./components/ChatBubble/ChatBubble";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { getGenerativeModel } from "./services/support.service";
import { styled } from "@mui/material/styles";

const Logo = styled("img")(() => ({
  display: "block",
  height: "30px",
}));

type Params = {
  context: string;
  question: {
    text: string;
  };
  result: string;
};

type Chat = {
  type: "me" | "system";
  content: string;
  isLoading?: boolean;
};

function App() {
  const [chats, setChats] = useState<Chat[]>([]);

  const refBottomAnchor = useRef<HTMLDivElement>(null);

  const restoreChat = (params: Params) => {
    const chats: Chat[] = [
      {
        type: "me",
        content: params.question.text,
      },
      {
        type: "system",
        content: params.result,
      },
    ];
    setChats(chats);
  };

  const loadChats = async () => {
    const { params } = (await chrome.storage.local.get()) as { params: Params };
    if (params.result) {
      restoreChat(params);
    } else {
      generateHelp(params.question.text);
    }
  };

  useEffect(() => {
    loadChats();
  }, []);

  useEffect(() => {
    if (refBottomAnchor.current) {
      refBottomAnchor.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [chats, refBottomAnchor]);

  const generateHelp = async (query: string) => {
    const currentChat = [...chats];

    setChats([
      ...currentChat,
      {
        type: "me",
        content: query,
      },
      {
        type: "system",
        content: "",
        isLoading: true,
      },
    ]);

    const { params } = (await chrome.storage.local.get()) as { params: Params };
    const result = await getGenerativeModel(query, params.context || "");

    setChats([
      ...currentChat,
      {
        type: "me",
        content: query,
      },
      {
        type: "system",
        content:
          result.candidates[0]?.content.parts[0]?.text ||
          "Sorry I can't quite follow this question, could you ask again please",
      },
    ]);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Logo src={hereLogo} alt="Here" />
        </Toolbar>
      </AppBar>
      <Box
        component="section"
        sx={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "32px 32px 180px 32px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {chats.map((chat, idx) => (
          <ChatBubble key={idx} sender={chat.type} isLoading={chat.isLoading}>
            <Markdown>{chat.content}</Markdown>
          </ChatBubble>
        ))}
      </Box>
      <div ref={refBottomAnchor} />
      <SearchInput
        onSearch={async (query) => {
          await generateHelp(query);
        }}
      />
    </Box>
  );
}

export default App;
