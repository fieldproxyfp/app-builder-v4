import { Entity } from "./api";
import { Screen } from "./screen";
import { Widget } from "./widget";

export type AppT = Entity<{
    title: string;
    description: string;
    type: "web" | "mobile",
}>



interface CompiledApp {
    app_id: string;
    views: { [key: string]: Screen };
}

interface App extends AppT {
    compiledJSON: string; // Stores the stringified CompiledApp
    metadata: {
        version: string;
        lastModified: string;
        // Add any other metadata fields you need
    };
    app_id: string;
    views: { [key: string]: Screen };
}

// Helper type for dynamic data references
type DataReference = `{{${string}}}`;

// Interface for drag and drop functionality
interface DragDropManager {
    addWidget(app: App, screenId: string, widget: Widget, position: number): App;
    removeWidget(app: App, screenId: string, widgetId: string): App;
    reorderWidgets(app: App, screenId: string, oldIndex: number, newIndex: number): App;
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