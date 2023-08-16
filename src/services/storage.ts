const getAccessToken = async () => {
  const token = await chrome.storage.local.get("access_token");
  return token.access_token;
};

export { getAccessToken };
