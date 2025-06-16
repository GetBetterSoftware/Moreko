export default function ContactForm(){
    return (
        <div className=" mx-auto p-6">
            <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <p className="mb-2">
                <span className="font-semibold">Email:</span> himoreko@gmail.com
                </p>
                <p className="mb-2">
                <span className="font-semibold">Phone:</span> +27 71 234 5678
                </p>
                <p className="mb-2">
                <span className="font-semibold">Address:</span> Mohlarekoma, somewhere, somewhere
                </p>
            </div>


            <form className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md">
                <div className="mb-5">
                <label className="block mb-2 font-medium text-gray-700">Full Name</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    placeholder="Your full name"
                />
                </div>

                <div className="mb-5">
                <label className="block mb-2 font-medium text-gray-700">Email Address</label>
                <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    placeholder="you@example.com"
                />
                </div>

                <div className="mb-5">
                <label className="block mb-2 font-medium text-gray-700">Subject</label>
                <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    placeholder="Subject of your message"
                />
                </div>

                <div className="mb-5">
                <label className="block mb-2 font-medium text-gray-700">Message</label>
                <textarea
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                    placeholder="Your message..."
                ></textarea>
                </div>

                <input
                type="submit"
                value="Send"
                className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 cursor-pointer"
                />
            </form>
    </div>
  );
    
}


