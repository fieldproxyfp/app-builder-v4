import { Action } from '@/types/action';
import { App, CompiledApp, DragDropManager, JSONConverter, RealtimeUpdater } from '@/types/app';
import { Screen } from '@/types/screen';
import { Widget, WidgetType } from '@/types/widget';
import { v4 as uuidv4 } from 'uuid';

// Helper function to create a new widget
export function createWidget(type: WidgetType, properties: object = {}): Widget {
    return {
        element_id: uuidv4(),
        type,
        ...properties,
    };
}

// Helper function to create a new screen
export function createScreen(label: string): Screen {
    return {
        label,
        data: {},
        margin: { left: 16, right: 16, top: 20, bottom: 60 },
        ui: [],
    };
}

// Helper function to add a data query to a screen
export function addDataQuery(app: App, view_id: string, queryName: string, sqlQuery: string): App {
    const compiledApp = JSON.parse(app.compiledJSON) as CompiledApp;
    compiledApp.views[view_id].data[queryName] = sqlQuery;
    return {
        ...app,
        compiledJSON: JSON.stringify(compiledApp),
    };
}

// Helper function to add an action to a widget
export function addAction(app: App, view_id: string, widgetId: string, eventType: string, action: Action): App {
    const compiledApp = JSON.parse(app.compiledJSON) as CompiledApp;
    const widget = compiledApp.views[view_id].ui.find(w => w.element_id === widgetId);
    if (widget) {
        if (!widget.onclick) {
            widget.onclick = {};
        }
        const actionIndex = Object.keys(widget.onclick).length + 1;
        widget.onclick[actionIndex] = action;
    }
    return {
        ...app,
        compiledJSON: JSON.stringify(compiledApp),
    };
}

// Implementation of DragDropManager
export const dragDropManager: DragDropManager = {
    addWidget(app: App, view_id: string, widget: Widget, position: number): App {
        const compiledApp = JSON.parse(app.compiledJSON) as CompiledApp;
        compiledApp.views[view_id].ui.splice(position, 0, widget);
        return {
            ...app,
            compiledJSON: JSON.stringify(compiledApp),
        };
    },
    removeWidget(app: App, view_id: string, widgetId: string): App {
        const compiledApp = JSON.parse(app.compiledJSON) as CompiledApp;
        compiledApp.views[view_id].ui = compiledApp.views[view_id].ui.filter(w => w.element_id !== widgetId);
        return {
            ...app,
            compiledJSON: JSON.stringify(compiledApp),
        };
    },
    reorderWidgets(app: App, view_id: string, oldIndex: number, newIndex: number): App {
        const compiledApp = JSON.parse(app.compiledJSON) as CompiledApp;
        const [widget] = compiledApp.views[view_id].ui.splice(oldIndex, 1);
        compiledApp.views[view_id].ui.splice(newIndex, 0, widget);
        return {
            ...app,
            compiledJSON: JSON.stringify(compiledApp),
        };
    },
};

// Implementation of JSONConverter
export const jsonConverter: JSONConverter = {
    appToCompiledJSON(app: App): string {
        return app.compiledJSON;
    },
    compiledJSONToApp(json: string): CompiledApp {
        return JSON.parse(json);
    },
};

// Implementation of RealtimeUpdater (assuming use of a real-time database like Firebase)
export const realtimeUpdater: RealtimeUpdater = {
    updateApp(app: App) {
        // Implementation depends on your real-time database solution
        // For example, with Firebase:
        // firebase.database().ref('apps/' + app.id).set(app);
    },
    subscribeToChanges(callback: (app: App) => void) {
        // Implementation depends on your real-time database solution
        // For example, with Firebase:
        // firebase.database().ref('apps').on('value', (snapshot) => {
        //   callback(snapshot.val());
        // });
    },
};

// Helper function to update UI based on JSON changes
export function updateUIFromJSON(app: App, newJSON: string): App {
    return {
        ...app,
        compiledJSON: newJSON,
        metadata: {
            ...app.metadata,
            lastModified: new Date().toISOString(),
        },
    };
}

// Helper function to create a new app
export function createApp(title: string, description: string, type: "web" | "mobile"): App {
    const compiledApp: CompiledApp = {
        app_id: uuidv4(),
        views: {},
    };
    return {
        id: uuidv4(),
        title,
        description,
        type,
        compiledJSON: JSON.stringify(compiledApp),
        metadata: {
            version: '1.0.0',
            lastModified: new Date().toISOString(),
        },
        createdAt: Date.now(),
        app_id: uuidv4(),
        views: {},
    };
}


// Helper function to recursively find and update a widget
function findAndUpdateWidget(widgets: Widget[], widgetId: string, properties: Partial<Widget>): boolean {
    for (let i = 0; i < widgets.length; i++) {
        if (widgets[i].element_id === widgetId) {
            Object.assign(widgets[i], properties);
            return true;
        }
        const childWidgets = widgets[i].ui;
        if (childWidgets) {
            if (findAndUpdateWidget(childWidgets, widgetId, properties)) {
                return true;
            }
        }
    }
    return false;
}

// Updated function to update widget properties
export function updateWidgetProperties(app: App, view_id: string, widgetId: string, properties: Partial<Widget>): App {
    const compiledApp = JSON.parse(app.compiledJSON) as CompiledApp;
    const screen = compiledApp.views[view_id];

    if (screen && screen.ui) {
        if (findAndUpdateWidget(screen.ui, widgetId, properties)) {
            return {
                ...app,
                compiledJSON: JSON.stringify(compiledApp),
            };
        }
    }

    // If widget not found, return the original app
    return app;
}
