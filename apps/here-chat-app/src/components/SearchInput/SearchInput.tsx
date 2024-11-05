import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

type SearchInputProps = {
  onSearch: (query: string) => Promise<void>;
};
export const SearchInput = (props: SearchInputProps) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Paper
      component="form"
      onSubmit={async (e) => {
        if (isLoading) {
          return;
        }
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        (e.target as HTMLFormElement).reset();
        setIsLoading(true);
        await props.onSearch(formData.get("query") as string);
        setIsLoading(false);
      }}
      sx={{
        position: "fixed",
        bottom: 8,
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        flex: 1,
        borderRadius: 2,
        marginBottom: 4,
        width: "calc(100% - 64px)",
        maxWidth: 1280,
        [`&:hover`]: {
          boxShadow:
            "rgba(17, 17, 26, 0.6) 0px 4px 16px, rgba(17, 17, 26, 0.6) 0px 8px 32px;",
        },
        left: "calc(50% - 32px)",
        transform: "translate(-50%, 0)",
        marginLeft: "32px",
      }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="menu">
        ✨
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={isLoading ? "Loading...." : "Ask something"}
        name="query"
        disabled={isLoading}
      />
      <IconButton
        type="submit"
        color="primary"
        sx={{ p: "10px" }}
        aria-label="search"
        disabled={isLoading}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
