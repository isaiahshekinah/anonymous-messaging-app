import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Link } from "react-router-dom";


export default function Login() {

    const [form, setForm] = useState({
        usernameOrEmail: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState("");

    const { login } = useUserContext();
    const navigate = useNavigate();

    function handleChange(event) {
        setForm({...form, [event.target.name]: event.target.value});
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setErrorMessage("");
        
        const isLoggedIn = await login(form.usernameOrEmail, form.password);

        if (isLoggedIn.success) {
            navigate("/dashboard");

        } else {
            setErrorMessage(isLoggedIn.message);
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
         
            <li className="bg-black text-white text-[14px] px-6 py-2 rounded-md hover:bg-gray-300 hover:text-black transition-all duration-300 ease-in font-bold"><a href="#">Sign up</a></li>
        </ul>
    </nav>
    </header>

    <main className="w-full border-2 border-gray-200 shadow-lg max-w-xl p-8 pb-4 mt-10 mx-auto">
        
        <form onSubmit={handleSubmit}>
        
                <h1 className="text-center font-bold text-[24px] mb-9">Login to your Anonymous account</h1>

                    <div className="text-red-600 text-center text-sm mb-4">
                        {errorMessage}
                    </div>

            <div className="space-y-4">

                <div>
                    <label className="block text-[14px] font-bold text-[#272727] mb-1" htmlFor="usernameOrEmail">Username Or Email:</label>

                    <input 
                    type="text"
                    name="usernameOrEmail"
                    onChange={handleChange}
                    value={form.usernameOrEmail} 
                    placeholder="Enter your username or email" className={placeholder} id="usernameOrEmail"/>
                </div>
                
                <div>
                    <label className="block text-[14px] font-bold text-[#272727] mb-1" htmlFor="password">Password:</label>

                    <input 
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={form.password}
                    placeholder="Enter your password" className={placeholder} id="password"/>
                </div>


                <button 
                type="submit"
                className="w-full cursor-pointer flex flex-col
                py-2.5 pr-2 text-center text-white border border-gray-300 rounded bg-black hover:bg-gray-300 hover:text-gray-900 text-[14px] transition-all duration-200 ease-in">
                    Login
                
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
                    Login with Google
                </Link>
            </div>

              <div className="w-full  flex flex-col -mt-2">
                <Link to="apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 text-center text-white border border-gray-300 rounded bg-black hover:bg-gray-300 hover:text-gray-900 text-[14px] transition-all duration-200 ease-in">
                    Login with Apple
                </Link>
            </div>

            <div className="text-center text-[15px]">
                <p>Don't have an account? <span className="text-blue-600 hover:underline">
                    <Link to="/signup">Sign Up</Link></span></p>
            </div>

            </div>

        </form>
        </main>

        </div>
    )
}