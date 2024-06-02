export const getLast13Tickets = async () => {
  const resp = await fetch("http://localhost:8080/last13-tickets");

  const data = await resp.json();

  return data;
};
