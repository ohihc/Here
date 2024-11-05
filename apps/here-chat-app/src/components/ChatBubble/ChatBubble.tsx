import Card, { CardProps } from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

type ChatBubbleProps = {
  sender: "system" | "me";
  isLoading?: boolean;
};

interface ChatPoxProps extends CardProps {
  sender: "system" | "me";
}

const ChatBox = styled(Card, {
  shouldForwardProp: (prop) => prop !== "me",
})<ChatPoxProps>(({ theme }) => ({
  background: theme.palette.primary.main,
  padding: 16,
  borderRadius: "8px",
  variants: [
    {
      props: ({ sender }) => sender === "me",
      style: {
        background: theme.palette.background.default,
        // color: theme.palette.common.black,
        textAlign: "right",
        borderRadius: "8px 8px 0 8px",
        width: "auto",
        marginLeft: "auto",
      },
    },
  ],
}));

export const ChatBubble = (props: React.PropsWithChildren<ChatBubbleProps>) => {
  return (
    <ChatBox sender={props.sender}>
      {props.isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Skeleton variant="rounded" width={"100%"} height={16} />

          <Skeleton variant="rounded" width={"80%"} height={16} />

          <Skeleton variant="rounded" width={"90%"} height={16} />
        </Box>
      ) : (
        <Typography variant="body1">{props.children}</Typography>
      )}
    </ChatBox>
  );
};
