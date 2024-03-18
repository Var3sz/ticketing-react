import axios from "axios";
import { useEffect, useState } from "react";
import { BoardItem } from "./board-item";
import { Board } from "./types";

const url = "https://api.ticketing.kir-dev.hu/boards";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [boards, setBoards] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const onAdd = () => {
    setInputValue("");
    axios.post(url, {
      title: inputValue
    }).then(() => {
      getBoards();
    });
  }

  const getBoards = () => {
    setIsLoading(true);
    axios.get<Board[]>(url).then((res) => {
      setBoards(res.data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center h-screen bg-slate-100">
      <div>
        <input className="border" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button className="border" onClick={onAdd}>Add</button>
      </div>
      {isLoading && <p>Loading...</p>}
      <div className="overflow-auto max-h-60">
        {boards.map((board) => {
          return <BoardItem key={board.id} board={board} onSave={getBoards}/> 
        })}
      </div>
    </main>
  );
}

export default App;
