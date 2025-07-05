export interface AnimateSlideProps {
    children: React.ReactElement;
    direction?: "up" | "down" | "left" | "right";
    show?: boolean;
    mountOnEnter?: boolean;
    unmountOnExit?: boolean;
}
export declare function AnimateSlide(props: AnimateSlideProps): import("react/jsx-runtime").JSX.Element;
