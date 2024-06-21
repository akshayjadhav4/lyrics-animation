export function parseTime(timeString: string) {
  const [minutes, seconds] = timeString.split(":");
  return parseInt(minutes) * 60 + parseFloat(seconds);
}
