import { Entity } from "./api";

export type AppT = Entity<{
    title: string;
    description: string;
    type: "web" | "mobile",
}>