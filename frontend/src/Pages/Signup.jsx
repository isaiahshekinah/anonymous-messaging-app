
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Signup() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        TC: false
    });

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const navigate = useNavigate();

    function handleChange(event) {
        const {name, value, checked, type} = event.target
        setFormData(prevData => {
            return {
                ...prevData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
 

    async function handleSubmit(event) {
        event.preventDefault()

        setMessage("");
        setMessageType("");

        if(!formData.TC) {
         setMessage("Please accept our Terms and Conditions");
         setMessageType("error");
         return;
        }

        try {
            const res = await fetch("http://localhost:3000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                username: formData.username,
                email: formData.email,
                password: formData.password
            })

            });

            const data = await res.json();

            if (res.ok === false) {
                setMessage(data.message || data.error);
                setMessageType("error");
                return;
            }

            setMessage(data.message || "Registration Successful");
            setMessageType("Success");

            setTimeout(() => {
                navigate("/login")
            }, 1500);

        } catch (error) {
            console.log(error);
            setMessage(data.message || "Could not connect to Server");
            setMessageType("error");
        }

    }

    const placeholder = "w-full p-2 border border-gray-300 rounded bg-[#f5f5f5] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring focus:ring-gray-500 placeholder:text-[13px]";


    return (
        <div>
            <header className="flex items-center justify-between py-6 px-9">
        <div className="font-extrabold text-[24px]">
        ANONYMOUSLY
    </div>

    <nav className="bg-gray-100 ">

        <ul class="flex items-center gap-6 text-[15px]">
         
            <li className="bg-black text-white text-[14px] px-6 py-2 rounded-md hover:bg-gray-300 hover:text-black transition-all duration-300 ease-in font-bold">
                <Link to="/login">Login</Link>
            </li>
        </ul>
    </nav>
    </header>

    <main className="w-full border-2 border-gray-200 shadow-lg max-w-xl p-8 pb-4 mt-10 mx-auto">
        
        <form onSubmit={handleSubmit}>
        
                <h1 className="text-center font-bold text-[24px] mb-4">Create an Anonymous account</h1>

                {message && (
                    <div className={`text-center text-sm mb-4 ${messageType === "error" ? "text-red-600" : "text-green-600"}`}>
                            {message}
                    </div>
                )}

            <div className="space-y-4">

                <div>
                    <label className="block text-[14px] font-bold text-[#272727] mb-1" for="username">Username:</label>

                    <input type="text"
                    name="username"
                    onChange={handleChange}
                    value={formData.username}
                    placeholder="Enter your username" className={placeholder} id="username"/>
                </div>

               
                <div>
                    <label className="block text-[14px] font-bold text-[#272727] mb-1" htmlFor="email">Email Address:</label>

                    <input 
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={formData.email} 
                    placeholder="Enter your email address" className={placeholder} id="email"/>
                </div>
                
                <div>
                    <label className="block text-[14px] font-bold text-[#272727] mb-1" htmlFor="password">Password:</label>

                    <input 
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    placeholder="Enter your password" className={placeholder} id="password"/>
                </div>

                 
                <div>
                    <label className="flex cursor-pointer space-x-2 items-center accent-black text-[14px]">
                        <input 
                        id="TC"
                        name="TC"
                        checked={formData.TC}
                        onChange={handleChange}
                        type="checkbox"
                        className="cursor-pointer"
                        
                        />
                        <span>Accept Terms & Conditions</span>
                    </label>
                </div>

                <button 
                type="submit"
                className="w-full cursor-pointer flex flex-col
                py-2.5 pr-2 text-center text-white border border-gray-300 rounded bg-black hover:bg-gray-300 hover:text-gray-900 text-[14px] transition-all duration-200 ease-in">
                    Sign Up
                
            </button>

              <div className="my-5 flex items-center text-sm text-gray-500"> 
                <div className="grow border-t border-gray-400"></div>
                <span className="mx-4 shrink text-black">or</span>
                <div className="grow border-t border-gray-400"></div>
              </div>

              <div className="w-full  flex flex-col">
                <Link to="google.com"
                 target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 pl-2 text-center text-gray-900 border-2 border-gray-300 rounded bg-white  hover:bg-gray-300 hover:text-gray-900 text-[14px] transition-all duration-200 ease-in">
                    Sign up with Google
                </Link>
            </div>

              <div className="w-full  flex flex-col -mt-2">
                <Link to="apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 text-center text-white border border-gray-300 rounded bg-black hover:bg-gray-300 hover:text-gray-900 text-[14px] transition-all duration-200 ease-in">
                    Sign up with Apple
                </Link>
            </div>

            <div className="text-center text-[15px]">
                <p>Already have an account? <span className="text-blue-600 hover:underline">
                    <Link to="/login">login</Link></span></p>
            </div>

            </div>

        </form>
        </main>

        </div>
    )
}