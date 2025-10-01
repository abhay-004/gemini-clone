import React from "react";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { Context } from "../../context/context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResults,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  return (
    <div className="main flex-1 min-h-screen pb-[15vh] relative">
      <div className="nav flex items-center justify-between text-xl md:text-2xl p-3 md:p-5 text-[#585858]">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" className="w-8 md:w-10 rounded-full" />
      </div>
      <div className="main-container max-w-[900px] m-auto px-4 md:px-0">
        {!showResults ? (
          <>
            <div className="greet my-8 md:my-12 mx-0 text-3xl md:text-5xl text-[#c4c7c5] font-medium p-3 md:p-5">
              <p>
                <span className="span">Hello,Dev.</span>
              </p>
              <p className="text-2xl md:text-5xl">How can I help you today?</p>
            </div>

            <div className="cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 p-3 md:p-5">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card hover:text-black">
                <p>Brifely summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result result-scroll flex flex-col gap-10 md:gap-20 overflow-y-auto pb-10">
            <div className="result-title my-1.5 mx-4 md:mx-10 flex items-center gap-3 md:gap-5">
              <img src={assets.user_icon} alt="" className="w-8 md:w-10" />
              <p className="text-sm md:text-base">{recentPrompt}</p>
            </div>
            <div className="result-data flex items-start gap-3 md:gap-5 px-2 md:px-0">
              <img src={assets.gemini_icon} alt="" className="w-8 md:w-10" />
              {loading ? (
                <div className="loader w-full flex flex-col gap-5">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom absolute bottom-0 w-full max-w-[900px] py-0 px-3 md:px-5 m-auto left-0 right-0">
          <div className="search-box flex items-center justify-between gap-2 md:gap-5 bg-[#f0f4f9] py-2 md:py-2.5 px-3 md:px-5 rounded-[50px]">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 text-sm md:text-lg border-none outline-none bg-transparent"
              type="text"
              placeholder="Enter a prompt here"
            />
            <div className="flex items-center gap-2 md:gap-4">
              <img src={assets.gallery_icon} alt="" className="w-5 md:w-6" />
              <img src={assets.mic_icon} alt="" className="w-5 md:w-6" />
              <img onClick={() => onSent()} src={assets.send_icon} alt="" className="w-5 md:w-6 cursor-pointer" />
            </div>
          </div>
          <p className="bottom-info text-xs md:text-sm my-3 md:my-4 mx-auto text-center font-light px-2">
            Gemini may display inaccurate info, including about people, so
            double-check its responses.Your privacy and Gemini Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;