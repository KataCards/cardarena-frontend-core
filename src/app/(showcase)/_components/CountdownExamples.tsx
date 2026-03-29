import { Countdown } from "@/components/ui/Countdown";

export function BasicCountdownExample() {
  return (
    <Countdown
      initialSeconds={420}
      label="Round timer"
      size="md"
    />
  );
}

export function WarningCountdownExample() {
  return (
    <Countdown
      initialSeconds={42}
      label="Time remaining"
      size="lg"
      lastMinuteMessage="Final seconds"
    />
  );
}

export function PausedCountdownExample() {
  return (
    <Countdown
      initialSeconds={95}
      label="Paused round"
      size="md"
      isPaused
      variant="neutral"
      showStatusMessages={false}
    />
  );
}
