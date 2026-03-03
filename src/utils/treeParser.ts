export interface TreeNode {
    id: string;
    text: string;
    level: number;
    parentId?: string;
    type: "folder" | "files";
}

const FILE_EXTENSIONS = [".pdf", ".docx", ".xlsx", ".zip", ".doc", ".xlsx"];

export function parseDocumentTree(mdContent: string): TreeNode[] {
    const lines = mdContent.split("\n");
    const nodes: TreeNode[] = [];
    const parentStack: string[] = []; // Stores node IDs by level

    lines.forEach((line, index) => {
        const match = line.match(/^(#+)\s*(.*)/);
        if (!match) return;

        const level = match[1].length;
        const rawText = match[2].trim();
        if (!rawText) return;

        const isFile = FILE_EXTENSIONS.some((ext) => rawText.toLowerCase().endsWith(ext));
        const parentId = level > 1 ? parentStack[level - 2] : undefined;
        const nodeId = `node-${index}`;

        if (isFile) {
            // Check if the last node at this level is a "files" node and has the same parent
            const lastNode = nodes[nodes.length - 1];
            if (lastNode && lastNode.type === "files" && lastNode.level === level && lastNode.parentId === parentId) {
                lastNode.text += `\n${rawText}`;
            } else {
                nodes.push({
                    id: nodeId,
                    text: rawText,
                    level,
                    parentId,
                    type: "files",
                });
                parentStack[level - 1] = nodeId;
            }
        } else {
            // Folder node
            nodes.push({
                id: nodeId,
                text: rawText,
                level,
                parentId,
                type: "folder",
            });
            parentStack[level - 1] = nodeId;
        }

        // Reset stack for deeper levels
        parentStack.splice(level);
        parentStack[level - 1] = nodes[nodes.length - 1].id;
    });

    return nodes;
}
