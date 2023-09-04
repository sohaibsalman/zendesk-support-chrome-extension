const getAccessToken = async () => {
  const token = await chrome.storage.local.get("access_token");
  return token.access_token;
};

const removeAccessToken = async () => {
  return chrome.storage.local.remove("access_token");
};

export { getAccessToken, removeAccessToken };
