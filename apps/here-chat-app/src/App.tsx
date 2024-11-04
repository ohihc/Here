import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import "./App.css";
import { SearchInput } from "./components/SearchInput/SearchInput";
import { ChatBubble } from "./components/ChatBubble/ChatBubble";

function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            More Help
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="section"
        sx={{
          width: "100%",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "32px 0 64px 0",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <ChatBubble sender="system">asdasdasd adsfasdf dasf asdf </ChatBubble>
        <ChatBubble sender="me">123123 adsfasdf dasf asdf </ChatBubble>
      </Box>
      <SearchInput />
    </Box>
  );
}

export default App;
