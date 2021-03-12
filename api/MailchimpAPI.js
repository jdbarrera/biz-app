import axios from "axios";

const addContactURL = 'https://boring-neumann-7dc28b.netlify.app/.netlify/functions/mailchimp-subscribe';

export const addMailContactAPI = async (data) => {
  try {
    const response = await axios.post(addContactURL, data);
    return response;
  } catch (error) {
    return error.response.data;
  }  
};