// Ellenőrizzük, hogy egy adott nap az aktuális dátum-e
export const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const dayNames = {
  1: "hétfő",
  2: "kedd",
  3: "szerda",
  4: "csütörtök",
  5: "péntek",
  6: "szombat",
  7: "vasárnap",
};
export const dayNumbers = {
  hétfő: 1,
  kedd: 2,
  szerda: 3,
  csütörtök: 4,
  péntek: 5,
  szombat: 6,
  vasárnap: 7,
};
