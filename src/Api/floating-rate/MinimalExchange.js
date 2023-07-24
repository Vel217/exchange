export const GetMinimalExChangeAmount = async (from, to) => {
  try {
    const url = `https://api.changenow.io/v1/min-amount/${from}_${to}?api_key=${process.env.REACT_APP_SECRET_KEY}`;
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
