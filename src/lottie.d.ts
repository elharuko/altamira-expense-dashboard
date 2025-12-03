declare module '*.json' {
    const value: any;
    export default value;
}

declare module 'lottie-react' {
    import { CSSProperties } from 'react';

    export interface LottieOptions {
        animationData: any;
        loop?: boolean;
        autoplay?: boolean;
        style?: CSSProperties;
        className?: string;
    }

    export default function Lottie(props: LottieOptions): JSX.Element;
}
