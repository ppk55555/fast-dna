import React from "react";
import { DragDropItemType, NavigationTreeItemProps } from "./navigation-tree-item.props";
import {
    ConnectDragSource,
    ConnectDropTarget,
    DragElementWrapper,
    DragPreviewOptions,
    DragSourceOptions,
    DropTargetMonitor,
    useDrag,
    useDrop,
} from "react-dnd";
import { TreeNavigationItem } from "../message-system/navigation.props";

function treeItemEndLeaf(
    linkClassName: (dragging: boolean, canDrag: boolean) => string,
    isOver: boolean,
    isDragging: boolean,
    isDraggable: boolean,
    dictionaryId: string,
    navigationConfigId: string,
    handleClick: React.MouseEventHandler<HTMLElement>,
    handleKeyDown: React.KeyboardEventHandler<HTMLElement>,
    item: TreeNavigationItem,
    type?: DragDropItemType,
    ref?: (node: HTMLAnchorElement) => React.ReactElement<any>
): React.ReactElement {
    return (
        <a
            ref={ref}
            style={isOver && type === DragDropItemType.linkedData ? { opacity: 0 } : null}
            className={linkClassName(isDragging, isDraggable)}
            role={"treeitem"}
            onClick={handleClick}
            data-dictionaryid={dictionaryId}
            data-navigationconfigid={navigationConfigId}
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            <span>{item.text}</span>
        </a>
    );
}

function treeItemCollapsible(
    isOver: boolean,
    contentClassName: (dragging: boolean, canDrag: boolean) => string,
    isDragging: boolean,
    isDraggable: boolean,
    expanded: boolean,
    children: React.ReactNode,
    type?: DragDropItemType,
    ref?: (node: HTMLDivElement) => React.ReactElement<any>
): React.ReactElement {
    return (
        <div
            ref={ref}
            style={isOver && type === DragDropItemType.linkedData ? { opacity: 0 } : null}
            className={contentClassName(isDragging, isDraggable)}
            role={"treeitem"}
            aria-expanded={expanded}
        >
            {children}
        </div>
    );
}

export const NavigationTreeItem: React.FC<NavigationTreeItemProps> = ({
    children,
    contentClassName,
    linkClassName,
    item,
    isDragging,
    isDraggable,
    handleClick,
    dictionaryId,
    navigationConfigId,
    handleKeyDown,
    expanded,
    isOver,
}: React.PropsWithChildren<NavigationTreeItemProps>): React.ReactElement => {
    return children[1].length !== 0
        ? treeItemCollapsible(
              isOver,
              contentClassName,
              isDragging,
              isDraggable,
              expanded,
              children
          )
        : treeItemEndLeaf(
              linkClassName,
              isOver,
              isDragging,
              isDraggable,
              dictionaryId,
              navigationConfigId,
              handleClick,
              handleKeyDown,
              item
          );
};

export const DraggableNavigationTreeItem: React.FC<NavigationTreeItemProps> = ({
    type,
    children,
    contentClassName,
    linkClassName,
    item,
    isDragging,
    isDraggable,
    handleClick,
    dictionaryId,
    navigationConfigId,
    handleKeyDown,
    expanded,
    moveDragItem,
    dropDragItem,
    dragEnd,
    dragStart,
}: React.PropsWithChildren<NavigationTreeItemProps>): React.ReactElement => {
    const drag: [
        unknown,
        DragElementWrapper<DragSourceOptions>,
        DragElementWrapper<DragPreviewOptions>
    ] = useDrag({
        item: {
            type,
        },
        begin(): void {
            dragStart(dictionaryId);
        },
        end(): void {
            dragEnd();
        },
    });
    const dragSource: ConnectDragSource = drag[1];
    const drop: [
        {
            isOver: boolean;
        },
        DragElementWrapper<any>
    ] = useDrop({
        accept: [DragDropItemType.linkedData, DragDropItemType.linkedDataContainer],
        hover(): void {
            moveDragItem(type, dictionaryId, navigationConfigId);
        },
        drop(): void {
            dropDragItem();
        },
        collect: (monitor: DropTargetMonitor): { isOver: boolean } => ({
            isOver: monitor.isOver(),
        }),
    });
    const dropTarget: ConnectDropTarget = drop[1];
    const isOver: boolean = drop[0].isOver;

    return children[1].length !== 0
        ? treeItemCollapsible(
              isOver,
              contentClassName,
              isDragging,
              isDraggable,
              expanded,
              children,
              type,
              (node: HTMLDivElement): React.ReactElement => {
                  if (type === DragDropItemType.linkedData) {
                      dragSource(dropTarget(node));
                  }

                  return dropTarget(node);
              }
          )
        : treeItemEndLeaf(
              linkClassName,
              isOver,
              isDragging,
              isDraggable,
              dictionaryId,
              navigationConfigId,
              handleClick,
              handleKeyDown,
              item,
              type,
              (node: HTMLAnchorElement): React.ReactElement => {
                  if (type === DragDropItemType.linkedData) {
                      dragSource(dropTarget(node));
                  }

                  return dropTarget(node);
              }
          );
};
