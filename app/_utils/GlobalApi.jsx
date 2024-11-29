const { default: axios } = require("axios");

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;
const baseUrl_backend = process.env.NEXT_PUBLIC_BASE_URL_BACKEND;
const baseUrl_frontend = process.env.NEXT_PUBLIC_BASE_URL_FRONTEND;

// const axiosClient = axios.create({
//   baseURL: "http://localhost:1337/api",
//   headers: {
//     Authorization: `Bearer ${API_KEY}`,
//   },
// });
const axiosClient = axios.create({
  //baseURL: "http://localhost:1337/api"
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/api`,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

// const axiosClient=axios.create({
//     baseURL:'https://appointment-booking-admin.onrender.com/api',
//     headers:{
//         'Authorization':`Bearer ${API_KEY}`
//     }
// })

// Online show function
const getProductsByCategory = async (category,sortOption='name:asc',limit=4,page=1) =>
  {
    try{
      const data = await axiosClient.get(`/products?filters[category][slug][$eq]=${category}&populate=*&pagination[page]=${page}&pagination[pageSize]=${limit}&sort=${sortOption}`);
      return data.data;
    }
    catch(error)
    {

    }
    
  }
  const getProductBySlug = async(slug) => {
    console.log("My slug:", slug);
    try {
      const { data } = await axiosClient.get(`/products?filters[slug][$eq]=${slug}&populate=*`);
      return data.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      return null; // Handle error appropriately
    }
  };
    

  // Online show functions end

const getCategory = () => axiosClient.get("/categories?populate=*");

const getDoctorList = () => axiosClient.get("/doctors?populate=*");
const getDoctorListByCat = (category) =>
  axiosClient.get(
    "/doctors?filters[categories][slug][$in]=" + category + "&populate=*"
  );


   
const getDoctorByCategory = (category) =>
  axiosClient.get(
    "/doctors?filters[categories][Name][$in]=" + category + "&populate=*"
  );

const getDoctorById = (id) => axiosClient.get("/doctors/" + id + "?populate=*");

const bookAppointment = (data) => axiosClient.post("/appointments", data);

const getUserBookingList = (userEmail) =>
  axiosClient.get(
    "/appointments?[filters][Email][$eq]=" +
      userEmail +
      "&populate[doctor][populate][image][populate][0]=url&populate=*"
  );

const deleteBooking = (id) => axiosClient.delete("/appointments/" + id);

const sendEmail = (data) => {
  // console.log("data send to sen",data)
 return axios.post("/api/send", data)
//console.log("Hello ")
}
export async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// utils.js
export const getStrapiMedia = (media, imageSize = "thumbnail") => {
  //console.log("image link:", media);

  //Check if the requested image size exists

  const formats = media?.data?.attributes?.formats;
  
  const noformats = media?.data?.attributes;
  const availableSize = formats?.[imageSize]?.url || formats?.thumbnail?.url || noformats?.url;

  if (!availableSize) {
    // Return placeholder if neither the requested size nor thumbnail exists
   // return `${baseUrl_frontend}/assets/images/placeholder.png`;
    return `none`;
  }

  //Stements for local site
  //console.log("format:", availableSize);
// return `${baseUrl_backend}${availableSize}`;
//   Statement for live site
return `${availableSize}`;
};

const searchDoctorByName = async (doctorName) =>
{
  return axiosClient.get(
    "/doctors?populate=*&filters[Name][$containsi]="+doctorName
  );
}



export default {
  getCategory,
  getDoctorList,
  getDoctorByCategory,
  getDoctorById,
  bookAppointment,
  getUserBookingList,
  deleteBooking,
  sendEmail,
  getDoctorListByCat,
  wait,
  getStrapiMedia,
  searchDoctorByName,
  getProductsByCategory,
  getProductBySlug
};
