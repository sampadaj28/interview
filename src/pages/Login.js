import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../services/adminApi"; // adjust path if needed

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation(); // RTK Query login hook

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await login({ email, password }).unwrap(); // .unwrap() gives you direct response or throws error
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", JSON.stringify(data.role));

            if (data.role === "Admin") {
                navigate("/List");
            } else {
                setError("Invalid role");
            }
        } catch (err) {
            setError(err?.data?.message || "Login failed");
        }
    };

    return (
        <section className="border-red-500 login-form min-h-screen flex items-center justify-center bg-img" style={{ backgroundImage: "url('/assets/image/bbblurry.svg')" }}>
            <div className="container mx-auto">
                <div className="flex justify-center px-6 my-12">
                    <div className="w-96 flex">
                        <div className="w-full bg-login p-6 rounded-lg">
                            <div className="heading-1 pt-10 m-auto">
                                <img
                                    src="https://i.pinimg.com/originals/0a/5f/ea/0a5feae400fc816c4ca2aca8bd67a168.jpg"
                                    alt="login-img"
                                    className="rounded-full m-auto p-1 border"
                                    width="100px"
                                    height="100px"
                                />
                                <h3 className="pt-8 font-bold text-4xl text-center tracking-wider text-white">Login</h3>
                            </div>
                            <form onSubmit={handleSubmit} className="pt-8 rounded">
                                <div className="mb-4">
                                    <input
                                        className="w-full px-3 py-3 text-sm leading-normal text-gray-50 border-0 bg-[#ffffff1a] rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-4 md:mr-2">
                                    <input
                                        className="w-full px-3 py-3 text-sm leading-normal text-gray-50 border-0 bg-[#ffffff1a] rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-6 text-center">
                                    <button
                                        type="submit"
                                        className="w-full px-4 py-3 font-bold tracking-wider text-[#000] rounded-lg bg-white"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Logging in..." : "Login"}
                                    </button>
                                    {error && <p className="text-red-500 mt-2">{error}</p>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
