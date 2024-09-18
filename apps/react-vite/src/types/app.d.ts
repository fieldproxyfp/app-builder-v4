import { Entity } from "./api";
import { Screen, ViewI } from "./view";
import { Widget } from "./widget";

export type AppT = Entity<{
    app_id: string;
    compiled_data: AppData | null;
    raw_data: AppData;
}>


export interface AppData {
    app_id: string;
    title: string;
    views: Record<string, ViewI>;
    metadata: {
        version: string;
        lastModified: string;
    };
    description: string;
    createdAt: number;
}

interface CompiledApp {
    app_id: string;
    views: { [key: string]: Screen };
}

// Helper type for dynamic data references
type DataReference = `{{${string}}}`;

// Interface for drag and drop functionality
interface DragDropManager {
    addWidget(app: App, view_id: string, widget: Widget, position: number): App;
    removeWidget(app: App, view_id: string, widgetId: string): App;
    reorderWidgets(app: App, view_id: string, oldIndex: number, newIndex: number): App;
}

// Interface for JSON conversion
interface JSONConverter {
    appToCompiledJSON(app: App): string;
    compiledJSONToApp(json: string): CompiledApp;
}

// Interface for real-time updates
interface RealtimeUpdater {
    updateApp(app: App): void;
    subscribeToChanges(callback: (app: App) => void): void;
}