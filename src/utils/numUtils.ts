export const compactNumberFormatter = (num: number) => {
  const formatter = new Intl.NumberFormat("en-US", { notation: "compact" });
  return formatter.format(num || 0);
};
