import API_URI from "../config/global.js";

async function reset(token, password) {
    const response = await fetch(API_URI + "/forgot/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token, password: password }),
    });


    const data = await response.json();
    return data;
 


}
export default reset;
