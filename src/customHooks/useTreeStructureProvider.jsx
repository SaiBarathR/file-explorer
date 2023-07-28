const useTreeStructureProvider = () => {
    const insertNode = function (tree, fileID, item, type) {
        if (tree.id === fileID) {
            tree.items.push({
                id: new Date().getTime(),
                name: item,
                isFolder: type === 'folder',
                items: [],
            });
            return tree;
        }
        let latestNode = [];
        latestNode = tree.items.map((ob) => {
            return insertNode(ob, fileID, item, type);
        });
        return { ...tree, items: latestNode };
    };

    const editNode = (tree, fileID, value) => {
        if (tree.id === fileID) {
            tree.name = value;
            return tree;
        }
        tree.items.map((ob) => {
            return editNode(ob, fileID, value);
        });
        return { ...tree };
    };

    const deleteNode = (tree, id) => {
        for (let i = 0; i < tree.items.length; i++) {
            const currentItem = tree.items[i];
            if (currentItem.id === id) {
                tree.items.splice(i, 1);
                return tree;
            } else {
                deleteNode(currentItem, id);
            }
        }
        return tree;
    };

    return { insertNode, editNode, deleteNode };
};

export default useTreeStructureProvider;