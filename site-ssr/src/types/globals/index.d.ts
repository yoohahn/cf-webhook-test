import "@emotion/react";
import "@emotion/react/types/css-prop";
import type { Theme as MuiTheme } from "@mui/material";
import "../../../../src/types/global/index";

declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {}
}
