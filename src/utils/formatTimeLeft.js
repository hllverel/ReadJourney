const pluralise = (count, word) => `${count} ${word}${count === 1 ? "" : "s"}`;

export const formatTimeLeft = ({ hours, minutes }) => {
  const parts = [];
  if (hours > 0) parts.push(pluralise(hours, "hour"));
  if (minutes > 0 || hours === 0) parts.push(pluralise(minutes, "minute"));
  return `${parts.join(" and ")} left`;
};
