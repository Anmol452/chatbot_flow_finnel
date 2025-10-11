export type ComponentType = "text" | "buttons" | "media" | "form" | "list" | "catalogue" | "product" | "template" | "image";

export interface BaseComponent {
  id: string;
  type: ComponentType;
  position: { x: number; y: number };
}

export interface TextComponent extends BaseComponent {
  type: "text";
  data: {
    text: string; 
  };
}

export interface ButtonOption {
  id: string;
  label: string;
}

export interface ButtonsComponent extends BaseComponent {
  type: "buttons";
  data: {
    text: string;
    options: ButtonOption[];
  };
}

export interface ImageComponent extends BaseComponent {
    type: "image";
    data: {
        url: string;
    }
}

export interface MediaComponent extends BaseComponent {
    type: "media",
    data: {
        url: string;
        caption: string;
    }
}

export interface FormComponent extends BaseComponent {
    type: "form",
    data: {
        title: string;
        fields: { id: string, label: string, type: 'text' | 'email' | 'number' }[]
    }
}

export interface ListItem {
    id: string;
    title: string;
    description: string;
}

export interface ListComponent extends BaseComponent {
    type: "list",
    data: {
        title: string;
        items: ListItem[];
    }
}

export interface CatalogueComponent extends BaseComponent {
    type: "catalogue",
    data: {
        title: string;
    }
}

export interface ProductComponent extends BaseComponent {
    type: "product",
    data: {
        productName: string;
    }
}

export interface TemplateComponent extends BaseComponent {
    type: "template",
    data: {
        templateName: string;
        // This will store whether the component is using a template
        useTemplate?: boolean; 
    }
}


export type ChatbotComponent = TextComponent | ButtonsComponent | MediaComponent | FormComponent | ListComponent | CatalogueComponent | ProductComponent | TemplateComponent | ImageComponent;
