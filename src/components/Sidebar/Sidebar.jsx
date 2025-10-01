import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div
      id="sidebar"
      className="min-h-screen inline-flex flex-col justify-between py-6 px-3.5 bg-[#f0f4f9]"
    >
      <div id="top">
        <img
          onClick={() => setExtended((extended) => !extended)}
          id="menu"
          className="block ml-2.5 cursor-pointer"
          src={assets.menu_icon}
          alt=""
        />
        <div
          onClick={() => newChat()}
          id="new-chat"
          className="mt-12 inline-flex items-center gap-2.5 py-2.5 px-3.5 bg-[#e6eaf1] rounded-[50px] text-[14px] text-gray-400 cursor-pointer"
        >
          <img src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>

        {extended ? (
          <div className="recent flex flex-col">
            <p id="recent-title" className="mt-8 mb-5">
              Recent
            </p>
            {/* sidebar history */}
            {prevPrompts.map((item, index) => {
              return (
                <div key={index} onClick={() => loadPrompt(item)} className="recent-entry">
                  <img src={assets.message_icon} alt="" />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div id="bottom" className="flex flex-col">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;