export function formatDelay(minutes: number) {
  if (minutes <= 0) return "0 دقيقة";
  if (minutes >= 420) {
    if (minutes === 420) {
      return "يوم عمل كامل (420 دقيقة)";
    }
    return `يوم عمل كامل (${minutes} دقيقة)`;
  }
  if (minutes < 60) return `${minutes} دقيقة`;
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (remaining === 0) return `${hours} ساعة`;
  return `${hours} ساعة و ${remaining} دقيقة`;
}

export function isFullDayDelay(minutes: number) {
  return minutes >= 420;
}

