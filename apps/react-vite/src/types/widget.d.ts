// Types for basic elements
type WidgetType =
    | 'text'
    | 'table'
    | 'button'
    | 'form'
    | 'card'
    | 'counter'
    | 'list';

interface Widget {
    element_id: string;
    label: string;
    type: WidgetType;
    [key: string]: any; // Additional properties based on widget type
    ui?: Widget[];
}

interface TextWidget extends Widget {
    type: 'text';
    text: string;
}

interface TableWidget extends Widget {
    type: 'table';
    data: any[];
    columns: string[];
}

interface ButtonWidget extends Widget {
    type: 'button';
    text: string;
    onClick: () => void;
    data: any[];
}

interface FormWidget extends Widget {
    type: 'form';
    fields: { [key: string]: any };
    onSubmit: (data: any) => void;
    onCancel: () => void;
    data: any[];
}

interface CardWidget extends Widget {
    type: 'card';
    title: string;
    content: string;
    data: any[];
}

interface CounterWidget extends Widget {
    type: 'counter';
    count: number;
    label: string;
    data: any[];
}

interface ListWidget extends Widget {
    type: 'list';
    items: string[];
    onItemClick: (item: string) => void;
    data: any[];
}

interface ChartWidget extends Widget {
    type: 'chart';
    data: any[];
    labels: string[];
    series: string[];
    chartType:
    | 'bar'
    | 'line'
    | 'pie'
    | 'doughnut'
    | 'polarArea'
    | 'bubble'
    | 'scatter'
    | 'radar';
}

interface ImageWidget extends Widget {
    type: 'image';
    src: string;
    alt: string;
}

type WidgetGeneric =
    | TextWidget
    | TableWidget
    | ButtonWidget
    | FormWidget
    | CardWidget
    | CounterWidget
    | ListWidget
    | ChartWidget
    | ImageWidget;

export {
    ButtonWidget,
    CardWidget,
    ChartWidget,
    CounterWidget,
    FormWidget,
    ImageWidget,
    ListWidget,
    TableWidget,
    TextWidget,
    Widget,
    WidgetGeneric,
    WidgetType
};

