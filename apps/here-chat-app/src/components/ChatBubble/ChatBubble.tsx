import Card, { CardProps } from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

type ChatBubbleProps = {
  sender: "system" | "me";
};

interface ChatPoxProps extends CardProps {
  sender: "system" | "me";
}

const ChatBox = styled(Card, {
  shouldForwardProp: (prop) => prop !== "me",
})<ChatPoxProps>(({ theme }) => ({
  background: theme.palette.primary.main,
  padding: 16,
  borderRadius: '8px',
  variants: [
    {
      props: ({ sender }) => sender === "me",
      style: {
        background: theme.palette.background.default,
        // color: theme.palette.common.black,
        textAlign: "right",
        borderRadius: "8px 8px 0 8px",
        width: "auto",
        marginLeft: "auto"
      },
    },
  ],
}));

export const ChatBubble = (props: React.PropsWithChildren<ChatBubbleProps>) => {
  return (
    <ChatBox sender={props.sender}>
      <Typography variant="body1">{props.children}</Typography>
    </ChatBox>
  );
};
