import React from "react";
import "../../../css/Board.css";

function BoardList() {
  return (
    <div className="board_container">
      <table>
        <thead>
          <tr>
            <th width="5%"></th>
            <th width="60%">제목</th>
            <th width="15%">작성일</th>
            <th width="10%">조회</th>
            <th width="10%">좋아요</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>988</td>
            <td>ㅎㅇ</td>
            <td>2021-12-05</td>
            <td>50</td>
            <td>8</td>
          </tr>
          <tr>
            <td>2</td>
            <td>방가방가 햄토리</td>
            <td>2021-12-05</td>
            <td>350</td>
            <td>77</td>
          </tr>
          <tr>
            <td>1</td>
            <td>ㅎㅇ</td>
            <td>ㅂㅇ</td>
            <td>ㅎㅇ</td>
            <td>ㅂㅇ</td>
          </tr>
        </tbody>
      </table>
      <div className="btn_write_box">
        <button>글쓰기</button>
      </div>
    </div>
  );
}

export default BoardList;
