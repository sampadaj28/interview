import React from "react";

export default function Personaldetails({ data, setData }) {
    return (
        <>
            <div className="flex w-full p-2">
                <div className="w-full">
                    <h1 className="block text-left w-full text-gray-500 text-2xl font-bold mb-6">Personal Details</h1>
                    <form action="/" method="post">
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-700 text-left" htmlFor="profile">
                                Profile Image
                            </label>
                            <div className="mt-1 flex flex-col items-start">
                                <span className="inline-block w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                                    <img
                                        src={data.profileImage || "https://images.unsplash.com/photo-1531316282956-d38457be0993?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"}
                                        alt="profilepic"
                                        className="w-100 h-100 m-auto rounded-full shadow"
                                    />
                                </span>
                                <div className="flex items-center justify-center bg-grey-lighter">
                                    <label className="w-50 flex flex-col items-center px-4 py-2 mt-5 bg-blue-300 text-gray-700 rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue hover:text-white">
                                        <span className="text-base leading-normal">Upload Image</span>
                                        <input
                                            type='file'
                                            className="hidden"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setData({ ...data, photo: reader.result });
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-x-7 md:grid-cols-2">
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700 text-left" htmlFor="firstName">
                                    Name
                                </label>
                                <input
                                    className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline"
                                    id="firstName"
                                    type="text"
                                    placeholder="Name"
                                    value={data.name || ''}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700 text-left" htmlFor="gender">
                                    Gender
                                </label>
                                <div className="flex space-x-7">
                                    {["Male", "Female", "Others"].map((genderOption) => (
                                        <div className="flex items-center" key={genderOption}>
                                            <input
                                                id={`radio-${genderOption}`}
                                                type="radio"
                                                name="gender"
                                                value={genderOption}
                                                checked={data.gender === genderOption}
                                                onChange={(e) => setData({ ...data, gender: e.target.value })}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-200 focus:ring-blue-500"
                                            />
                                            <label htmlFor={`radio-${genderOption}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                {genderOption}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-x-7 md:grid-cols-2">
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700 text-left" htmlFor="number">
                                    Phone Numbers
                                </label>
                                <input
                                    className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline"
                                    id="phoneNumber"
                                    type="number"
                                    placeholder="phoneNumber"
                                    value={data.phoneNumber || ''}
                                    onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
