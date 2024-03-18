import { ReactElement, useState } from "react";
import { Board } from "./types";
import axios from "axios";

const url = "https://api.ticketing.kir-dev.hu/boards";

interface BoardItemProps {
    board: Board;
    onSave: () => void;
}

export function BoardItem(props: BoardItemProps): ReactElement {
    const [inputValue, setInputValue] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const onClickButton = () => {
        if (isEditing) {
            axios.patch(url + '/' + props.board.id, {
                title: inputValue
            }).then(() => props.onSave());
        }
        setIsEditing((prevState) => !prevState);
    };

    const onDelete = () => {
        axios.delete(url + '/' + props.board.id).then(() => {
            props.onSave();
        })
    }

    return (
        <div className="bg-white p-2 rounded-md mt-2">
            {
                !isEditing ? (
                    <p>{props.board.title}</p>
                ) : (
                    <input className="border" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                )
            }
            <button className="bg-green-200 p-2 rounded-md" onClick={onClickButton}>{isEditing ? "Save" : "Edit"}</button>
            <button className="bg-red-500 p-2 rounded-md" onClick={onDelete}>Delete</button>
        </div >
    )
};