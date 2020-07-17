export const slugify = (name = "") => {
  return name.toLowerCase().split(" ").join("-");
};

export const unslugify = (name = "") => {
  return name.split("-").join(" ").toLowerCase();
};
