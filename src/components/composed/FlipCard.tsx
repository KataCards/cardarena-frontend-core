import * as React from "react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export interface FlipCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Content to display on the front of the card */
  front: React.ReactNode;
  /** Content to display on the back of the card */
  back: React.ReactNode;
  /** Trigger mechanism for flipping the card. @default "hover" */
  trigger?: "hover";
  /** Animation duration in milliseconds. @default 600 */
  duration?: number;
  /** Rotation axis for the flip animation. @default "y" */
  axis?: "x" | "y";
  /** Minimum height for the card container */
  minHeight?: string;
  /** Additional className for the outer container */
  containerClassName?: string;
  /** Additional className for the front card */
  frontClassName?: string;
  /** Additional className for the back card */
  backClassName?: string;
}

/**
 * FlipCard
 *
 * A 3D flip card component with smooth CSS-only animations.
 * SSR-friendly with no client-side JavaScript required for the flip effect.
 * Built on top of the base Card component with full extensibility.
 *
 * @example
 * // Hover to flip (SSR-friendly)
 * <FlipCard
 *   front={<Card><CardContent>Front</CardContent></Card>}
 *   back={<Card><CardContent>Back</CardContent></Card>}
 * />
 *
 * @example
 * // Custom axis and duration
 * <FlipCard
 *   axis="x"
 *   duration={400}
 *   front={<Card>Front content</Card>}
 *   back={<Card>Back content</Card>}
 * />
 */
export function FlipCard({
  front,
  back,
  trigger = "hover",
  duration = 600,
  axis = "y",
  minHeight,
  containerClassName,
  frontClassName,
  backClassName,
  className,
  ...props
}: FlipCardProps) {
  const rotateAxis = axis === "y" ? "rotateY" : "rotateX";

  return (
    <div
      className={cn("group relative", containerClassName)}
      style={{
        perspective: "1000px",
        minHeight,
      }}
      {...props}
    >
      <div
        className={cn(
          "relative h-full w-full transition-transform group-hover:transform-[rotateY(180deg)]",
          axis === "x" && "group-hover:transform-[rotateX(180deg)]",
          className
        )}
        style={{
          transformStyle: "preserve-3d",
          transitionDuration: `${duration}ms`,
        }}
      >
        {/* Front Face */}
        <div
          className={cn("h-full w-full", frontClassName)}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {front}
        </div>

        {/* Back Face */}
        <div
          className={cn("absolute inset-0 h-full w-full", backClassName)}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: `${rotateAxis}(180deg)`,
          }}
        >
          {back}
        </div>
      </div>
    </div>
  );
}

/**
 * FlipCardInteractive
 *
 * A client-side interactive flip card with click/manual control.
 * Use this when you need programmatic control or click-to-flip behavior.
 * Requires client-side JavaScript.
 *
 * @example
 * // Click to flip
 * <FlipCardInteractive
 *   trigger="click"
 *   front={<Card>Front</Card>}
 *   back={<Card>Back</Card>}
 * />
 *
 * @example
 * // Controlled flip
 * const [flipped, setFlipped] = useState(false);
 * <FlipCardInteractive
 *   trigger="manual"
 *   isFlipped={flipped}
 *   onFlipChange={setFlipped}
 *   front={<Card>Front</Card>}
 *   back={<Card>Back</Card>}
 * />
 */
export interface FlipCardInteractiveProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Content to display on the front of the card */
  front: React.ReactNode;
  /** Content to display on the back of the card */
  back: React.ReactNode;
  /** Trigger mechanism for flipping the card. @default "click" */
  trigger?: "click" | "manual";
  /** Controlled flip state (for manual trigger) */
  isFlipped?: boolean;
  /** Callback when flip state changes */
  onFlipChange?: (isFlipped: boolean) => void;
  /** Animation duration in milliseconds. @default 600 */
  duration?: number;
  /** Rotation axis for the flip animation. @default "y" */
  axis?: "x" | "y";
  /** Minimum height for the card container */
  minHeight?: string;
  /** Additional className for the outer container */
  containerClassName?: string;
  /** Additional className for the front card */
  frontClassName?: string;
  /** Additional className for the back card */
  backClassName?: string;
}

export function FlipCardInteractive({
  front,
  back,
  trigger = "click",
  isFlipped: controlledFlipped,
  onFlipChange,
  duration = 600,
  axis = "y",
  minHeight,
  containerClassName,
  frontClassName,
  backClassName,
  className,
  ...props
}: FlipCardInteractiveProps) {
  const [internalFlipped, setInternalFlipped] = React.useState(false);
  const isControlled = controlledFlipped !== undefined;
  const isFlipped = isControlled ? controlledFlipped : internalFlipped;

  const handleFlip = React.useCallback(() => {
    if (trigger === "manual") return;

    const newFlipped = !isFlipped;
    if (!isControlled) {
      setInternalFlipped(newFlipped);
    }
    onFlipChange?.(newFlipped);
  }, [trigger, isFlipped, isControlled, onFlipChange]);

  const rotateAxis = axis === "y" ? "rotateY" : "rotateX";
  const rotation = isFlipped ? 180 : 0;

  return (
    <div
      className={cn("relative", containerClassName)}
      style={{
        perspective: "1000px",
        minHeight,
      }}
      {...props}
    >
      <div
        className={cn(
          "relative h-full w-full transition-transform",
          trigger === "click" && "cursor-pointer",
          className
        )}
        style={{
          transformStyle: "preserve-3d",
          transform: `${rotateAxis}(${rotation}deg)`,
          transitionDuration: `${duration}ms`,
        }}
        onClick={trigger === "click" ? handleFlip : undefined}
        role={trigger === "click" ? "button" : undefined}
        tabIndex={trigger === "click" ? 0 : undefined}
        onKeyDown={
          trigger === "click"
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleFlip();
                }
              }
            : undefined
        }
        aria-label={trigger === "click" ? "Flip card" : undefined}
      >
        {/* Front Face */}
        <div
          className={cn("h-full w-full", frontClassName)}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {front}
        </div>

        {/* Back Face */}
        <div
          className={cn("absolute inset-0 h-full w-full", backClassName)}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: `${rotateAxis}(180deg)`,
          }}
        >
          {back}
        </div>
      </div>
    </div>
  );
}

/**
 * FlipCardFront
 *
 * A convenience wrapper for the front face content.
 * Automatically wraps content in a Card component with proper styling.
 *
 * @example
 * <FlipCard
 *   front={
 *     <FlipCardFront>
 *       <CardHeader>
 *         <CardTitle>Front Title</CardTitle>
 *       </CardHeader>
 *     </FlipCardFront>
 *   }
 *   back={...}
 * />
 */
export function FlipCardFront({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card className={cn("h-full w-full", className)} {...props}>
      {children}
    </Card>
  );
}

/**
 * FlipCardBack
 *
 * A convenience wrapper for the back face content.
 * Automatically wraps content in a Card component with proper styling.
 *
 * @example
 * <FlipCard
 *   front={...}
 *   back={
 *     <FlipCardBack>
 *       <CardHeader>
 *         <CardTitle>Back Title</CardTitle>
 *       </CardHeader>
 *     </FlipCardBack>
 *   }
 * />
 */
export function FlipCardBack({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card className={cn("h-full w-full", className)} {...props}>
      {children}
    </Card>
  );
}