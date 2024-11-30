import axios from "axios";
const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;
//const BaseURl = "http://localhost:3000/products"
//const BaseURl = "https://fakestoreapi.com/products"
const BaseURl = "http://localhost:1337/api/categories?populate=*"

const axiosClient = axios.create({
  //baseURL: "http://localhost:1337/api",
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/api`,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});
export async function FetchProductsAPI()
{
    // try {
    //     const response = await fetch(`baseUrl_backend/${}`);
    //     const data = await response.json();
    //     return data;
    //   } catch (error) {
    //    // console.log("errors 111");
    //     throw error;
    //   }

    try{
      const data = await axiosClient.get("/products?populate=*");
      return data.data;
    }
    catch(error)
    {
      //throw error
    }
    





}


export async function FetchFiltperProductsAPI(queryString)
{
    try {
        const response = await fetch(BaseURl+'?'+queryString);
        const data = await response.json();
        return data;
      } catch (error) {
        throw error;
      }

}
