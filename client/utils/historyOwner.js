// One place that decides who owns a history entry
export const getOwner = (user) => {
  const id = user?._id || user?.id || user?.email;
  return id ? String(id) : "guest";
};