export const truncateText = (text, limit) => {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};
