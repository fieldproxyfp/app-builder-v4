import { Entity } from "./api";

export type AppT = Entity<{
    title: string;
    desciption: string;
    type: "web" | "mobile",
}>