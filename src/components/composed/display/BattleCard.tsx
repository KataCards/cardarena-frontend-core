import * as React from "react";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import type { BattleMatch } from "@/types/ui/bracket";

type BattleCardHeading = "h3" | "h4" | "h5" | "h6";

export interface BattleCardProps {
  /** The battle data to display */
  battle: BattleMatch;
  /** Visual variant of the card */
  variant?: "default" | "compact";
  /** Callback triggered when the card is clicked */
  onClick?: (id: string) => void;
  /** Additional CSS classes */
  className?: string;
  /** Semantic heading level for the round label. @default "h4" */
  as?: BattleCardHeading;
}

function handleKeyDown(
  event: React.KeyboardEvent<HTMLDivElement>,
  battleId: string,
  onClick?: (id: string) => void
) {
  if (!onClick) {
    return;
  }

  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    onClick(battleId);
  }
}

function getWinnerTeam(battle: BattleMatch) {
  return battle.teams.find(
    (team) => team.id === battle.winnerTeamId || team.isWinner
  );
}

function getTeamLabel(team: BattleMatch["teams"][number], index: number) {
  return team.name?.trim() || `Team ${index + 1}`;
}

export function BattleCard({
  battle,
  variant = "default",
  onClick,
  className,
  as = "h4",
}: BattleCardProps) {
  const Heading = as;
  const isResolved = battle.status !== "pending";
  const winnerTeam = getWinnerTeam(battle);
  const hasManyTeams = battle.teams.length > 2;
  const resultLabel =
    winnerTeam
      ? getTeamLabel(winnerTeam, battle.teams.indexOf(winnerTeam))
      : battle.status === "draw"
        ? "Draw"
        : "Pending";
  const interactiveProps = onClick
    ? {
        role: "button" as const,
        tabIndex: 0,
        onClick: () => onClick(battle.id),
        onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) =>
          handleKeyDown(event, battle.id, onClick),
      }
    : {};

  if (variant === "compact") {
    return (
      <div
        className={cn(
          "rounded-lg border p-3 shadow-sm transition-all duration-200",
          isResolved ? "border-success/30 bg-success/10" : "border-border bg-card",
          onClick &&
            "cursor-pointer active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        {...interactiveProps}
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground">
            T{battle.tableNumber}
            {battle.round ? ` • R${battle.round}` : null}
          </span>
          <Badge variant={isResolved ? "success" : "outline"} size="sm">
            {battle.statusLabel ?? (isResolved ? "Completed" : "Pending")}
          </Badge>
        </div>

        <div className="space-y-2">
          {battle.teams.map((team, index) => {
            const isWinner = team.id === winnerTeam?.id || team.isWinner;

            return (
              <div
                key={team.id}
                className={cn(
                  "rounded-md border px-3 py-2",
                  isWinner
                    ? "border-success/30 bg-success/10"
                    : "border-border/70 bg-background/80"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "truncate text-xs font-black uppercase tracking-wider",
                      isWinner ? "text-success" : "text-muted-foreground"
                    )}
                  >
                    {getTeamLabel(team, index)}
                  </span>
                  {team.score !== undefined ? (
                    <Badge variant={isWinner ? "success" : "outline"} size="sm">
                      {team.score}
                    </Badge>
                  ) : null}
                </div>
                <p
                  className={cn(
                    "mt-1 truncate text-sm font-bold",
                    isWinner ? "text-success" : "text-foreground"
                  )}
                >
                  {team.players.map((player) => player.name).join(" / ")}
                </p>
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
        isResolved
          ? "border-success/30 bg-success/10"
          : "border-border bg-card hover:border-primary/40 hover:shadow-md",
        onClick &&
          "cursor-pointer active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...interactiveProps}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
            Table {battle.tableNumber}
          </span>
        </div>
        <Badge variant={isResolved ? "success" : "outline"} size="sm">
          {battle.statusLabel ?? (isResolved ? "Completed" : "Pending")}
        </Badge>
      </div>

      <div className="space-y-1">
        <Heading className="text-sm font-bold uppercase tracking-tighter text-muted-foreground">
          {battle.round ? `Round ${battle.round}` : "Battle"}
        </Heading>
        <div
          className={cn(
            "mt-3 grid gap-3",
            hasManyTeams ? "md:grid-cols-2" : "grid-cols-1"
          )}
        >
          {battle.teams.map((team, index) => {
            const isWinner = team.id === winnerTeam?.id || team.isWinner;

            return (
              <section
                key={team.id}
                aria-label={getTeamLabel(team, index)}
                className={cn(
                  "rounded-lg border p-4",
                  isWinner
                    ? "border-success/30 bg-success/10"
                    : "border-border/70 bg-background/80"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p
                      className={cn(
                        "text-xs font-black uppercase tracking-widest",
                        isWinner ? "text-success" : "text-muted-foreground"
                      )}
                    >
                      {getTeamLabel(team, index)}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {team.players.length} player{team.players.length === 1 ? "" : "s"}
                    </p>
                  </div>
                  {team.score !== undefined ? (
                    <Badge variant={isWinner ? "success" : "outline"} size="sm">
                      {team.score}
                    </Badge>
                  ) : null}
                </div>

                <ul className="mt-3 space-y-2">
                  {team.players.map((player) => (
                    <li
                      key={player.name}
                      className={cn(
                        "text-base font-semibold tracking-tight",
                        isWinner || player.isWinner ? "text-success" : "text-foreground"
                      )}
                    >
                      {player.name}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </div>

      <div className="mt-4 border-t border-border/70 pt-4">
        <p
          className={cn(
            "text-xs font-bold uppercase tracking-widest",
            isResolved ? "text-success" : "text-muted-foreground"
          )}
        >
          Winner: {resultLabel}
        </p>
      </div>
    </div>
  );
}
