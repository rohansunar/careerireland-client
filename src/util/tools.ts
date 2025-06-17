export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const success = {
  style: {
    background: "#e7f6f1",
    color: "#16a87e",
  },
};
export const failed = {
  style: {
    background: "#ffebe6",
    color: "#fd381d",
  },
};
