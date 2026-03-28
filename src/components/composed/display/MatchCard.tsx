import * as React from "react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { BracketMatch } from "@/types/ui/bracket";

type MatchCardHeading = "h3" | "h4" | "h5" | "h6";

/**
 * Props for the MatchCard component.
 */
export interface MatchCardProps {
  /** The match data to display */
  match: BracketMatch;
  /** Visual variant of the card */
  variant?: "default" | "compact";
  /** Callback triggered when the card is clicked */
  onClick?: (id: string) => void;
  /** Additional CSS classes */
  className?: string;
  /** Semantic heading level for the round label. @default "h4" */
  as?: MatchCardHeading;
}

function handleKeyDown(
  event: React.KeyboardEvent<HTMLDivElement>,
  matchId: string,
  onClick?: (id: string) => void
) {
  if (!onClick) {
    return;
  }

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    onClick(matchId);
  }
}

/**
 * MatchCard
 *
 * A clean, stateless card representing a single tournament match.
 * Displays match details including table number, round, players, and winner status.
 */
export function MatchCard({
  match,
  variant = "default",
  onClick,
  className,
  as = "h4",
}: MatchCardProps) {
  const Heading = as;
  const isComplete = match.status === "completed" || Boolean(match.winner);
  const winnerName = match.winner ?? match.players.find((player) => player.isWinner)?.name;
  const interactiveProps = onClick
    ? {
        role: "button" as const,
        tabIndex: 0,
        onClick: () => onClick(match.id),
        onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) =>
          handleKeyDown(event, match.id, onClick),
      }
    : {};

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "rounded-lg border p-3 shadow-sm transition-all duration-200",
          isComplete ? "border-success/30 bg-success/10" : "border-border bg-card",
          onClick && "cursor-pointer active:scale-[0.98]",
          className
        )}
        {...interactiveProps}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground">
            T{match.tableNumber} • R{match.round}
          </span>
          {isComplete ? <Badge variant="success" size="sm">Done</Badge> : null}
        </div>

        <div className="space-y-1">
          {match.players.map((player) => {
            const isWinner = player.name === winnerName;
            return (
              <div key={player.name} className="flex items-center justify-between">
                <span
                  className={cn(
                    "max-w-25 truncate text-sm font-bold",
                    isWinner ? "text-success" : "text-foreground"
                  )}
                >
                  {player.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl border p-5 shadow-sm transition-all duration-300",
        isComplete
          ? "border-success/30 bg-success/10"
          : "border-border bg-card hover:border-primary/40 hover:shadow-md",
        onClick && "cursor-pointer active:scale-[0.98]",
        className
      )}
      {...interactiveProps}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
          Table {match.tableNumber}
        </span>
        <Badge variant={isComplete ? "success" : "outline"} size="sm">
          {isComplete ? "Completed" : "Pending"}
        </Badge>
      </div>

      <div className="space-y-1">
        <Heading className="text-sm font-bold uppercase tracking-tighter text-muted-foreground">
          {match.round ? `Round ${match.round}` : "Match"}
        </Heading>
        <div className="flex flex-col gap-1">
          {match.players.map((player) => {
            const isWinner = player.name === winnerName;

            return (
              <p
                key={player.name}
                className={cn(
                  "text-lg font-bold tracking-tight",
                  isWinner ? "text-success" : "text-foreground"
                )}
              >
                {player.name}
              </p>
            );
          })}
        </div>
      </div>

      <div className="mt-4 border-t border-border/70 pt-4">
        <p
          className={cn(
            "text-xs font-bold uppercase tracking-widest",
            isComplete ? "text-success" : "text-muted-foreground"
          )}
        >
          Winner: {winnerName ?? "Pending"}
        </p>
      </div>
    </div>
  );
}
