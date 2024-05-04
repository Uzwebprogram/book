import { ReactNode } from "react";

export interface LayoutProps {
    children: ReactNode,
    handleSearch: (title: string) => Promise<void>;
}