export function calculateTimeDifference(lastUpdated: string, measuredAt: string): string {
  const lastUpdatedDate = new Date(lastUpdated);
  const measuredAtDate = new Date(measuredAt);

  const timeDifferenceInMilliseconds = lastUpdatedDate.getTime() - measuredAtDate.getTime();
  const absoluteTimeDifferenceInMilliseconds = Math.abs(timeDifferenceInMilliseconds);

  const timeDifferenceInMinutes = Math.floor(absoluteTimeDifferenceInMilliseconds / (1000 * 60));
  const timeDifferenceInHours = Math.floor(absoluteTimeDifferenceInMilliseconds / (1000 * 60 * 60));
  const timeDifferenceInDays = Math.floor(absoluteTimeDifferenceInMilliseconds / (1000 * 60 * 60 * 24));

  if (timeDifferenceInMilliseconds < 0) {
    if (timeDifferenceInDays > 0) {
      return `Data is ${timeDifferenceInDays} day${timeDifferenceInDays > 1 ? 's' : ''} ahead.`;
    } else if (timeDifferenceInHours > 0) {
      return `Data is ${timeDifferenceInHours} hour${timeDifferenceInHours > 1 ? 's' : ''} ahead.`;
    } else {
      return `Data is ${timeDifferenceInMinutes} minute${timeDifferenceInMinutes > 1 ? 's' : ''} ahead.`;
    }
  }

  if (timeDifferenceInDays > 0) {
    return `Data is ${timeDifferenceInDays} day${timeDifferenceInDays > 1 ? 's' : ''} old.`;
  } else if (timeDifferenceInHours > 0) {
    return `Data is ${timeDifferenceInHours} hour${timeDifferenceInHours > 1 ? 's' : ''} old.`;
  } else {
    return `Data is ${timeDifferenceInMinutes} minute${timeDifferenceInMinutes > 1 ? 's' : ''} old.`;
  }
}
