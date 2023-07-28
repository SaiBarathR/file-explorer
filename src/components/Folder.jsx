import { useState } from "react"
import { folderStructure } from "../constants/constants"
import FolderRender from "./FolderRenderer"
import useTreeStructureProvider from "../customHooks/useTreeStructureProvider"

export default function Folder() {

    const [fileStructure, setFileStructure] = useState(folderStructure)
    const { insertNode, editNode, deleteNode } = useTreeStructureProvider();

    function insertData(folderName, type, id) {
        setFileStructure(insertNode(fileStructure, id, folderName, type))
    }

    const editData = (id, folderName) => {
        setFileStructure(editNode(fileStructure, id, folderName))
    }

    const removeData = (id) => {
        setFileStructure(deleteNode(fileStructure, id));
    }

    return <div className="flex flex-col gap-4 items-center w-full justify-center h-screen">
        <FolderRender fileStructure={fileStructure} insertData={insertData} removeData={removeData} editData={editData} />
    </div>
}