export const formatDate = (dateString: string): string => {
  if (!dateString) {
    throw new Error("please provide an date");
  }

  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
