import { useEffect, useState } from "react"
import { folderStructure } from "../constants/constants"
import FolderRender from "./FolderRenderer"
import useTreeStructureProvider from "../customHooks/useTreeStructureProvider"

export default function Folder() {

    const [fileStructure, setFileStructure] = useState(folderStructure)
    const { insertNode, editNode, deleteNode } = useTreeStructureProvider();

    useEffect(() => {
        const folderStructure = JSON.parse(localStorage.getItem('folderStructure')) || {}
        folderStructure.id && setFileStructure(folderStructure);
        folderStructure.id && localStorage.removeItem('folderStructure');
    }, [])

    window.addEventListener("beforeunload", () => localStorage.setItem("folderStructure", JSON.stringify(fileStructure)))

    const insertData = (folderName, type, id) => setFileStructure(insertNode(fileStructure, id, folderName, type));

    const editData = (id, folderName) => setFileStructure(editNode(fileStructure, id, folderName));

    const removeData = (id) => setFileStructure({ ...deleteNode(fileStructure, id) });

    return <div className="flex flex-col gap-4 items-center w-full justify-center h-screen">
        <FolderRender fileStructure={fileStructure} insertData={insertData} removeData={removeData} editData={editData} />
    </div>
}