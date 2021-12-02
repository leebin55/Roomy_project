import React from "react";
import "./leftSideCss/LeftSide.css";
import { useSettingContext } from "../../context/SettingContextProvider";

function LeftSide() {
  const { settingList } = useSettingContext();

  /**
   * 해야할것2
	  react-router dom으로 
	  각 요소 눌렀을때 setting안에 view 다르게 보이기 하기
	*/

  return (
    <div className="settingContainer">
      <ul className="headList">
        <li className="folder">미니홈피관리</li>
        <ul>
          <li className="folder">임시타이틀</li>
          <ul>
            {settingList.map((list) => {
              return <li>{list.title}</li>;
            })}
          </ul>
        </ul>
      </ul>
    </div>
  );
}

export default LeftSide;
