export const getDecimalNum = (num: number): number | null => {
  if (typeof num === "number" && !isNaN(num)) {
    return Math.round(num * 100) / 100; 
  }
  return null;
};
