export const slugify = (name = "") => {
  return name.toLowerCase().split(" ").join("_");
};

export const unslugify = (name = "") => {
  return name.split("_").join(" ").toLowerCase();
};
