import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

export const SearchInput = () => {
  return (
    <Paper
      component="div"
      sx={{
        position: "fixed",
        bottom: 8,
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        flex: 1,
        borderRadius: 2,
        marginBottom: 2,
        width: "100%",
        maxWidth: 1280,
        [`&:hover`]: {
          boxShadow:
            "rgba(17, 17, 26, 0.6) 0px 4px 16px, rgba(17, 17, 26, 0.6) 0px 8px 32px;",
        },
        left: "50%",
        transform: "translate(-50%, 0)",
      }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="menu">
        ✨
      </IconButton>
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Ask something" />
      <IconButton
        type="button"
        color="primary"
        sx={{ p: "10px" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
