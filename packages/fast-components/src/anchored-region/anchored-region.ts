import { attr, FastElement } from "@microsoft/fast-element";

export type AxisPositioningMode =
    | "uncontrolled"
    | "locktodefault"
    | "dynamic"
    | "onetime";

export type HorizontalPosition = "left" | "right" | "unset";

export type VerticalPosition = "top" | "bottom" | "unset";

export class AnchoredRegion extends FastElement {
    @attr
    public anchorId: string = "";
    @attr
    public viewportId: string = "";

    @attr
    public horizontalPositioningMode: AxisPositioningMode = "uncontrolled";
    @attr
    public horizontalDefaultPosition: HorizontalPosition = "unset";
    @attr
    public horizontalInset: boolean = false;
    @attr
    public horizontalThreshold: string = "";
    @attr
    public horizontalScalingEnabled: boolean = false;

    @attr
    public verticalPositioningMode: AxisPositioningMode = "uncontrolled";
    @attr
    public verticalDefaultPosition: VerticalPosition = "unset";
    @attr
    public verticalInset: boolean = false;
    @attr
    public verticalThreshold: string = "";
    @attr
    public verticalScalingEnabled: boolean = false;

    public horizontalPosition: HorizontalPosition = "unset";
    public verticalPosition: VerticalPosition = "unset";

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
    }

    anchorChanged() {}

    viewportChanged() {}

    positionChanged() {
        this.dispatchEvent(
            new CustomEvent("positionchanged", {
                bubbles: false,
                composed: true,
                detail: "current position",
            })
        );
    }
}
