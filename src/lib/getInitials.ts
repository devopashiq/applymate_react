export function getInitials(name: string) {
  const words = name.trim().split(/\s+/);


  if (words.length === 1) {
    return words[0].at(0)?.toUpperCase() ?? "";
  }

  return (
    (words[0]?.at(0)?.toUpperCase() ?? "") +
    (words.at(-1)?.at(0)?.toUpperCase() ?? "")
  );
}
