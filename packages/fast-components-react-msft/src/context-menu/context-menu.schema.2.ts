import { childrenSchema, ChildrenType } from "@microsoft/fast-tooling";

/**
 * Complies with FAST Tooling 2.0
 */
export default {
    $schema: "http://json-schema.org/schema#",
    title: "Context menu",
    description: "A context menu component's schema definition.",
    type: "object",
    id: "@microsoft/fast-components-react-msft/context-menu",
    formPluginId: "@microsoft/fast-components-react-msft/context-menu",
    properties: {
        children: {
            ...childrenSchema,
            formPluginId: "@microsoft/fast-components-react-msft/context-menu/children",
            ids: [
                "@microsoft/fast-components-react-msft/context-menu-item",
                "@microsoft/fast-components-react-msft/divider",
            ],
            allowTypes: [ChildrenType.component],
        },
    },
};
