import React from "react";

export default function Skillsdetails({ data, setData }) {
  // Helper to update a skill at a given index
  const updateSkill = (index, value) => {
    const newSkills = [...(data.skills || [])];
    newSkills[index] = value;
    setData({ ...data, skills: newSkills });
  };

  const removeSkill = (index) => {
    const newSkills = [...(data.skills || [])];
    newSkills.splice(index, 1);
    setData({ ...data, skills: newSkills });
  };

  const addSkill = () => {
    setData({ ...data, skills: [...(data.skills || []), ""] });
  };

  return (
    <>
      <div className="flex w-full p-2">
        <div className="w-full">
          <h1 className="block text-left w-full text-gray-800 text-2xl font-bold mb-6">Skills Details</h1>
          <form action="/" method="post">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700 text-left" htmlFor="skills">
                Skills
              </label>

              {(data.skills || []).map((skill, index) => (
                <div className="flex space-x-6 mb-4" key={index}>
                  <input
                    type="text"
                    placeholder="Add Skills"
                    className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline"
                    value={skill}
                    onChange={(e) => updateSkill(index, e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addSkill}
                className="text-white bg-blue-700 text-left flex hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Add Skills
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
