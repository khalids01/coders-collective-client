import { ReactElement } from "react";
import { AppShell } from "@mantine/core";

export default function CustomAppShell({
  children,
  header,
}: {
  children: any;
  header: ReactElement;
}) {
  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      header={header}
      sx={{
        backgroundColor: "var(--darkBlue)",
      }}
    >
      {children}
    </AppShell>
  );
}
