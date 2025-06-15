import { type HTMLProps, useCallback, useEffect, useRef, useState } from "react";
import styles from "./bitmap.module.css";

export interface BitmapProps {
    src: string;
    className?: string;
    alt?: string;
    autocomplete?: boolean;
    onComplete: () => void; // event called on completion
}

const TICK = 150;
// ersatz Fibonacci sequence
const STEPS = [
    0.01,
    0.02,
    0.03,
    0.05,
    0.08,
    0.13,
    0.21,
    0.34,
    0.55,
    0.89,
    1.00,
];

function resampleImage(image: HTMLImageElement, scalingFacttor: number, canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = image.width;
    const h = image.height;

    const dw = w * scalingFacttor;
    const dh = h * scalingFacttor;

    // turn off smoothing to ensure it's pixelated
    ctx.imageSmoothingEnabled = false;
    // shrink the image
    ctx.drawImage(image, 0, 0, dw, dh);
    // then draw the above bitmap at the expected image size without resampling
    ctx.drawImage(canvas, 0, 0, dw, dh, 0, 0, w, h);

}

export const Bitmap = (props: BitmapProps & HTMLProps<HTMLDivElement>) => {
    const { autocomplete, onComplete, src, className, alt, ...elementProps } = props;

    const animationRef = useRef<number | undefined>(undefined);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const image = useRef(new Image());
    const [loading, setLoading] = useState(!props.autocomplete);

    const animate = useCallback(() => {
        let currentStep = 0;

        const animateStep = () => {
            if (currentStep < STEPS.length) {
                if (!canvasRef.current || !image.current) {
                    console.error("Canvas or image not ready for resampling.");
                    return;
                }
                resampleImage(image.current, STEPS[currentStep], canvasRef.current);
                currentStep++;
            } else {
                    window.clearInterval(animationRef.current);
                    animationRef.current = undefined;
                onComplete?.();
            }
        };

        animationRef.current = window.setInterval(animateStep, TICK);
    }, [onComplete]);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (canvas && ctx && image.current) {
            image.current.onload = () => {
                canvas.width = image.current.width;
                canvas.height = image.current.height;

                if (!props.autocomplete) {
                    setLoading(false);
                    animate();
                } else {
                    ctx.drawImage(image.current, 0, 0);
                    props.onComplete?.();
                }
            }

            image.current.src = src;
        };
    }, [src, autocomplete, onComplete, animate]);

    return (
        <div className={styles.image} data-effect={className}>
            {loading && <div className={styles.progressbar} />}
            <canvas ref={canvasRef}>{alt || null}</canvas>
        </div>
    );
}
