// Types for basic elements
type WidgetType = 'text' | 'table' | 'button' | 'form' | 'card' | 'counter' | 'list';

interface Widget {
    element_id: string;
    type: WidgetType;
    [key: string]: any; // Additional properties based on widget type
    ui?: Widget[];
}

export {
    Widget,
    WidgetType
};

