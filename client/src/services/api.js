// ========================================
// INDILENS API SERVICE
// ========================================


// Backend API Base URL

const API_BASE_URL =
  "http://localhost:5000/api";


// ========================================
// CONTACT API
// ========================================

export const submitContactForm = async (
  contactData
) => {

  const response = await fetch(

    `${API_BASE_URL}/contact`,

    {

      method: "POST",

      headers: {

        "Content-Type":
          "application/json",

      },

      body:
        JSON.stringify(contactData),

    }

  );


  const data =
    await response.json();


  // Check for backend error

  if (!response.ok) {

    throw new Error(

      data.message ||

      "Something went wrong. Please try again."

    );

  }


  return data;

};


// ========================================
// NEWSLETTER API
// ========================================

export const subscribeNewsletter =
  async (email) => {

    const response =
      await fetch(

        `${API_BASE_URL}/newsletter`,

        {

          method: "POST",

          headers: {

            "Content-Type":
              "application/json",

          },

          body:

            JSON.stringify({

              email,

            }),

        }

      );


    const data =
      await response.json();


    if (!response.ok) {

      throw new Error(

        data.message ||

        "Something went wrong."

      );

    }


    return data;

  };