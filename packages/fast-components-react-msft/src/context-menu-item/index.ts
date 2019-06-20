import React from "react";
import { ContextMenuItemRole } from "@microsoft/fast-components-react-base";
import MSFTContextMenuItem, {
    ContextMenuItemHandledProps as MSFTContextMenuItemHandledProps,
    ContextMenuItemManagedClasses,
    ContextMenuItemProps as MSFTContextMenuItemProps,
    ContextMenuItemUnhandledProps,
} from "./context-menu-item";
import contextMenuItemSchema from "./context-menu-item.schema";
import manageJss, { ManagedJSSProps } from "@microsoft/fast-jss-manager-react";
import { ContextMenuItemClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import {
    ContextMenuItemStyles,
    DesignSystem,
} from "@microsoft/fast-components-styles-msft";
import { Subtract } from "utility-types";
import { contextMenuItemSheetIndex } from "../stylesheet-order";

/* tslint:disable-next-line:typedef */
const ContextMenuItem = manageJss(ContextMenuItemStyles, {
    index: contextMenuItemSheetIndex,
})(MSFTContextMenuItem);
type ContextMenuItem = InstanceType<typeof ContextMenuItem>;

interface ContextMenuItemHandledProps
    extends Subtract<MSFTContextMenuItemHandledProps, ContextMenuItemManagedClasses> {}
type ContextMenuItemProps = ManagedJSSProps<
    MSFTContextMenuItemProps,
    ContextMenuItemClassNameContract,
    DesignSystem
>;

export {
    ContextMenuItem,
    ContextMenuItemRole,
    ContextMenuItemProps,
    ContextMenuItemClassNameContract,
    ContextMenuItemHandledProps,
    contextMenuItemSchema,
    ContextMenuItemUnhandledProps,
};