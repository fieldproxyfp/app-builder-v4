import { Widget } from "./widget";

interface Screen {
    label: string;
    data: { [key: string]: string }; // SQL queries
    margin: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    };
    ui: Widget[];
}

export {
    Screen
};

