export const GetCurrencies = async () => {
  try {
    const url = `https://api.changenow.io/v1/currencies?active=true`;
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
    });

    return response;
  } catch (err) {
    console.log(err);
  }
};
