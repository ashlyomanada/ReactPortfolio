import React from "react";

const Contact = () => {
  return (
    <>
      <div
        id="contact"
        className="lg:min-h-screen bg-neutral-200 flex items-center justify-center p-5 lg:px-20"
      >
        <div className="border-b border-gray-900/10 w-full flex flex-col items-center justify-center">
          <h2 className="font-bold text-black text-3xl text-center p-3">
            Contact
          </h2>

          <div className="grid grid-cols-1 sm:flex sm:justify-center rounded-xl  p-5 gap-6 text-white lg:gap-3">
            <div
              data-aos="fade-up"
              data-aos-duration="2000"
              className="hidden  sm:flex flex-col justify-center px-16 lg:px-20 gap-5 bg-teal-800 shadow-md rounded-l-md"
            >
              <div className="flex items-center gap-4 text-lg font-semibold">
                <i class="fa-solid fa-envelope"></i> <p>myemail@gmail.com</p>
              </div>
              <div className="flex items-center gap-4 text-lg font-semibold">
                <i class="fa-solid fa-phone-volume"></i> <p>+123456789</p>
              </div>
              <div className="flex items-center gap-4 text-lg font-semibold">
                <i class="fa-brands fa-instagram"></i> <p>Ashly Omanada</p>
              </div>

              <div className="flex items-center gap-4 text-lg font-semibold">
                <i class="fa-brands fa-square-facebook"></i>
                <p>Ashly Omanada</p>
              </div>
            </div>

            <div
              data-aos="fade-up"
              data-aos-duration="2000"
              className="p-5 col-span-2 flex flex-col gap-5 justify-center text-black shadow-md rounded-r-md bg-neutral-100"
            >
              <div className="flex flex-col gap-1">
                <h1 className="text-3xl  font-bold">Get in Touch</h1>
                {/* <p>
                  Leave a message below and I'll get back to you soon as
                  possible
                </p> */}
              </div>
              <div className="flex flex-col justify-center gap-2">
                <div className="flex flex-col gap-1 border-black">
                  <label htmlFor="name">Name *</label>
                  <input
                    className="border border-gray-400 focus:border-teal-800 focus:ring-1 focus:ring-teal-800 focus:outline-none focus:shadow-md text-sm p-2 rounded-md transition-all duration-300"
                    placeholder="First Last"
                    id="name"
                    type="text"
                  />
                </div>

                <div className="flex flex-col gap-1 border-black">
                  <label htmlFor="email">Email *</label>
                  <input
                    className="border border-gray-400 focus:border-teal-800 focus:ring-1 focus:ring-teal-800 focus:outline-none focus:shadow-md text-sm p-2 rounded-md transition-all duration-300"
                    placeholder="name@gmail.com"
                    id="email"
                    type="email"
                  />
                </div>

                <div className="flex flex-col gap-1 border-black">
                  <label htmlFor="message">Message</label>
                  <textarea
                    className="border border-gray-400 focus:border-teal-800 focus:ring-1 focus:ring-teal-800 focus:outline-none focus:shadow-md text-sm p-2 rounded-md transition-all duration-300"
                    placeholder="Write text here..."
                    id="mesage"
                    cols="50"
                    rows="5"
                  ></textarea>
                </div>
              </div>
              <button className="text-white py-2 bg-teal-800 rounded-md shadow-md hover:bg-teal-700 w-32">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
