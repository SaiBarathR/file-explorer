import { useState } from "react"
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import { Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

export default function FolderRender({ fileStructure, insertData, index }) {
    const [isMouseOverItem, setIsMouseOverItem] = useState(false)
    const [addNewItem, setAddNewItem] = useState({ type: 'file', show: false })

    function handleInsert(value) {
        if (value.trim().length > 0) {
            insertData(value, addNewItem.type, fileStructure.id)
        }
        setAddNewItem((prev) => ({ ...prev, show: !prev.show }))
    }

    const handleDeleteFolder = (id) => {

    }

    return <div className="flex flex-col gap-1">
        <div className="flex gap-2 min-w-[250px] items-center" onMouseEnter={() => setIsMouseOverItem(true)} onMouseLeave={() => setIsMouseOverItem(false)}>
            {fileStructure.isFolder ? '📁' : <InsertDriveFileOutlinedIcon className="max-h-[20px]" />}
            <p className="flex flex-grow">{fileStructure.name}</p>
            {isMouseOverItem && fileStructure.isFolder && <>
                <Tooltip title="Create new folder">
                    <CreateNewFolderOutlinedIcon className="cursor-pointer" onClick={() => setAddNewItem((prev) => ({ type: 'folder', show: !prev.show }))} />
                </Tooltip>
                <Tooltip title="Create new file">
                    <NoteAddOutlinedIcon className="cursor-pointer ml-1" onClick={() => setAddNewItem((prev) => ({ type: 'file', show: !prev.show }))} />
                </Tooltip>
                {fileStructure.id !== 1 && <Delete className="cursor-pointer" onClick={handleDeleteFolder} />}
                <Edit className="cursor-pointer" />
            </>}
        </div>
        {addNewItem.show && <input
            autoFocus
            className="outline-none border rounded-lg p-1 pl-2"
            onKeyDown={({ key, target: { value } }) => key === "Enter" && handleInsert(value)}
            onBlur={({ target: { value } }) => handleInsert(value)} />
        }
        {fileStructure.items.map((item, subIndex) => {
            return <div key={subIndex} className="ml-4">
                <FolderRender fileStructure={item} insertData={insertData} index={subIndex} />
            </div>
        })
        }
    </div>
}