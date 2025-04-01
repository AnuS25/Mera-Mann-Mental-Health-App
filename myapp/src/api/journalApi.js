import axios from "axios";

const API_URL = "https://mentalapp-backend.onrender.com/api/journals";

export const fetchJournals = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};

// export const addJournal = async ({ userId, title, content }) => {
//   const response = await axios.post(API_URL, { userId, title, content });
//   return response.data;
// };
export const addJournal = async ({ userId, title, content }) => {
  console.log("Calling API with userId:", userId, "title:", title, "content:", content);
  
  try {
        const response = await axios.post(API_URL, { userId, title, content });
            //console.log("API response:", response); // Log full response for debugging
  console.log("Journal added:", response.data); // Log successful response

if (response.status === 201|| response.status === 201) {
      return response.data;
    } else {
      //throw new Error("Failed to add journal");
            throw new Error(`Failed to add journal. Received status: ${response.status}`);

    }
  } catch (error) {
    console.error("API error:", error);
    throw error; // Re-throw error to be caught in the component's try-catch
  }
    // if (!response.ok) {
    //   throw new Error("Failed to add journal");
    // }
// if (!response.ok){
//   const errorData = await response.json();
//   console.error("API Error response:", errorData);
//   throw new Error(`API Error: ${errorData.message || 'Unknown error'}`);
// }

//     return await response.json();  // Assuming the response is in JSON format
//   } catch (error) {
//     console.error("API error:", error);
//     throw error;  // Re-throw error to be caught in the component's try-catch
//   }
};

export const updateJournal = async (id, updatedData) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedData);
  return response.data;
};

export const deleteJournal = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
