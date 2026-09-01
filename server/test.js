const axios = require("axios");
async function test() {
  try {
    const res = await axios.post("http://localhost:5000/api/menu", { name: "Burger", category: "Mains", price: 10, description: "Yum" });
    console.log(res.data);
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
  }
}
test();

