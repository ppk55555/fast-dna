import { css } from "@microsoft/fast-element";

export const AnchoredRegionStyles = css`
    :host {
        contain: layout;
        overflow: visible;
        height: 0px;
        width: 0px;
    }

    .root {
        position: relative;
        left: 300px;
        top: 300px;
        height: fit-content;
        width: fit-content;
    }
`;
